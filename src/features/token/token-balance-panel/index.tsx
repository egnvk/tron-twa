import { useGetBalance } from './hooks/use-get-balance'

type Props = {
  userWalletAddress: string
}

export function TokenBalancePanel({ userWalletAddress }: Props) {
  const balance = useGetBalance(userWalletAddress)

  return (
    <div>
      <p className="font-semibold">available balance DIT {balance}</p>
    </div>
  )
}
