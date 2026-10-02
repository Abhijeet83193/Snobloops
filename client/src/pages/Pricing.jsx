import { Coins, Receipt } from 'lucide-react';
import { PRICING_TIERS } from '../data/catalog.js';
import { Button, Card, SectionHeading, Badge } from '../components/ui.jsx';

const COSTS = [
  { action: 'Music generation', cost: 20 },
  { action: 'Remix / transform', cost: 30 },
  { action: 'Prompt enhancement', cost: 5 },
];

const LEDGER = [
  { when: 'today, 14:02', what: 'Generated "Night Drive"', delta: -20 },
  { when: 'today, 11:47', what: 'Enhanced prompt', delta: -5 },
  { when: 'yesterday', what: 'Daily login bonus', delta: 10 },
  { when: 'Sep 20', what: 'Starter pack', delta: 100 },
];

export default function Pricing() {
  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading title="Credits & pricing" blurb="One credit system for everything. Costs are fixed and visible." />
        <Card className="relative flex items-center gap-2 px-5 py-1 -top-8">
          <Coins size={18} className="text-gold" />
          <span className="font-display text-2xl font-bold">65</span>
          <span className="text-sm text-fog">credits left</span>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {PRICING_TIERS.map((t) => (
          <Card key={t.name} className={`p-6 ${t.highlight ? 'border-ember' : ''}`}>
            {t.highlight && <Badge tone="ember">Most picked</Badge>}
            <h3 className="mt-2 font-display text-xl font-bold">{t.name}</h3>
            <p className="mt-1 font-display text-3xl font-bold">
              {t.price} <span className="text-sm font-normal text-fog">/ {t.credits} credits</span>
            </p>
            <p className="mt-2 text-sm text-fog">{t.blurb}</p>
            <ul className="mt-4 space-y-1.5 text-sm text-fog">
              {t.features.map((f) => <li key={f}>— {f}</li>)}
            </ul>
            <Button variant={t.highlight ? 'primary' : 'secondary'} className="mt-5 w-full">
              Buy {t.name}
            </Button>
          </Card>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div>
          <SectionHeading title="What things cost" />
          <Card className="divide-y divide-line">
            {COSTS.map((c) => (
              <div key={c.action} className="flex items-center justify-between px-5 py-3.5">
                <span className="text-sm">{c.action}</span>
                <Badge tone="gold">{c.cost} credits</Badge>
              </div>
            ))}
          </Card>
        </div>
        <div>
          <SectionHeading title="Recent activity" />
          <Card className="divide-y divide-line">
            {LEDGER.map((l, i) => (
              <div key={i} className="flex items-center justify-between px-5 py-3.5">
                <span className="flex items-center gap-2 text-sm">
                  <Receipt size={14} className="text-dim" /> {l.what}
                  <span className="font-mono text-xs text-dim">{l.when}</span>
                </span>
                <span className={`font-mono text-sm font-semibold ${l.delta < 0 ? 'text-ember' : 'text-moss'}`}>
                  {l.delta > 0 ? `+${l.delta}` : l.delta}
                </span>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}
