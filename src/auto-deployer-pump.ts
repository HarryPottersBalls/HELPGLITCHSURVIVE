import { PumpAmmSdk } from "@pump-fun/pump-swap-sdk";
import { Keypair, Connection, PublicKey } from "@solana/web3.js";
import dotenv from "dotenv";

dotenv.config();

async function main() {
  const rpcUrl = process.env.RPC_URL || "https://api.devnet.solana.com";
  const connection = new Connection(rpcUrl, "confirmed");

  // Load wallet
  const secretKey = JSON.parse(process.env.PRIVATE_KEY_JSON!);
  const wallet = Keypair.fromSecretKey(Uint8Array.from(secretKey));
  console.log("Wallet public key:", wallet.publicKey.toBase58());

  // Initialize Pump SDK
  const pumpAmmSdk = new PumpAmmSdk();

  // Example: Create a new pool (placeholder mints for demo)
  const baseMint = new PublicKey("So11111111111111111111111111111111111111112"); // placeholder
  const quoteMint = new PublicKey("So11111111111111111111111111111111111111112"); // placeholder
  const index = 0; // pool index for demo

  console.log("Creating test pool...");
  const createPoolState = await pumpAmmSdk.createPoolSolanaState(
    index,
    wallet.publicKey,
    baseMint,
    quoteMint
  );

  const baseIn = 1_000_000; // 1 token
  const quoteIn = 1_000_000; // 1 token

  const createPoolInstructions = await pumpAmmSdk.createPoolInstructions(
    createPoolState,
    baseIn,
    quoteIn
  );

  console.log("Pool instructions prepared (demo, not sent).");
  console.log("Pool State:", createPoolState);

  // Deposit demo
  console.log("Preparing deposit instructions...");
  const liquidityState = await pumpAmmSdk.liquiditySolanaState(
    createPoolState.poolKey!,
    wallet.publicKey
  );

  const { quote, lpToken } = await pumpAmmSdk.depositAutocompleteQuoteAndLpTokenFromBase(
    liquidityState,
    baseIn,
    0.01 // 1% slippage
  );

  const depositInstructions = await pumpAmmSdk.d
