import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { WagmiProvider } from 'wagmi'
import { tron } from 'wagmi/chains'

// 0. Setup queryClient
const queryClient = new QueryClient()

// 1. Your Reown Cloud project ID
const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID || ''

// 2. Create wagmiConfig
const metadata = {
  name: 'b1coin-app',
  description: 'AppKit Example',
  url: 'https://b1coin.dev-2-tech.ru',
  icons: ['https://assets.reown.com/reown-profile-pic.png']
}

const chains = [tron] as const
const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true
  // ...wagmiOptions
})

// 3. Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: false,
  enableOnramp: true
})

export function Web3ModalProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}
