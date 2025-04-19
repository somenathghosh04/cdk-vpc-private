[**AWS CDK VPC with Private EC2 Instance v0.1.0**](../../README.md)

***

[AWS CDK VPC with Private EC2 Instance](../../modules.md) / [ec2-instance-stack](../README.md) / Ec2InstanceStack

# Class: Ec2InstanceStack

Defined in: [ec2-instance-stack.ts:26](https://github.com/somenathghosh04/cdk-vpc-private/blob/0990a6894ef18c986dca80fb4c33a49d6fea1f0b/lib/ec2-instance-stack.ts#L26)

A stack that creates an EC2 instance in a private subnet

This stack creates an EC2 instance with the following configuration:
- T2.micro instance type
- Amazon Linux 2023 AMI
- IAM role with SSM permissions
- Security group allowing SSH from Instance Connect endpoint
- Key pair for SSH access

## Extends

- `Stack`

## Constructors

### Constructor

> **new Ec2InstanceStack**(`scope`, `id`, `props`): `Ec2InstanceStack`

Defined in: [ec2-instance-stack.ts:33](https://github.com/somenathghosh04/cdk-vpc-private/blob/0990a6894ef18c986dca80fb4c33a49d6fea1f0b/lib/ec2-instance-stack.ts#L33)

Creates a new EC2 Instance Stack

#### Parameters

##### scope

`Construct`

The parent construct

##### id

`string`

The unique identifier for this stack

##### props

[`Ec2InstanceStackProps`](../interfaces/Ec2InstanceStackProps.md)

Properties for this stack

#### Returns

`Ec2InstanceStack`

#### Overrides

`cdk.Stack.constructor`
