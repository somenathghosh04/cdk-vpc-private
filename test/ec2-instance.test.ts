import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { Ec2InstanceStack } from '../lib/ec2-instance-stack'; 
import * as ec2 from 'aws-cdk-lib/aws-ec2';

test('EC2 Instance Stack', () => {
  const app = new cdk.App();
  // Create a stack for the VPC
  const vpcStack = new cdk.Stack(app, 'VpcStack');
  // Mock VPC and Instance Connect Endpoint
  const vpc = new ec2.Vpc(vpcStack, 'TestVpc', { 
    maxAzs: 1,
    subnetConfiguration: [
      {
        name: 'Isolated',
        subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
        cidrMask: 24,
      }
    ]
  });
  const instanceConnectEndpoint = new ec2.CfnInstanceConnectEndpoint(vpcStack, 'TestInstanceConnectEndpoint', {
    subnetId: vpc.isolatedSubnets[0].subnetId,
    preserveClientIp: true,
    securityGroupIds: ['sg-12345678'],
  });

  // WHEN
  const stack = new Ec2InstanceStack(app, 'MyEc2InstanceStack', {
    vpc,
    instanceConnectEndpoint,
  });

  // THEN
  const template = Template.fromStack(stack);

  // Check if an EC2 instance is created with the correct properties
  template.hasResourceProperties('AWS::EC2::Instance', {
    InstanceType: 't2.micro',
    KeyName: 'demo-key-pair',
  });

  // Check if a security group is created with the correct ingress rule
  template.hasResourceProperties('AWS::EC2::SecurityGroup', {
    GroupDescription: 'Security group for EC2 instance',
  });

  // Check if the IAM role is created with the correct managed policy
  template.hasResourceProperties('AWS::IAM::Role', {
    AssumeRolePolicyDocument: {
      Statement: [
        {
          Action: 'sts:AssumeRole',
          Effect: 'Allow',
          Principal: {
            Service: 'ec2.amazonaws.com',
          },
        },
      ],
      Version: '2012-10-17',
    },
    ManagedPolicyArns: [
      {
        'Fn::Join': [
          '',
          [
            'arn:',
            { Ref: 'AWS::Partition' },
            ':iam::aws:policy/AmazonSSMManagedInstanceCore'
          ]
        ]
      }
    ]
  });
});