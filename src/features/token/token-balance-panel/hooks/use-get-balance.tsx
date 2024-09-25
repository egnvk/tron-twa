import React from 'react'

import toast from 'react-hot-toast'

import { useTronWeb } from '@/entities/network'

const abi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address'
      }
    ],
    name: 'balanceOf',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    outputs: [{ type: 'bool' }],
    inputs: [
      { name: '_to', type: 'address' },
      { name: '_value', type: 'uint256' }
    ],
    name: 'transfer',
    stateMutability: 'Nonpayable',
    type: 'Function'
  }
]

export function useGetBalance(userWalletAddress: string) {
  const tronWeb = useTronWeb()
  const [balance, setBalance] = React.useState(0)

  React.useEffect(() => {
    const getBalance = async () => {
      if (!tronWeb) return 0

      try {
        const DITcontractAddress = 'TVPMChbEtPgEj6TXsSyRbJRw12qppkFMdq'
        const contract = tronWeb.contract(abi, DITcontractAddress)
        const result = await contract.balanceOf(userWalletAddress).call()
        const decimals = 1e18
        setBalance(Number(result) / decimals)
      } catch (error) {
        toast.error(`Try later! ${error}`)
        return 0
      }
    }

    getBalance()
  }, [userWalletAddress, tronWeb])

  return balance
}
