# FundForge

A decentralized crowdfunding platform built on Ethereum blockchain, enabling creators to raise funds through milestone-based campaigns with transparent governance and reward systems.

## 🌟 Features

- **Decentralized Crowdfunding**: Create and fund campaigns on the Ethereum blockchain
- **Milestone-Based Funding**: Funds are released based on completed milestones
- **Governance System**: Token-based voting for campaign decisions
- **Reward Tokens**: Contributors earn tokens for participating in campaigns
- **Platform Security**: Built with OpenZeppelin contracts for enhanced security
- **Dark/Light Theme**: Modern responsive UI with theme switching
- **Real-time Updates**: Live campaign statistics and progress tracking

## 🏗️ Architecture

### Smart Contracts
- **CrowdfundingFactory**: Main factory contract for creating and managing campaigns
- **Campaign**: Individual campaign contract with milestone functionality
- **Governance**: Decentralized governance for platform decisions
- **RewardToken**: ERC-20 token for rewarding contributors

### Frontend
- **React 19** with TypeScript
- **Vite** for fast development and building
- **TailwindCSS** for styling
- **Web3.js** for blockchain interaction
- **React Router** for navigation
- **React Hot Toast** for notifications

## 🛠️ Tech Stack

### Blockchain
- Solidity ^0.8.19
- Truffle Framework
- OpenZeppelin Contracts
- Ganache (for local development)

### Frontend
- React 19.1.0
- TypeScript 5.8.3
- Vite 7.0.4
- TailwindCSS 4.1.11
- Web3.js 4.16.0
- Lucide React (icons)

## 📦 Installation

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn
- Ganache CLI or Ganache GUI
- MetaMask browser extension

### Clone the Repository
```bash
git clone https://github.com/vedantlahane/fundforge.git
cd fundforge
```

### Smart Contracts Setup
```bash
cd contracts
npm install

# Compile contracts
truffle compile

# Start Ganache (in another terminal)
ganache-cli

# Deploy contracts to local network
truffle migrate --network development

# Run tests
truffle test
```

### Frontend Setup
```bash
cd ../frontend
npm install

# Start development server
npm run dev
```

## 🚀 Usage

### For Campaign Creators
1. Connect your MetaMask wallet
2. Navigate to "Create Campaign"
3. Fill in campaign details (title, description, goal, deadline)
4. Set up milestones for fund release
5. Deploy your campaign to the blockchain

### For Contributors
1. Browse active campaigns on the "Explore" page
2. View campaign details and milestones
3. Contribute ETH to campaigns you support
4. Track campaign progress and milestone completion
5. Participate in governance voting

### For Platform Governance
1. Hold reward tokens to participate in governance
2. Vote on platform proposals and changes
3. Influence platform fee adjustments and policies

## 🔧 Configuration

### Environment Variables
Create `.env` files in the respective directories:

**contracts/.env**
```
MNEMONIC=your_wallet_mnemonic_here
INFURA_PROJECT_ID=your_infura_project_id
```

### Network Configuration
The project supports:
- **Development**: Local Ganache network (port 7545)
- **Sepolia**: Ethereum testnet for testing
- **Mainnet**: Production deployment (configure as needed)

## 📁 Project Structure

```
fundforge/
├── contracts/                 # Smart contracts
│   ├── contracts/
│   │   ├── Campaign.sol
│   │   ├── CrowdfundingFactory.sol
│   │   ├── Governance.sol
│   │   └── RewardToken.sol
│   ├── migrations/
│   ├── test/
│   └── truffle-config.js
└── frontend/                  # React frontend
    ├── src/
    │   ├── components/
    │   ├── contexts/
    │   ├── hooks/
    │   ├── pages/
    │   └── utils/
    └── package.json
```

## 🧪 Testing

### Smart Contract Tests
```bash
cd contracts
truffle test
```

### Frontend Tests
```bash
cd frontend
npm run lint
```

## 🚀 Deployment

### Local Development
1. Start Ganache
2. Deploy contracts: `truffle migrate --network development`
3. Start frontend: `npm run dev`

### Testnet Deployment
```bash
cd contracts
truffle migrate --network sepolia
```

### Production Build
```bash
cd frontend
npm run build
```

## 💡 Key Features Explained

### Milestone-Based Funding
- Funds are locked in escrow until milestones are completed
- Contributors can vote on milestone completion
- Provides accountability and reduces risk for contributors

### Platform Fee System
- Configurable platform fee (default: 2.5%)
- Fees collected support platform development
- Transparent fee structure

### Governance Token System
- Contributors earn reward tokens
- Tokens enable voting on platform decisions
- Decentralized governance ensures community control

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Repository**: https://github.com/vedantlahane/fundforge
- **Issues**: https://github.com/vedantlahane/fundforge/issues

## ⚠️ Disclaimer

This is a demonstration project for educational purposes. Always conduct thorough testing and security audits before deploying to mainnet with real funds.

---

Built with ❤️ by [Vedant Lahane](https://github.com/vedantlahane)
