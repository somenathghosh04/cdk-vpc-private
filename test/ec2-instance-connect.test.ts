import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { Ec2InstanceConnectStack } from '../lib/ec2-instance-connect-stack';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

test('EC2 Instance Connect Stack', () => {
  const app = new cdk.App();
    // Create a stack for the VPC
  const testvpcstack = new cdk.Stack(app, 'testvpcstack');

  // Mock VPC
  const testvpc = new ec2.Vpc(testvpcstack, 'testvpc', { 
    maxAzs: 1,
    subnetConfiguration: [
      {
        name: 'Isolated',
        subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
        cidrMask: 24,
      }
    ]
  });

  // WHEN
  const testinstanceconnectstack = new Ec2InstanceConnectStack(app, 'testec2instanceconnectstack', {
    vpc: testvpc,
  });

  // THEN
  const template = Template.fromStack(testinstanceconnectstack);

  // Check if an EC2 Instance Connect endpoint is created
  template.hasResourceProperties('AWS::EC2::InstanceConnectEndpoint', {
    PreserveClientIp: true,
  });

  // Check if the endpoint is created in the correct subnet
  template.hasResource('AWS::EC2::InstanceConnectEndpoint', {
    Properties: {
      SubnetId: {
        'Fn::ImportValue': 'testvpcstack:ExportsOutputReftestvpcIsolatedSubnet1SubnetE8221B5E6F54BB45'
      }
    }
  });

  // Check if a security group is created with the correct properties
  template.hasResourceProperties('AWS::EC2::SecurityGroup', {
    GroupDescription: 'Security group for EC2 Instance Connect endpoint',
    SecurityGroupEgress: [{
      CidrIp: '0.0.0.0/0',
      Description: 'Allow all outbound traffic by default',
      IpProtocol: '-1'
    }]
  });
});