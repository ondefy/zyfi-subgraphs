import {
  Mint as MintEvent,
  Transfer as TransferEvent,
  Withdrawal as WithdrawalEvent,
  WithdrawalWithMessage as WithdrawalWithMessageEvent
} from "../generated/Contract/Contract"
import {
  Mint,
  Transfer,
  Withdrawal,
  WithdrawalWithMessage
} from "../generated/schema"

export function handleMint(event: MintEvent): void {
  let entity = new Mint(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.from = event.params.from
  entity.to = event.params.to
  entity.value = event.params.value

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleWithdrawal(event: WithdrawalEvent): void {
  let entity = new Withdrawal(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._l2Sender = event.params._l2Sender
  entity._l1Receiver = event.params._l1Receiver
  entity._amount = event.params._amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleWithdrawalWithMessage(
  event: WithdrawalWithMessageEvent
): void {
  let entity = new WithdrawalWithMessage(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._l2Sender = event.params._l2Sender
  entity._l1Receiver = event.params._l1Receiver
  entity._amount = event.params._amount
  entity._additionalData = event.params._additionalData

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
