import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

export interface Ec2InstanceConnectStackProps extends cdk.StackProps {
  vpc: ec2.IVpc;
}

export class Ec2InstanceConnectStack extends cdk.Stack {
  public readonly endpoint: ec2.CfnInstanceConnectEndpoint;

  constructor(scope: Construct, id: string, props: Ec2InstanceConnectStackProps) {
    super(scope, id, props);

    // Create security group for EC2 Instance Connect endpoint
    const instanceConnectSecurityGroup = new ec2.SecurityGroup(this, 'InstanceConnectSecurityGroup', {
      vpc: props.vpc,
      description: 'Security group for EC2 Instance Connect endpoint',
      allowAllOutbound: true,
    });

    // No need for explicit inbound rules for the Instance Connect endpoint security group
    // AWS manages the necessary inbound rules automatically

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