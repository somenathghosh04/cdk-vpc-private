[**AWS CDK VPC with Private EC2 Instance v0.1.0**](../../README.md)

***

[AWS CDK VPC with Private EC2 Instance](../../modules.md) / [ec2-instance-connect-stack](../README.md) / Ec2InstanceConnectStack

# Class: Ec2InstanceConnectStack

Defined in: [ec2-instance-connect-stack.ts:21](https://github.com/somenathghosh04/cdk-vpc-private/blob/0990a6894ef18c986dca80fb4c33a49d6fea1f0b/lib/ec2-instance-connect-stack.ts#L21)

A stack that creates an EC2 Instance Connect endpoint

This stack creates an EC2 Instance Connect endpoint with the following configuration:
- Security group allowing SSH access from the VPC
- Endpoint in an isolated subnet
- Client IP preservation enabled

## Extends

- `Stack`

## Constructors

### Constructor

> **new Ec2InstanceConnectStack**(`scope`, `id`, `props`): `Ec2InstanceConnectStack`

Defined in: [ec2-instance-connect-stack.ts:31](https://github.com/somenathghosh04/cdk-vpc-private/blob/0990a6894ef18c986dca80fb4c33a49d6fea1f0b/lib/ec2-instance-connect-stack.ts#L31)

Creates a new EC2 Instance Connect Stack

#### Parameters

##### scope

`Construct`

The parent construct

##### id

`string`

The unique identifier for this stack

##### props

[`Ec2InstanceConnectStackProps`](../interfaces/Ec2InstanceConnectStackProps.md)

Properties for this stack

#### Returns

`Ec2InstanceConnectStack`

#### Overrides

`cdk.Stack.constructor`

## Properties

### endpoint

> `readonly` **endpoint**: `CfnInstanceConnectEndpoint`

Defined in: [ec2-instance-connect-stack.ts:23](https://github.com/somenathghosh04/cdk-vpc-private/blob/0990a6894ef18c986dca80fb4c33a49d6fea1f0b/lib/ec2-instance-connect-stack.ts#L23)

The EC2 Instance Connect endpoint created by this stack
