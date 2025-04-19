import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

/**
 * Properties for the VPC Private Stack
 */
export interface VpcPrivateStackProps extends cdk.StackProps {
  // Add any additional properties here
}

/**
 * A stack that creates a VPC with private isolated subnets
 * 
 * This stack creates a VPC with the following configuration:
 * - One availability zone
 * - Private isolated subnets
 * - No NAT Gateway (since subnets are isolated)
 */
export class VpcPrivateStack extends cdk.Stack {
  /** The VPC created by this stack */
  public readonly vpc: ec2.Vpc;

  /**
   * Creates a new VPC Private Stack
   * @param scope The parent construct
   * @param id The unique identifier for this stack
   * @param props Optional properties for this stack
   */
  constructor(scope: Construct, id: string, props?: VpcPrivateStackProps) {
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
