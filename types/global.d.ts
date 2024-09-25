import { TronWeb } from 'tronweb'

declare global {
  interface Window {
    tron: NewTronWeb
  }

  interface NewTronWeb {
    tronWeb: TronWeb
  }
}
