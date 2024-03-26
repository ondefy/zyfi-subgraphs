// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class Mint extends ethereum.Event {
  get params(): Mint__Params {
    return new Mint__Params(this);
  }
}

export class Mint__Params {
  _event: Mint;

  constructor(event: Mint) {
    this._event = event;
  }

  get account(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class Transfer extends ethereum.Event {
  get params(): Transfer__Params {
    return new Transfer__Params(this);
  }
}

export class Transfer__Params {
  _event: Transfer;

  constructor(event: Transfer) {
    this._event = event;
  }

  get from(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get to(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get value(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class Withdrawal extends ethereum.Event {
  get params(): Withdrawal__Params {
    return new Withdrawal__Params(this);
  }
}

export class Withdrawal__Params {
  _event: Withdrawal;

  constructor(event: Withdrawal) {
    this._event = event;
  }

  get _l2Sender(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get _l1Receiver(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get _amount(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class WithdrawalWithMessage extends ethereum.Event {
  get params(): WithdrawalWithMessage__Params {
    return new WithdrawalWithMessage__Params(this);
  }
}

export class WithdrawalWithMessage__Params {
  _event: WithdrawalWithMessage;

  constructor(event: WithdrawalWithMessage) {
    this._event = event;
  }

  get _l2Sender(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get _l1Receiver(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get _amount(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get _additionalData(): Bytes {
    return this._event.parameters[3].value.toBytes();
  }
}

export class L2EthToken extends ethereum.SmartContract {
  static bind(address: Address): L2EthToken {
    return new L2EthToken("L2EthToken", address);
  }

  balanceOf(_account: BigInt): BigInt {
    let result = super.call("balanceOf", "balanceOf(uint256):(uint256)", [
      ethereum.Value.fromUnsignedBigInt(_account)
    ]);

    return result[0].toBigInt();
  }

  try_balanceOf(_account: BigInt): ethereum.CallResult<BigInt> {
    let result = super.tryCall("balanceOf", "balanceOf(uint256):(uint256)", [
      ethereum.Value.fromUnsignedBigInt(_account)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  decimals(): i32 {
    let result = super.call("decimals", "decimals():(uint8)", []);

    return result[0].toI32();
  }

  try_decimals(): ethereum.CallResult<i32> {
    let result = super.tryCall("decimals", "decimals():(uint8)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toI32());
  }

  name(): string {
    let result = super.call("name", "name():(string)", []);

    return result[0].toString();
  }

  try_name(): ethereum.CallResult<string> {
    let result = super.tryCall("name", "name():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  symbol(): string {
    let result = super.call("symbol", "symbol():(string)", []);

    return result[0].toString();
  }

  try_symbol(): ethereum.CallResult<string> {
    let result = super.tryCall("symbol", "symbol():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  totalSupply(): BigInt {
    let result = super.call("totalSupply", "totalSupply():(uint256)", []);

    return result[0].toBigInt();
  }

  try_totalSupply(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("totalSupply", "totalSupply():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }
}

export class MintCall extends ethereum.Call {
  get inputs(): MintCall__Inputs {
    return new MintCall__Inputs(this);
  }

  get outputs(): MintCall__Outputs {
    return new MintCall__Outputs(this);
  }
}

export class MintCall__Inputs {
  _call: MintCall;

  constructor(call: MintCall) {
    this._call = call;
  }

  get _account(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _amount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class MintCall__Outputs {
  _call: MintCall;

  constructor(call: MintCall) {
    this._call = call;
  }
}

export class TransferFromToCall extends ethereum.Call {
  get inputs(): TransferFromToCall__Inputs {
    return new TransferFromToCall__Inputs(this);
  }

  get outputs(): TransferFromToCall__Outputs {
    return new TransferFromToCall__Outputs(this);
  }
}

export class TransferFromToCall__Inputs {
  _call: TransferFromToCall;

  constructor(call: TransferFromToCall) {
    this._call = call;
  }

  get _from(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _to(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get _amount(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class TransferFromToCall__Outputs {
  _call: TransferFromToCall;

  constructor(call: TransferFromToCall) {
    this._call = call;
  }
}

export class WithdrawCall extends ethereum.Call {
  get inputs(): WithdrawCall__Inputs {
    return new WithdrawCall__Inputs(this);
  }

  get outputs(): WithdrawCall__Outputs {
    return new WithdrawCall__Outputs(this);
  }
}

export class WithdrawCall__Inputs {
  _call: WithdrawCall;

  constructor(call: WithdrawCall) {
    this._call = call;
  }

  get _l1Receiver(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class WithdrawCall__Outputs {
  _call: WithdrawCall;

  constructor(call: WithdrawCall) {
    this._call = call;
  }
}

export class WithdrawWithMessageCall extends ethereum.Call {
  get inputs(): WithdrawWithMessageCall__Inputs {
    return new WithdrawWithMessageCall__Inputs(this);
  }

  get outputs(): WithdrawWithMessageCall__Outputs {
    return new WithdrawWithMessageCall__Outputs(this);
  }
}

export class WithdrawWithMessageCall__Inputs {
  _call: WithdrawWithMessageCall;

  constructor(call: WithdrawWithMessageCall) {
    this._call = call;
  }

  get _l1Receiver(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _additionalData(): Bytes {
    return this._call.inputValues[1].value.toBytes();
  }
}

export class WithdrawWithMessageCall__Outputs {
  _call: WithdrawWithMessageCall;

  constructor(call: WithdrawWithMessageCall) {
    this._call = call;
  }
}