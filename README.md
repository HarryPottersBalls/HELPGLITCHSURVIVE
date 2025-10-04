GLITCH AI Trading Bot is an automated trading agent designed for the Solana blockchain using the Pump Swap SDK. It monitors liquidity pools, executes trades based on configurable AI-driven strategies, and tracks rewards, fees, and PnL in real-time.

The bot supports dry-run mode for safe testing and a live mode for actual trading, with built-in safeguards like slippage limits, retries, and risk controls.

Features

AI-powered strategy: reacts to pool price changes and market signals

Dry-run mode: simulate trades safely without touching your wallet

Creator rewards aware: automatically tracks and accounts for creator fees

Pool monitoring: fetches real-time pool state, base/quote reserves, and prices

Multi-mode execution: one-off cycles or continuous monitoring

Retry & backoff: robust to transient RPC errors or network issues

Architecture
┌───────────────┐
│   Frontend UI │  (Optional Dashboard)
└───────┬───────┘
        │ WebSocket / REST API
┌───────▼───────┐
│ Backend Trader│ Node.js / TypeScript
│  - AI Strategy│
│  - Pump SDK   │
│  - Solana RPC │
└───────┬───────┘
        │ Solana Transactions
┌───────▼───────┐
│ Solana Network│ On-chain Pools & Liquidity
└───────────────┘

Installation

Prerequisites:

Node.js 18+

npm or yarn

Solana wallet keypair

git clone https://github.com/yourusername/glitch-ai-trading-bot.git
cd glitch-ai-trading-bot
npm install

Environment Variables

Create a .env file or set environment variables in your system:

PRIVATE_KEY_JSON='[12,34,...]'       # Your wallet secret key array
RPC_URL='https://api.devnet.solana.com'
POOL_KEY='F1sherPool1234567890'
DRY_RUN=true                          # true = simulate trades, false = live trading
INTERVAL_MS=5000                      # Polling interval in milliseconds
THRESHOLD_PCT=0.003                   # Price movement threshold (0.3%)
MAX_RETRIES=3                          # Retry attempts for transactions
BACKOFF_BASE_MS=1000                   # Base for exponential backoff


Note: Never commit .env or private keys to GitHub.

Usage

Dry-run single cycle (safe demo):

ts-node src/auto-trader-pump-swap.ts --rpc https://api.devnet.solana.com --poolKey <POOL_PUBKEY> --dry-run --once


Continuous trading loop (dry-run):

ts-node src/auto-trader-pump-swap.ts --rpc https://api.devnet.solana.com --poolKey <POOL_PUBKEY> --dry-run


Live trading (experimental, use with caution):

ts-node src/auto-trader-pump-swap.ts --rpc https://api.mainnet-beta.solana.com --poolKey <POOL_PUBKEY> --dry-run false

CLI Options
Option	Description
--rpc	Solana RPC endpoint URL (required)
--poolKey	Public key of the pool to monitor (required)
--wallet	Path to keypair file or use PRIVATE_KEY_JSON env variable
--dry-run	Simulate trades without sending transactions (default: true)
--once	Run a single cycle and exit
--interval	Polling interval in milliseconds (default: 5000)
--thresholdPct	Price movement threshold for trading signals (default: 0.003)
--maxRetries	Max retry attempts for failed transactions (default: 3)
--backoffBaseMs	Base delay for exponential backoff in ms (default: 1000)
Safety & Best Practices

Always test on devnet with --dry-run=true before using mainnet.

Never expose your wallet private key publicly.

Set realistic slippage and trade size limits to avoid losses.

Monitor metrics: trade attempts, successes, failures, and signals.

Use backtesting or simulation mode to evaluate your strategy.

Contributing

Contributions are welcome!

Fork the repo

Create a feature branch: git checkout -b feature/my-feature

Commit your changes: git commit -m "Add new strategy"

Push to branch: git push origin feature/my-feature

Open a Pull Request

License

This project is licensed under the MIT License — see LICENSE
 for details.

Acknowledgements

Pump Swap SDK

Solana Blockchain & Web3.js
