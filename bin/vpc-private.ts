#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { VpcPrivateStack } from '../lib/vpc-private-stack';
import { Ec2InstanceConnectStack } from '../lib/ec2-instance-connect-stack';
import { Ec2InstanceStack } from '../lib/ec2-instance-stack';

const app = new cdk.App();

// Create the VPC stack
const vpcStack = new VpcPrivateStack(app, 'VpcPrivateStack', {
  /* If you don't specify 'env', this stack will be environment-agnostic.
   * Account/Region-dependent features and context lookups will not work,
   * but a single synthesized template can be deployed anywhere. */

  /* Uncomment the next line to specialize this stack for the AWS Account
   * and Region that are implied by the current CLI configuration. */
  // env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },

  /* Uncomment the next line if you know exactly what Account and Region you
   * want to deploy the stack to. */
  // env: { account: '123456789012', region: 'us-east-1' },

  /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});

// Create the EC2 Instance Connect stack and pass the VPC
const instanceConnectStack = new Ec2InstanceConnectStack(app, 'Ec2InstanceConnectStack', {
  vpc: vpcStack.vpc,
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});

// Create the EC2 instance stack and pass both VPC and Instance Connect endpoint
new Ec2InstanceStack(app, 'Ec2InstanceStack', {
  vpc: vpcStack.vpc,
  instanceConnectEndpoint: instanceConnectStack.endpoint,
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});