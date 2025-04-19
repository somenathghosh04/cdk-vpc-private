[**AWS CDK VPC with Private EC2 Instance v0.1.0**](../../README.md)

***

[AWS CDK VPC with Private EC2 Instance](../../modules.md) / [vpc-private-stack](../README.md) / VpcPrivateStack

# Class: VpcPrivateStack

Defined in: [vpc-private-stack.ts:21](https://github.com/somenathghosh04/cdk-vpc-private/blob/0990a6894ef18c986dca80fb4c33a49d6fea1f0b/lib/vpc-private-stack.ts#L21)

A stack that creates a VPC with private isolated subnets

This stack creates a VPC with the following configuration:
- One availability zone
- Private isolated subnets
- No NAT Gateway (since subnets are isolated)

## Extends

- `Stack`

## Constructors

### Constructor

> **new VpcPrivateStack**(`scope`, `id`, `props?`): `VpcPrivateStack`

Defined in: [vpc-private-stack.ts:31](https://github.com/somenathghosh04/cdk-vpc-private/blob/0990a6894ef18c986dca80fb4c33a49d6fea1f0b/lib/vpc-private-stack.ts#L31)

Creates a new VPC Private Stack

#### Parameters

##### scope

`Construct`

The parent construct

##### id

`string`

The unique identifier for this stack

##### props?

[`VpcPrivateStackProps`](../interfaces/VpcPrivateStackProps.md)

Optional properties for this stack

#### Returns

`VpcPrivateStack`

#### Overrides

`cdk.Stack.constructor`

## Properties

### vpc

> `readonly` **vpc**: `Vpc`

Defined in: [vpc-private-stack.ts:23](https://github.com/somenathghosh04/cdk-vpc-private/blob/0990a6894ef18c986dca80fb4c33a49d6fea1f0b/lib/vpc-private-stack.ts#L23)

The VPC created by this stack
