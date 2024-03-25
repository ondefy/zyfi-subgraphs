import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  Mint,
  Transfer,
  Withdrawal,
  WithdrawalWithMessage
} from "../generated/Contract/Contract"

export function createMintEvent(account: Address, amount: BigInt): Mint {
  let mintEvent = changetype<Mint>(newMockEvent())

  mintEvent.parameters = new Array()

  mintEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  mintEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return mintEvent
}

export function createTransferEvent(
  from: Address,
  to: Address,
  value: BigInt
): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent())

  transferEvent.parameters = new Array()

  transferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return transferEvent
}

export function createWithdrawalEvent(
  _l2Sender: Address,
  _l1Receiver: Address,
  _amount: BigInt
): Withdrawal {
  let withdrawalEvent = changetype<Withdrawal>(newMockEvent())

  withdrawalEvent.parameters = new Array()

  withdrawalEvent.parameters.push(
    new ethereum.EventParam("_l2Sender", ethereum.Value.fromAddress(_l2Sender))
  )
  withdrawalEvent.parameters.push(
    new ethereum.EventParam(
      "_l1Receiver",
      ethereum.Value.fromAddress(_l1Receiver)
    )
  )
  withdrawalEvent.parameters.push(
    new ethereum.EventParam(
      "_amount",
      ethereum.Value.fromUnsignedBigInt(_amount)
    )
  )

  return withdrawalEvent
}

export function createWithdrawalWithMessageEvent(
  _l2Sender: Address,
  _l1Receiver: Address,
  _amount: BigInt,
  _additionalData: Bytes
): WithdrawalWithMessage {
  let withdrawalWithMessageEvent = changetype<WithdrawalWithMessage>(
    newMockEvent()
  )

  withdrawalWithMessageEvent.parameters = new Array()

  withdrawalWithMessageEvent.parameters.push(
    new ethereum.EventParam("_l2Sender", ethereum.Value.fromAddress(_l2Sender))
  )
  withdrawalWithMessageEvent.parameters.push(
    new ethereum.EventParam(
      "_l1Receiver",
      ethereum.Value.fromAddress(_l1Receiver)
    )
  )
  withdrawalWithMessageEvent.parameters.push(
    new ethereum.EventParam(
      "_amount",
      ethereum.Value.fromUnsignedBigInt(_amount)
    )
  )
  withdrawalWithMessageEvent.parameters.push(
    new ethereum.EventParam(
      "_additionalData",
      ethereum.Value.fromBytes(_additionalData)
    )
  )

  return withdrawalWithMessageEvent
}
