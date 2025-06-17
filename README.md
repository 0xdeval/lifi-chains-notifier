# LiFi Chains Notifier

A monitoring script that tracks new blockchain networks added to the [LiFi](https://li.fi) exchange platform. This tool automatically detects when new chains are added or removed from LiFi's supported networks and sends notifications via Telegram.

## 🎯 Purpose

The goal of this script is to monitor the LiFi exchange for new blockchain networks that get added to their platform. LiFi is a cross-chain DEX aggregator that supports multiple blockchain networks for token swaps and bridging. When new chains are added to LiFi, it often indicates:

- New blockchain networks gaining adoption
- Expansion of DeFi ecosystem
- Potential investment opportunities
- Market trends in blockchain development

## 🔄 Workflow

### 1. **Data Source**

- Fetches the latest network configuration from LiFi's official repository: `https://raw.githubusercontent.com/lifinance/contracts/refs/heads/main/config/networks.json`
- This file contains all supported blockchain networks with their chain IDs and configuration

### 2. **Change Detection**

- Compares the current network list with a locally cached version (`networks.cache.json`)
- Identifies newly added chains and removed chains
- Only triggers notifications when changes are detected

### 3. **Notification System**

- Sends formatted Telegram messages when changes are detected
- Messages include:
  - Date of detection
  - List of newly added chain IDs
  - List of removed chain IDs (if any)

### 4. **Automated Execution**

- Runs automatically every Monday at 08:00 UTC via GitHub Actions
- Can also be triggered manually through GitHub Actions workflow dispatch
- Updates the local cache file after each check

## 🚀 Quick Start

### Prerequisites

- [Bun](https://bun.sh) runtime (v1.1.45 or later)
- Telegram Bot Token and Chat ID for notifications

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd lifi-chains-notifier
   ```

2. **Install dependencies**

   ```bash
   bun install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:

   ```env
   TELEGRAM_BOT_TOKEN=your_telegram_bot_token
   TELEGRAM_CHAT_ID=your_chat_id
   ```

4. **Run the script**
   ```bash
   bun run index.ts
   ```

## 🔧 Configuration

### Environment Variables

- `TELEGRAM_BOT_TOKEN`: Your Telegram bot token (required)
- `TELEGRAM_CHAT_ID`: The chat ID where notifications should be sent (required)

### GitHub Secrets (for automated workflow)

- `TELEGRAM_BOT_TOKEN`: Same as above
- `TELEGRAM_CHAT_ID`: Same as above

## 📋 Project Structure

```
lifi-chains-notifier/
├── index.ts                 # Main monitoring script
├── utils/
│   └── telegram.ts         # Telegram notification utility
├── .github/workflows/
│   └── check-chains.yml    # GitHub Actions workflow
├── networks.cache.json     # Local cache of network data
├── package.json           # Project dependencies
└── README.md             # This file
```

## 🔍 How It Works

1. **Fetch Remote Data**: The script downloads the latest `networks.json` from LiFi's repository
2. **Compare with Cache**: Compares the current network list with the previously cached version
3. **Detect Changes**: Identifies any new chain IDs added or removed
4. **Send Notifications**: If changes are found, sends a formatted message to Telegram
5. **Update Cache**: Saves the current network list for the next comparison

## 📊 Example Output

When new chains are detected, you'll receive a Telegram message like:

```
LiFi Chain Monitor
📅 15.01.2024
🆕 Added: `1234`, `5678`, `9012`
```

## 🤖 Automation

The script is configured to run automatically via GitHub Actions:

- **Schedule**: Every Monday at 08:00 UTC
- **Manual Trigger**: Available through GitHub Actions workflow dispatch
- **Cache Management**: Automatically commits updated cache files when changes are detected

## ��️ Development

This project was created using `bun init` in bun v1.1.45. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

### Dependencies

- `dotenv`: Environment variable management
- `@types/bun`: TypeScript types for Bun
- `typescript`: TypeScript support

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
