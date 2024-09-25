import React from 'react'

import { useWallet } from '@tronweb3/tronwallet-adapter-react-hooks'
import { Button, Input } from '@nextui-org/react'
import clsx from 'clsx'

import { useTronWeb } from '@/entities/network'

export function TokenStakePanel() {
  const [inputAmount, setInputAmount] = React.useState('')
  const { connected } = useWallet()
  const tronWeb = useTronWeb()

  const handleClickStake = async (inputAmount: string) => {
    if (inputAmount.length > 0 && tronWeb && connected) {
      const amountInSun = tronWeb.toSun(Number(inputAmount))

      const tokenDitAddress = 'TVPMChbEtPgEj6TXsSyRbJRw12qppkFMdq'
      const stakeSmartContractAddress = 'TNAPEf5biRjsdpMZ3FPJdGrmSGd7HxcyFu'

      const approveTx = await tronWeb.transactionBuilder.triggerSmartContract(
        tokenDitAddress,
        'approve(address,uint256)',
        {},
        [
          {
            type: 'address',
            value: stakeSmartContractAddress
          },
          { type: 'uint256', value: amountInSun }
        ]
      )
      const signedApproveTx = await tronWeb.trx.sign(approveTx.transaction)
      const approveResult =
        await tronWeb.trx.sendRawTransaction(signedApproveTx)

      if (approveResult.result) {
        const stakeTx = await tronWeb.transactionBuilder.triggerSmartContract(
          stakeSmartContractAddress,
          'stake(uint256)',
          {},
          [{ type: 'uint256', value: amountInSun }]
        )
        const signedStakeTx = await tronWeb.trx.sign(stakeTx.transaction)
        await tronWeb.trx.sendRawTransaction(signedStakeTx)
      }
    }
  }

  return (
    <div>
      <Input
        type="number"
        label="Amount"
        labelPlacement="inside"
        value={inputAmount}
        onValueChange={setInputAmount}
        classNames={{
          inputWrapper: 'h-fit py-[0.625rem]',
          innerWrapper: 'pb-0 h-fit'
        }}
        // endContent={
        //   <button
        //     onClick={() => setInputAmount(balanceRawNano)}
        //     className="rounded-md bg-custom-blue-500 px-3 py-2 text-[1rem] font-normal leading-6 text-white"
        //   >
        //     Max
        //   </button>
        // }
      />

      <Button
        // isLoading={isLoading}
        // isDisabled={isDisabled}
        onClick={() => handleClickStake(inputAmount)}
        className={clsx(
          'h-fit rounded-custom-br-sm py-[1.125rem] text-[1rem] font-normal leading-6 text-[#000000]',
          connected
            ? 'bg-custom-green-500 text-base font-bold text-white'
            : 'bg-custom-gray-500 opacity-50'
        )}
      >
        Stake
      </Button>
    </div>
  )
}
