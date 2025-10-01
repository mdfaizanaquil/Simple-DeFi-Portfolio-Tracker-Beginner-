// --- CONFIGURATION ---
// PASTE YOUR KEYS HERE
const RPC_URL = "YOUR_INFURA_OR_ALCHEMY_RPC_URL";
const ETHERSCAN_API_KEY = "YOUR_ETHERSCAN_API_KEY";

// Add tokens you want to track here
const tokens = [
    { symbol: 'WETH', address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2' },
    { symbol: 'USDC', address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48' },
    { symbol: 'DAI', address: '0x6B175474E89094C44Da98b954EedeAC495271d0F' }
];

// --- APPLICATION LOGIC ---
const checkBalanceBtn = document.getElementById('checkBalanceBtn');
const walletAddressInput = document.getElementById('walletAddress');
const resultsDiv = document.getElementById('results');

checkBalanceBtn.addEventListener('click', async () => {
    const walletAddress = walletAddressInput.value;
    if (!ethers.utils.isAddress(walletAddress)) {
        resultsDiv.innerText = "Error: Invalid wallet address.";
        return;
    }
    resultsDiv.innerText = "Loading...";

    try {
        const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
        let output = "";

        // 1. Get Native Balance (ETH)
        const balance = await provider.getBalance(walletAddress);
        output += `ETH: ${ethers.utils.formatEther(balance)}\n\n`;

        // 2. Get ERC-20 Token Balances via Etherscan API
        output += "ERC-20 Tokens:\n";
        for (const token of tokens) {
            const apiUrl = `https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=${token.address}&address=${walletAddress}&tag=latest&apikey=${ETHERSCAN_API_KEY}`;
            const response = await fetch(apiUrl);
            const data = await response.json();
            const tokenBalance = ethers.utils.formatUnits(data.result, 18); // Assumes 18 decimals, adjust if needed
            output += `${token.symbol}: ${tokenBalance}\n`;
        }
        
        resultsDiv.innerText = output;

    } catch (error) {
        resultsDiv.innerText = `Error: ${error.message}`;
    }
});
