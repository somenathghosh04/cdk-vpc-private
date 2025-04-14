import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { VpcPrivateStack } from '../lib/vpc-private-stack'; 

test('VPC Stack Created', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new VpcPrivateStack(app, 'testvpcstack');
  // THEN
  const template = Template.fromStack(stack);

  // Check if a VPC is created
  template.hasResourceProperties('AWS::EC2::VPC', {
    CidrBlock: '10.0.0.0/16', // Replace with your expected CIDR block
  });

  // Check if subnets are created
  template.resourceCountIs('AWS::EC2::Subnet', 1); // Adjust the count based on your stack

  // Check if route tables are created
  template.resourceCountIs('AWS::EC2::RouteTable', 1); // Adjust the count based on your stack

  // Check if DNS settings are enabled
  template.hasResourceProperties('AWS::EC2::VPC', {
    EnableDnsSupport: true,
    EnableDnsHostnames: true,
  });
});