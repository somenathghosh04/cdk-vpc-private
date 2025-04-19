import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

/**
 * Properties for the EC2 Instance Connect Stack
 */
export interface Ec2InstanceConnectStackProps extends cdk.StackProps {
  /** The VPC where the EC2 Instance Connect endpoint will be created */
  vpc: ec2.IVpc;
}

/**
 * A stack that creates an EC2 Instance Connect endpoint
 * 
 * This stack creates an EC2 Instance Connect endpoint with the following configuration:
 * - Security group allowing SSH access from the VPC
 * - Endpoint in an isolated subnet
 * - Client IP preservation enabled
 */
export class Ec2InstanceConnectStack extends cdk.Stack {
  /** The EC2 Instance Connect endpoint created by this stack */
  public readonly endpoint: ec2.CfnInstanceConnectEndpoint;

  /**
   * Creates a new EC2 Instance Connect Stack
   * @param scope The parent construct
   * @param id The unique identifier for this stack
   * @param props Properties for this stack
   */
  constructor(scope: Construct, id: string, props: Ec2InstanceConnectStackProps) {
    super(scope, id, props);

    // Create security group for EC2 Instance Connect endpoint
    const instanceConnectSecurityGroup = new ec2.SecurityGroup(this, 'InstanceConnectSecurityGroup', {
      vpc: props.vpc,
      description: 'Security group for EC2 Instance Connect endpoint',
      allowAllOutbound: true,
    });

    // Allow inbound traffic from VPC CIDR
    instanceConnectSecurityGroup.addIngressRule(
      ec2.Peer.ipv4(props.vpc.vpcCidrBlock),
      ec2.Port.tcp(22),
      'Allow SSH inbound from VPC'
    );

    // Create EC2 Instance Connect endpoint
    this.endpoint = new ec2.CfnInstanceConnectEndpoint(this, 'EC2InstanceConnectEndpoint', {
      subnetId: props.vpc.isolatedSubnets[0].subnetId,
      preserveClientIp: true,
      securityGroupIds: [instanceConnectSecurityGroup.securityGroupId],
    });

    // Output the endpoint ID
    new cdk.CfnOutput(this, 'Ec2InstanceConnectEndpointId', {
      value: this.endpoint.attrId,
      description: 'The ID of the EC2 Instance Connect endpoint',
    });
  }
} 