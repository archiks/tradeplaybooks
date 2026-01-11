
import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'prod_pf_playbook',
    name: 'Perpetual Futures Playbook',
    price: 250,
    level: 1,
    tagline: 'Master crypto perps and traditional futures with systematic precision.',
    description: 'Transform chaotic leverage into a structured framework. Focus on risk, funding rates, and execution.',
    features: [
      'Perpetual Playbook Framework',
      'Funding & Basis Strategy Module',
      'Liquidity Buffer Calculator',
      'Execution Checklist for Entries / TP / SL',
      'Scaling & Pyramiding Plans',
      'Futures Risk + Drawdown Guardrails'
    ],
    chapters: [
      {
        title: 'Core Futures Foundations',
        points: ['Futures vs. Spot vs. Margin', 'Leverage mechanics & margin types', 'Notional value vs. Collateral']
      },
      {
        title: 'Perpetual Swap Mechanics',
        points: ['The role of the funding rate', 'Price discovery in perps', 'Mark price vs. Index price']
      },
      {
        title: 'Funding Rate & Basis Strategies',
        points: ['Exploiting funding rate arbitrage', 'Basis trading for market-neutral yield', 'Funding-aware entries']
      },
      {
        title: 'Risk, Margin & Liquidation Guardrails',
        points: ['Calculating liquidation price manually', 'The 3-layer stop system', 'Dynamic position sizing']
      },
      {
        title: 'Execution Playbooks & Checklists',
        points: ['The Trend-Following Perp सेटअप', 'Mean Reversion in high-funding regimes', 'Breakout validation rules']
      },
      {
        title: 'Scaling, Compounding & Risk Caps',
        points: ['Pyramiding into winners safely', 'Profit taking ladders', 'Equity curve draw-down caps']
      }
    ]
  }
];

export const TESTIMONIALS = [
  {
    initials: "AR",
    name: "Alex R.",
    role: "Prop Firm Trader",
    text: "The funding rate module alone saved my account. Understanding basis changed my entire execution timing."
  },
  {
    initials: "MK",
    name: "Maria K.",
    role: "Retail Crypto Trader",
    text: "I used to get liquidated every volatility spike. Now I have a mechanical buffer I can trust."
  },
  {
    initials: "SL",
    name: "Sam L.",
    role: "Institutional Scalper",
    text: "Finally, a guide that treats perps like the professional instruments they are. Pure value."
  }
];

export const PAIN_POINTS = [
  "Over-leveraging into volatility spikes",
  "Ignoring funding rate burn on long-term holds",
  "Chasing entries into liquidation zones",
  "No mechanical system for scale-ins",
  "Closing winners too early, holding losers",
  "Analysis paralysis during fast price action",
  "No data-backed risk guardrails",
  "Getting chopped in mean-reversion regimes"
];

export const COUNTRIES = [
  "United Kingdom", "United States", "Germany", "France", "Italy",
  "Spain", "Netherlands", "Switzerland", "Canada", "Australia",
  "Japan", "Singapore", "United Arab Emirates", "South Africa"
];
