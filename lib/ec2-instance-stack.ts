import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as iam from 'aws-cdk-lib/aws-iam';

/**
 * Properties for the EC2 Instance Stack
 */
export interface Ec2InstanceStackProps extends cdk.StackProps {
  /** The VPC where the EC2 instance will be created */
  vpc: ec2.IVpc;
  /** The EC2 Instance Connect endpoint for SSH access */
  instanceConnectEndpoint: ec2.CfnInstanceConnectEndpoint;
}

/**
 * A stack that creates an EC2 instance in a private subnet
 * 
 * This stack creates an EC2 instance with the following configuration:
 * - T2.micro instance type
 * - Amazon Linux 2023 AMI
 * - IAM role with SSM permissions
 * - Security group allowing SSH from Instance Connect endpoint
 * - Key pair for SSH access
 */
export class Ec2InstanceStack extends cdk.Stack {
  /**
   * Creates a new EC2 Instance Stack
   * @param scope The parent construct
   * @param id The unique identifier for this stack
   * @param props Properties for this stack
   */
  constructor(scope: Construct, id: string, props: Ec2InstanceStackProps) {
    super(scope, id, props);

    // Create security group for the EC2 instance
    const securityGroup = new ec2.SecurityGroup(this, 'InstanceSecurityGroup', {
      vpc: props.vpc,
      description: 'Security group for EC2 instance',
      allowAllOutbound: true, // Enable outbound traffic
    });

    // Allow SSH access from the Instance Connect endpoint's security group
    securityGroup.addIngressRule(
      ec2.Peer.securityGroupId(props.instanceConnectEndpoint.securityGroupIds![0]),
      ec2.Port.tcp(22),
      'Allow SSH access from EC2 Instance Connect endpoint'
    );

    // Create IAM role for the EC2 instance
    const role = new iam.Role(this, 'InstanceRole', {
      assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonSSMManagedInstanceCore'),
      ],
    });

    // Create the EC2 instance
    const instance = new ec2.Instance(this, 'AmazonLinuxInstance', {
      vpc: props.vpc,
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO),
      machineImage: ec2.MachineImage.latestAmazonLinux2023(),
      securityGroup: securityGroup,
      role: role,
      keyPair: ec2.KeyPair.fromKeyPairName(this, 'KeyPair', 'demo-key-pair'),
      vpcSubnets: {
        subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
      },
    });

    // Output the instance ID and private IP
    new cdk.CfnOutput(this, 'InstanceId', {
      value: instance.instanceId,
      description: 'The ID of the EC2 instance',
    });

    new cdk.CfnOutput(this, 'PrivateIp', {
      value: instance.instancePrivateIp,
      description: 'The private IP of the EC2 instance',
    });
  }
} 