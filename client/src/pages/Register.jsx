import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { UserPlus } from 'lucide-react';
import { api } from '../services/api.js';
import { setCredentials } from '../features/auth/authSlice.js';
import { Button, Card, Field, inputCls, Badge } from '../components/ui.jsx';

export default function Register() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      const data = await api.post('/auth/register', { name, username, email, password });
      dispatch(setCredentials({ token: data.token, user: data.user }));
      navigate('/dashboard');
    } catch (err) {
      setError(err.message === 'Failed to fetch'
        ? 'Backend abhi live nahi hai (server/ Phase 1 me aayega). Frontend ready hai — thoda wait karo.'
        : err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-md py-10">
      <h1 className="text-center font-display text-3xl font-bold">Claim your studio</h1>
      <p className="mt-2 text-center text-sm text-fog">
        <Badge tone="gold">100 free credits on signup</Badge>
      </p>
      <Card className="mt-6 p-7">
        <form onSubmit={onSubmit} className="space-y-4">
          <Field label="Name">
            <input value={name} onChange={(e) => setName(e.target.value)} required
              placeholder="Abhijeet" className={inputCls} />
          </Field>
          <Field label="Username" hint="Public — dikhega @username ki tarah">
            <input value={username} onChange={(e) => setUsername(e.target.value)} required
              minLength={3} placeholder="abhijeet" className={inputCls} />
          </Field>
          <Field label="Email">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
              placeholder="you@studio.com" className={inputCls} />
          </Field>
          <Field label="Password" hint="Min 8 characters">
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
              minLength={8} placeholder="••••••••" className={inputCls} />
          </Field>
          {error && (
            <p className="rounded-lg border border-ember/40 bg-ember-soft px-3 py-2 text-sm text-ember">{error}</p>
          )}
          <Button className="w-full" disabled={busy}>
            <UserPlus size={16} /> {busy ? 'Creating…' : 'Create account'}
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-fog">
          Already in? <Link to="/login" className="text-ember hover:underline">Login</Link>
        </p>
      </Card>
    </div>
  );
}
