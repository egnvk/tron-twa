import React from 'react'

import { useWallet } from '@tronweb3/tronwallet-adapter-react-hooks'

export function useTronWeb() {
  const { connected } = useWallet()

  const tronWeb = React.useMemo(() => {
    if (connected) {
      const tron = window.tron

      if (tron) {
        return tron.tronWeb
      }
    }
  }, [connected])

  return tronWeb
}
