<p align="center">
  <img src="public/favicon.ico" alt="NanoForm AI Logo" width="80" height="80">
</p>

<h1 align="center">NanoForm AI</h1>

<p align="center">
  <strong>AI-Powered Nanomedicine Formulation Platform</strong>
</p>

<p align="center">
  <em>Part of the NanoSovereign Bio-Operating System for Therapeutic Materials</em>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#demo">Demo</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#team">Team</a> •
  <a href="#license">License</a>
</p>

---

## Overview

NanoForm AI is an intelligent R&D platform designed for nanomedicine formulation development. It combines Electronic Lab Notebook (ELN) capabilities with AI-powered optimization to accelerate lipid nanoparticle (LNP) research and development.

The platform addresses critical challenges in nanomedicine R&D:
- **Data Fragmentation** — Unified data model linking Process → Structure → Property → Performance
- **Manual Optimization** — AI-driven formulation suggestions based on Bayesian optimization
- **Compliance Requirements** — Built-in audit trails and regulatory documentation support

## Features

### 📓 Electronic Lab Notebook (ELN)
- Hierarchical organization: Projects → Experiments → Batches
- Complete process parameter tracking (lipid composition, flow rates, temperature, pH)
- Characterization data management with visualization
- Responsive collapsible panel design for efficient navigation

### 🧠 AI Formulation Optimizer
- Interactive parameter input with real-time sliders
- Multi-output predictions: particle size, PDI, encapsulation efficiency, zeta potential
- Confidence intervals and uncertainty quantification
- Prediction history tracking

### 🔬 Instrument Integration
- Support for DLS, HPLC, TEM, Mass Spectrometry, UV-Vis
- Real-time instrument status monitoring
- Automated data upload and batch linking

### 📋 Compliance & Audit
- Complete audit trail logging
- Model cards for AI governance
- Data sovereignty indicators
- Electronic signature support (21 CFR Part 11 ready)

### 📊 Analytics Dashboard
- Project and experiment statistics
- Recent activity feed
- Quick action shortcuts

## Demo

🌐 **Live Demo:** [nano.biotechwallah.com](http://nano.biotechwallah.com)

## Tech Stack

| Category | Technology |
|----------|------------|
| **Frontend** | React 18, TypeScript |
| **Build Tool** | Vite |
| **UI Components** | shadcn/ui, Radix UI |
| **Styling** | Tailwind CSS |
| **Charts** | Recharts |
| **Routing** | React Router v6 |
| **State Management** | React Query, Context API |
| **Form Handling** | React Hook Form, Zod |

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/arshiniyaz2004/nanoform-ai.git
cd nanoform-ai

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:8080`

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run test` | Run tests |

### Production Deployment

```bash
# Build the application
npm run build

# The dist/ folder contains static files ready for deployment
# Serve with any static file server (nginx, Apache, Vercel, etc.)
```

## Project Structure

```
nanoform-ai/
├── public/                 # Static assets
├── src/
│   ├── components/
│   │   ├── eln/           # ELN-specific components
│   │   ├── layout/        # App layout (Sidebar, Header)
│   │   └── ui/            # shadcn/ui components
│   ├── contexts/          # React contexts (DataContext)
│   ├── data/              # Mock data for demo
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   ├── pages/             # Page components
│   │   ├── Dashboard.tsx
│   │   ├── ELN.tsx
│   │   ├── Optimizer.tsx
│   │   ├── Instruments.tsx
│   │   ├── Compliance.tsx
│   │   └── Settings.tsx
│   ├── test/              # Test files
│   └── types/             # TypeScript type definitions
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── vite.config.ts
```

## Team

### Founder & CEO
**Arshi Niyaz**  
B.Tech Biotechnology | Founder, Biotech Wallah Pvt Ltd & Convolity AI Pvt Ltd

### Development Advisor
**Isarar Siddique**  
Computational Biologist & AI Engineer | Training: IITs, Harvard, Stanford

### Scientific Advisor
**Dr. Shabir Hassan**  
Assistant Professor, Khalifa University (Abu Dhabi) | Nanomedicine & Bioengineering

### Technical Advisor
**Dr. Zulfikar Ali Ansari**  
Assistant Professor, Symbiosis International University | Explainable AI (XAI)

## Roadmap

| Version | Features | Timeline |
|---------|----------|----------|
| **v1.0** | LNP Formulation Optimization | Q2 2026 |
| **v2.0** | Bioactive Nanoparticle Systems | Q4 2026 |
| **v3.0** | Biomaterial + Organ-on-Chip Integration | Q2 2027 |
| **v4.0** | AI-Guided Therapeutic Material Design | Q4 2027 |

## Contributing

This is a proprietary project. For collaboration inquiries, please contact the team.

## License

**Proprietary License**

Copyright © 2024-2026 Arshi Niyaz. All Rights Reserved.

This software and associated documentation files (the "Software") are proprietary and confidential. Unauthorized copying, modification, distribution, or use of this Software, via any medium, is strictly prohibited without explicit written permission from the copyright holder.

For licensing inquiries, contact: [founders@nanosovereign.com](mailto:founders@nanosovereign.com)

---

<p align="center">
  <strong>NanoSovereign</strong> — The Bio-Operating System for Therapeutic Materials
</p>

<p align="center">
  <sub>Built with ❤️ for the future of nanomedicine</sub>
</p>
