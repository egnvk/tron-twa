'use client'

import React from 'react'

import { TronConnectContainer } from './tron-connect-container'

// import { WalletActionButton } from '@tronweb3/tronwallet-adapter-react-ui'
// import { useWallet } from '@tronweb3/tronwallet-adapter-react-hooks'

// import { TokenBalancePanel } from '@/features/token/token-balance-panel'
// import { TokenStakePanel } from '@/features/token/token-stake-panel'

export function StakePage() {
  // const { wallet } = useWallet()

  return (
    <div className="flex flex-col gap-3">
      {/* <WalletActionButton /> */}

      {/* {wallet?.adapter.address && ( */}
      {/*   <div> */}
      {/*     <TokenBalancePanel userWalletAddress={wallet?.adapter.address} /> */}
      {/*     <TokenStakePanel /> */}
      {/*   </div> */}
      {/* )} */}

      {/* <w3m-button /> */}
      <TronConnectContainer />
    </div>
  )
}
