# NanoForm AI

> **AI-Powered Nanomedicine Formulation Platform**
> Part of the NanoSovereign Bio-Operating System for Therapeutic Materials

## Overview

NanoForm AI is a React-based frontend application for managing nanomedicine R&D workflows, including:

- **Electronic Lab Notebook (ELN)** - Projects, experiments, and batch management
- **AI Formulation Optimizer** - Predict particle properties from process parameters
- **Instrument Data Management** - Connect and import data from lab instruments
- **Compliance & Audit** - 21 CFR Part 11 compliant audit trails and model governance

## Tech Stack

- **React 18** + TypeScript
- **Vite** - Build tool
- **shadcn/ui** - UI components
- **Tailwind CSS** - Styling
- **Recharts** - Data visualization
- **React Router** - Navigation
- **React Query** - Data management

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/isararsiddique/nanoform-ai.git
cd nanoform-ai

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
npm run test     # Run tests
```

## Project Structure

```
src/
├── components/
│   ├── eln/           # ELN-specific components
│   ├── layout/        # App layout components
│   └── ui/            # shadcn/ui components
├── contexts/          # React contexts
├── data/              # Mock data
├── hooks/             # Custom hooks
├── lib/               # Utilities
├── pages/             # Page components
├── test/              # Test files
└── types/             # TypeScript types
```

## Features

### Electronic Lab Notebook
- Hierarchical project → experiment → batch structure
- Process parameter tracking (lipid composition, flow rate, temperature, pH)
- Characterization data management (DLS, HPLC, TEM)

### AI Optimizer
- Input formulation parameters via interactive sliders
- Predict particle properties (size, PDI, encapsulation efficiency, zeta potential)
- Confidence intervals and visualization

### Instrument Integration
- Monitor instrument status (online/offline/maintenance)
- Upload and link instrument data to batches
- Support for DLS, HPLC, TEM, Mass Spec, UV-Vis

### Compliance
- Full audit trail logging
- Model cards for AI governance
- Data sovereignty indicators

## Team

**Arshi Niyaz** - Founder & CEO  
**Isarar Siddique** - Development Advisor

## License

Proprietary - All rights reserved

© 2024 Arshi Niyaz. All Rights Reserved.
