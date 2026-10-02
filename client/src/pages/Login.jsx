import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LogIn } from 'lucide-react';
import { api } from '../services/api.js';
import { setCredentials } from '../features/auth/authSlice.js';
import { Button, Card, Field, inputCls } from '../components/ui.jsx';

export default function Login() {
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
      const data = await api.post('/auth/login', { email, password });
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
      <h1 className="text-center font-display text-3xl font-bold">Welcome back</h1>
      <p className="mt-2 text-center text-sm text-fog">Log in to your studio.</p>
      <Card className="mt-6 p-7">
        <form onSubmit={onSubmit} className="space-y-4">
          <Field label="Email">
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="you@studio.com" className={inputCls} />
          </Field>
          <Field label="Password">
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" className={inputCls} />
          </Field>
          {error && (
            <p className="rounded-lg border border-ember/40 bg-ember-soft px-3 py-2 text-sm text-ember">{error}</p>
          )}
          <Button className="w-full" disabled={busy}>
            <LogIn size={16} /> {busy ? 'Logging in…' : 'Login'}
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-fog">
          New here? <Link to="/register" className="text-ember hover:underline">Create an account</Link>
        </p>
      </Card>
    </div>
  );
}
