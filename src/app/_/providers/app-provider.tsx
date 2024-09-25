'use client'

import React from 'react'

// import {
//   WalletError,
//   WalletNotFoundError,
//   WalletDisconnectedError
// } from '@tronweb3/tronwallet-abstract-adapter'
// import { WalletModalProvider } from '@tronweb3/tronwallet-adapter-react-ui'
// import { WalletProvider } from '@tronweb3/tronwallet-adapter-react-hooks'
import { NextUIProvider } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
// import toast from 'react-hot-toast'

import '@tronweb3/tronwallet-adapter-react-ui/style.css'
// import { ChainContextProvider } from './chain-context-provider'

// import { Web3ModalProvider } from './web3modal-provider'

type Props = {
  children: React.ReactNode
}

export default function AppProvider({ children }: Props) {
  const router = useRouter()

  // const onError = (e: WalletError) => {
  //   if (e instanceof WalletNotFoundError) {
  //     toast.error(e.message)
  //   } else if (e instanceof WalletDisconnectedError) {
  //     toast.error(e.message)
  //   } else toast.error(e.message)
  // }

  return (
    <NextUIProvider navigate={router.push}>
      {/* <Web3ModalProvider>{children}</Web3ModalProvider> */}
      {children}
    </NextUIProvider>
  )
}
