import { getContract } from "thirdweb"
import { client } from "./client"
import { chainById } from "./chains"

export const contract = getContract({
  client: client,
  address: "0x24A2cBf8e7A6e4f2C798EDc691bbd784bFD53E34",
  chain: chainById,
})
