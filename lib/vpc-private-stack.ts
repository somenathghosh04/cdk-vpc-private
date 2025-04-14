import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class VpcPrivateStack extends cdk.Stack {
  public readonly vpc: ec2.Vpc;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create VPC with a private subnet
    this.vpc = new ec2.Vpc(this, 'PrivateVpc', {
      maxAzs: 1, // Use 1 AZ for simplicity
      subnetConfiguration: [
        {
          name: 'PrivateSubnet',
          subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
          cidrMask: 24,
        }
      ],
      natGateways: 0, // No NAT Gateway needed for isolated subnet
    });

    // Output the VPC ID and subnet IDs
    new cdk.CfnOutput(this, 'VpcId', {
      value: this.vpc.vpcId,
      description: 'The ID of the VPC',
    });

    new cdk.CfnOutput(this, 'PrivateSubnetIds', {
      value: this.vpc.isolatedSubnets.map(subnet => subnet.subnetId).join(','),
      description: 'The IDs of the private subnets',
    });

  }
}
