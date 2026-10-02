import { Link } from 'react-router-dom';

export function Button({ to, href, variant = 'primary', className = '', children, ...rest }) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed';
  const styles = {
    primary: 'bg-ember text-white hover:bg-ember-deep',
    secondary: 'border border-line bg-coal text-bone hover:border-dim hover:bg-card',
    ghost: 'text-fog hover:text-bone hover:bg-card',
    gold: 'bg-gold text-ink hover:brightness-110',
  };
  const cls = `${base} ${styles[variant]} ${className}`;
  if (to) return <Link to={to} className={cls} {...rest}>{children}</Link>;
  if (href) return <a href={href} className={cls} {...rest}>{children}</a>;
  return <button className={cls} {...rest}>{children}</button>;
}

export function Card({ className = '', children }) {
  return (
    <div className={`rounded-2xl border border-line bg-card ${className}`}>
      {children}
    </div>
  );
}

export function Badge({ tone = 'default', children }) {
  const tones = {
    default: 'border-line bg-coal text-fog',
    ember: 'border-ember/40 bg-ember-soft text-ember',
    moss: 'border-moss/40 bg-moss-soft text-moss',
    gold: 'border-gold/40 bg-coal text-gold',
  };
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium ${tones[tone]}`}>
      {children}
    </span>
  );
}

export function SectionHeading({ kicker, title, blurb }) {
  return (
    <div className="mb-8">
      {kicker && (
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-ember mb-2">{kicker}</p>
      )}
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      {blurb && <p className="mt-2 max-w-xl text-fog">{blurb}</p>}
    </div>
  );
}

export function EmptyState({ icon, title, blurb, action }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-line bg-coal px-6 py-14 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-raise text-fog">
        {icon}
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      {blurb && <p className="mt-1 max-w-sm text-sm text-fog">{blurb}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function Stat({ label, value, sub }) {
  return (
    <Card className="p-5">
      <p className="font-mono text-xs uppercase tracking-widest text-dim">{label}</p>
      <p className="mt-1 font-display text-3xl font-bold">{value}</p>
      {sub && <p className="mt-1 text-xs text-fog">{sub}</p>}
    </Card>
  );
}

export const inputCls =
  'w-full rounded-lg border border-line bg-ink px-3.5 py-2.5 text-sm text-bone placeholder:text-dim focus:border-ember focus:outline-none';

export function Field({ label, children, hint }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-xs uppercase tracking-widest text-fog">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-dim">{hint}</span>}
    </label>
  );
}
