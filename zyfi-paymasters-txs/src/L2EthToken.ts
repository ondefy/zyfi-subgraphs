import { Address, BigInt } from '@graphprotocol/graph-ts'
import { Transfer as TransferEvent } from '../generated/L2EthToken/L2EthToken'
import { PaymasterTransaction } from '../generated/schema'

const BOOTLOADER = Address.fromString('0x0000000000000000000000000000000000008001')
const ZYFI_PAYMASTERS = [
  Address.fromString('0x418F8EA78D856bEcf95e08C4A5773F5E85147866'), // ERC20 Sponsored Paymaster
  Address.fromString('0xA2Aac7bC9725c36ad9B12D2407dF8de6B2B68359'), // ERC20 Paymaster
  Address.fromString('0xa2D1AE31C2236fBE054c6C9fBDEF27e78ac78D71'), // ZyfiPaymaster (ERC20 Paymaster v0.5)
  Address.fromString('0x9702beC6668A94619a9c3cfef0e220512FbEEfbd'), // First Paymaster version
]

export function handleTransfer(event: TransferEvent): void {
  if (event.transaction.from.equals(event.params.from)) {
    // sender of the transaction cannot be the same account being withdrawn
    return
  }
  if (event.params.from.equals(Address.zero())) {
    // cannot be a mint event (token originating from the zero address)
    return
  }
  if (event.params.to.equals(BOOTLOADER) && ZYFI_PAYMASTERS.includes(event.params.from)) {
    // beginning of the transaction, Zyfi Paymaster is sending value to the bootloader
    const id = event.transaction.hash
    const entity = new PaymasterTransaction(id)
    entity.from = event.transaction.from
    entity.to = event.transaction.to as Address
    entity.paymaster = event.params.from
    entity.value = event.params.value
    entity.blockTimestamp = event.block.timestamp
    entity.save()
    return
  }
  if (event.params.from.equals(BOOTLOADER)) {
    // bootloader sending value means refund
    const id = event.transaction.hash
    const entity = PaymasterTransaction.load(id)
    if (entity) {
      if (entity.refundValue) {
        entity.refundValue = (entity.refundValue as BigInt).plus(event.params.value)
      } else {
        entity.refundValue = event.params.value
        entity.refundedTo = event.params.to
      }
      entity.save()
    }
  }
}

// Auto generated code

// export function handleMint(event: MintEvent): void {
//   let entity = new Mint(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   )
//   entity.account = event.params.account
//   entity.amount = event.params.amount

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handleTransfer(event: TransferEvent): void {
//   let entity = new Transfer(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   )
//   entity.from = event.params.from
//   entity.to = event.params.to
//   entity.value = event.params.value

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handleWithdrawal(event: WithdrawalEvent): void {
//   let entity = new Withdrawal(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   )
//   entity._l2Sender = event.params._l2Sender
//   entity._l1Receiver = event.params._l1Receiver
//   entity._amount = event.params._amount

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handleWithdrawalWithMessage(
//   event: WithdrawalWithMessageEvent
// ): void {
//   let entity = new WithdrawalWithMessage(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   )
//   entity._l2Sender = event.params._l2Sender
//   entity._l1Receiver = event.params._l1Receiver
//   entity._amount = event.params._amount
//   entity._additionalData = event.params._additionalData

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }
