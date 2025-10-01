# Simple DeFi Portfolio Tracker

A beginner-friendly, front-end web application to check the token balances of any EVM-compatible wallet address. It reads data directly from the blockchain using an RPC URL and the Etherscan API.

## Features

- Checks native balance (e.g., ETH).
- Checks balances for a pre-defined list of popular ERC-20 tokens (USDC, WETH, DAI).
- Simple, clean interface.

## How to Use

1.  **Add Your API Keys:**
    * Open the `script.js` file.
    * At the top, replace the placeholder text for `RPC_URL` and `ETHERSCAN_API_KEY` with your own keys from services like Infura and Etherscan.

2.  **Run the Tracker:**
    * Simply open the `index.html` file in your web browser.
    * Enter a wallet address and click "Check Balance."

## Extending the Project
You can easily add more tokens to track by editing the `tokens` array in the `script.js` file.
