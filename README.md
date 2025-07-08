Fund Forge

A blockchain-based crowdfunding platform UI built with Vite React TypeScript. This project provides a complete frontend implementation for transparent, community-driven project funding with milestone-based releases and smart contract integration (backend integration planned).
🚀 Current Implementation Status
✅ Implemented (UI Complete)

    Project Creation Interface - Complete form for project setup with milestones

    Project Display System - Cards, grids, and detailed project views

    Funding Interface - ETH input forms and funding panels

    Voting Interface - Milestone voting UI and progress tracking

    Dashboard System - User dashboard with tabs and analytics display

    Wallet Connection UI - Wallet connection components and network selection

    Theme System - Dark/light theme switching with system preference support

    Responsive Design - Mobile-first design that works on all devices

    Search & Filtering - Advanced project discovery and filtering UI

    Navigation System - Complete navigation with wallet integration

🔄 To Be Implemented (Backend Integration)

    Smart Contract Integration - Web3 provider and contract interaction

    Blockchain Transactions - Actual ETH funding and milestone voting

    IPFS Integration - Decentralized image and metadata storage

    Real Database - Replace mock data with actual backend API

    Authentication System - User accounts and project ownership

    Multi-Chain Support - Actual deployment on Ethereum, Polygon, BSC

    Token Rewards - FRG governance token smart contracts

    Security Audits - Professional smart contract auditing

🛠 Tech Stack
Frontend (Implemented)

    Framework: Vite + React 18 + TypeScript

    Styling: Tailwind CSS + shadcn/ui (Slate theme)

    Routing: React Router DOM

    Icons: Lucide React

    Notifications: Sonner

    State Management: React Hooks + Context API

    Component Library: shadcn/ui with custom components

Backend (To Be Implemented)

    Blockchain: Web3.js/Ethers.js integration

    Storage: IPFS for decentralized file storage

    Database: PostgreSQL/MongoDB for user data

    API: Node.js/Express backend

    Smart Contracts: Solidity contracts for funding logic

📋 Prerequisites

    Node.js 18+

    npm/yarn/pnpm

    MetaMask or compatible Web3 wallet (for future blockchain integration)

🚀 Quick Start
Installation

bash
# Clone the repository
git clone https://github.com/vedantlahane/fundforge.git
cd fund-forge

# Install dependencies
npm install

# Start development server
npm run dev


📁 Project Structure



fund-forge/
├── src/
│   ├── components/           # React components (✅ Complete)
│   │   ├── ui/              # shadcn/ui components
│   │   ├── project-card.tsx
│   │   ├── project-grid.tsx
│   │   ├── navigation.tsx
│   │   ├── funding-panel.tsx
│   │   ├── voting-panel.tsx
│   │   └── ...
│   ├── hooks/               # Custom React hooks (✅ UI Logic Complete)
│   │   ├── use-projects.ts    # Mock data implementation
│   │   ├── use-wallet.ts      # UI state only
│   │   ├── use-voting.ts      # UI simulation
│   │   └── ...
│   ├── types/               # TypeScript definitions (✅ Complete)
│   │   └── project.ts
│   ├── pages/               # Page components (✅ Complete)
│   └── styles/              # Global styles (✅ Complete)
├── public/                  # Static assets
└── docs/                   # Documentation



🙏 Acknowledgments

    shadcn/ui for the component system

    Tailwind CSS for styling

    Lucide for icons

    Vite for the build tool

    React for the UI framework


Current Status: Complete UI implementation ready for blockchain integration

Next Milestone: Backend API and smart contract development

Built with ❤️ for the decentralized future