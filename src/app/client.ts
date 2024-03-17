import { createThirdwebClient } from "thirdweb"

const clientId = process.env.NEXT_PUBLIC_CLIENT_ID

if (!clientId) {
  throw new Error("No clientId provided")
}

export const client = createThirdwebClient({
  clientId: clientId,
})
