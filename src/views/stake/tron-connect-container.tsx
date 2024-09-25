import React from 'react'

import UniversalProvider from '@walletconnect/universal-provider'
import { WalletConnectModal } from '@walletconnect/modal'

import { TronChains, TronService } from '@/shared/chain-data'

const chains = [`tron:${TronChains.Mainnet}`]
const projectId = '3ad494ad48049053bd11e41eeed67dc5'
const events: string[] = []
const methods = ['tron_signMessage', 'tron_signTransaction']
const modal = new WalletConnectModal({
  projectId,
  chains
})

export function TronConnectContainer() {
  const [provider, setProvider] = React.useState<UniversalProvider | null>(null)
  const [tronService, setTronService] = React.useState<TronService | null>(null)
  const [isConnected, setIsConnected] = React.useState(false)
  const [address, setAddress] = React.useState('')
  const [balance, setBalance] = React.useState<number | null>(null)

  React.useEffect(() => {
    async function setOnInitProvider() {
      const providerValue = await UniversalProvider.init({
        logger: 'error', // log level
        projectId: projectId,
        metadata: {
          name: 'WalletConnect x Tron',
          description:
            "Tron integration with WalletConnect's Universal Provider",
          url: 'https://b1coin.dev-2-tech.ru',
          icons: ['https://avatars.githubusercontent.com/u/37784886']
        }
      })

      setProvider(providerValue)
    }

    setOnInitProvider()
  }, [])

  React.useEffect(() => {
    if (!provider) return

    provider.on('display_uri', async (uri: string) => {
      // console.log('uri', uri)
      await modal.openModal({
        uri
      })
    })
  }, [provider])

  React.useEffect(() => {
    async function getBalanceInit() {
      if (!tronService) return
      const res = await tronService.getBalance(address!)

      setBalance(res!)
    }

    if (!isConnected) return
    getBalanceInit()
  }, [isConnected, tronService, address])

  const connect = async () => {
    try {
      if (!provider) return

      await provider.connect({
        optionalNamespaces: {
          tron: {
            methods,
            chains,
            events
          }
        }
      })

      const tronServiceValue = new TronService(provider)
      setTronService(tronServiceValue)

      // console.log('session?', provider)

      const account = provider.session?.namespaces.tron?.accounts[0]
      if (account) {
        setAddress(account.split(':')[2])
        setIsConnected(true)
      }
    } catch {
      // console.log('Something went wrong, request cancelled')
    }
    modal.closeModal()
  }

  // const handleSign = async () => {
  //   console.log('signing')
  //   const res = await tronService!.signMessage(
  //     `Can i have authorize this request pls - ${Date.now()}`,
  //     address!
  //   )
  //   console.log('result sign: ', res)
  // }
  const handleGetBalance = async () => {
    const res = await tronService!.getBalance(address!)
    // console.log(res)
    setBalance(res)
  }
  // const handleSendTransaction = async () => {
  //   console.log('signing')
  //   const res = await tronService!.sendTransaction(address!, 100)
  //   console.log('result send tx: ', res)
  // }
  const disconnect = async () => {
    await provider!.disconnect()
    setIsConnected(false)
  }
  return (
    <div>
      {isConnected ? (
        <>
          <p>
            <b>Address: </b>
            {address}
            <br />
            <b>Balance: </b>
            {balance}
            <br />
          </p>
          <div className="flex flex-col gap-2 ">
            <button
              className="bg-black p-2 text-white"
              onClick={handleGetBalance}
            >
              get Balance
            </button>
            {/* <button className="bg-black p-2 text-white" onClick={handleSign}> */}
            {/*   Sign MSG */}
            {/* </button> */}
            {/* <button */}
            {/*   className="bg-black p-2 text-white" */}
            {/*   onClick={handleSendTransaction} */}
            {/* > */}
            {/*   Send Transaction */}
            {/* </button> */}
            <button className="bg-black p-2 text-white" onClick={disconnect}>
              Disconnect
            </button>
          </div>
        </>
      ) : (
        <button className="bg-black p-2 text-white" onClick={connect}>
          Connect
        </button>
      )}
    </div>
  )
}
