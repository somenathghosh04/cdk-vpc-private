[**AWS CDK VPC with Private EC2 Instance v0.1.0**](../../README.md)

***

[AWS CDK VPC with Private EC2 Instance](../../modules.md) / [ec2-instance-stack](../README.md) / Ec2InstanceStackProps

# Interface: Ec2InstanceStackProps

Defined in: [ec2-instance-stack.ts:9](https://github.com/somenathghosh04/cdk-vpc-private/blob/0990a6894ef18c986dca80fb4c33a49d6fea1f0b/lib/ec2-instance-stack.ts#L9)

Properties for the EC2 Instance Stack

## Extends

- `StackProps`

## Properties

### instanceConnectEndpoint

> **instanceConnectEndpoint**: `CfnInstanceConnectEndpoint`

Defined in: [ec2-instance-stack.ts:13](https://github.com/somenathghosh04/cdk-vpc-private/blob/0990a6894ef18c986dca80fb4c33a49d6fea1f0b/lib/ec2-instance-stack.ts#L13)

The EC2 Instance Connect endpoint for SSH access

***

### vpc

> **vpc**: `IVpc`

Defined in: [ec2-instance-stack.ts:11](https://github.com/somenathghosh04/cdk-vpc-private/blob/0990a6894ef18c986dca80fb4c33a49d6fea1f0b/lib/ec2-instance-stack.ts#L11)

The VPC where the EC2 instance will be created
