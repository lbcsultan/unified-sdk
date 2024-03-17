"use client"
import styles from "./page.module.css"
import { ConnectButton } from "@/app/thirdweb"
import { chainById } from "./chains"
import {
  useActiveAccount,
  useActiveWallet,
  useActiveWalletConnectionStatus,
} from "thirdweb/react"
import { useEffect, useState } from "react"
import { readContract, toEther } from "thirdweb"
import { contract } from "./contracts"

export default function Home() {
  const status = useActiveWalletConnectionStatus()
  console.log(status)

  const account = useActiveAccount()
  console.log(account)

  const wallet = useActiveWallet()
  console.log(wallet)

  const [tokenBalance, setTokenBalance] = useState("0")
  useEffect(() => {
    const fetchTokenBalance = async () => {
      const balance = await readContract({
        contract: contract,
        method: "function balanceOf(address) view returns (uint256)",
        params: [account?.address as string],
      })
      setTokenBalance(toEther(balance))
    }
    if (account) {
      fetchTokenBalance()
    }
  }, [account])

  return (
    <main className={styles.main}>
      <h1>Web3 App. Hello</h1>
      <ConnectButton chain={chainById} />
      {account && (
        <>
          <h2>Account data: </h2>
          <p>Address: {account.address}</p>
          <h2>Wallet data:</h2>
          <p>Address: {wallet?.getAccount()?.address} </p>
          <p>Wallet type: {wallet?.metadata.name}</p>
          <p>Chain: {wallet?.getChain()?.id}</p>
          <h2>Token balance:</h2>
          <p>{tokenBalance}</p>
        </>
      )}
      <h2>Connection:</h2>
      <p>Status: {status}</p>
    </main>
  )
}
