import React from 'react'

import { TronChainData } from '@/shared/chain-data/tron'
import { ChainNamespaces } from '@/shared/chain-data'

interface IContext {
  chainData: ChainNamespaces
}

export const ChainDataContext = React.createContext<IContext>({} as IContext)

export function ChainContextProvider({
  children
}: {
  children: React.ReactNode
}) {
  const chainData: ChainNamespaces = {
    tron: TronChainData
  }

  return (
    <ChainDataContext.Provider
      value={{
        chainData
      }}
    >
      {children}
    </ChainDataContext.Provider>
  )
}
