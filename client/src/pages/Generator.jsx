import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Wand2 } from 'lucide-react';
import { GENRES, MOODS, INSTRUMENTS } from '../data/catalog.js';
import { Button, Card, Field, inputCls, Badge } from '../components/ui.jsx';
import { api } from '../services/api.js';

const DURATIONS = [15, 30, 60, 120];
const ENERGIES = ['Low', 'Medium', 'High', 'Extreme'];

export default function Generator() {
  const navigate = useNavigate();
  const [genre, setGenre] = useState('Progressive House');
  const [mood, setMood] = useState('Energetic');
  const [bpm, setBpm] = useState(128);
  const [instruments, setInstruments] = useState(['Synth', 'Piano', 'Bass']);
  const [duration, setDuration] = useState(60);
  const [vocal, setVocal] = useState('Instrumental');
  const [energy, setEnergy] = useState('High');
  const [prompt, setPrompt] = useState('A futuristic night-drive track with a powerful drop and atmospheric intro.');
  const [title, setTitle] = useState('Night Drive');
  const [enhanced, setEnhanced] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  function toggleInstrument(i) {
    setInstruments((cur) => (cur.includes(i) ? cur.filter((x) => x !== i) : [...cur, i]));
  }

  async function enhance() {
    setError('');
    try {
      const data = await api.post('/music/enhance-prompt', { prompt, genre, mood }, { auth: true });
      setEnhanced(data.enhancedPrompt || '');
      if (data.enhancedPrompt) setPrompt(data.enhancedPrompt);
    } catch {
      // Backend offline → local fallback so the UX is still demonstrable
      setEnhanced(
        `Create an atmospheric ${genre.toLowerCase()} track for a late-night city drive — deep warm bass, evolving synth pads, subtle arpeggios, a cinematic intro and an energetic melodic drop at ${bpm} BPM. Mood: ${mood.toLowerCase()}.`
      );
    }
  }

  function useEnhanced() {
    if (enhanced) setPrompt(enhanced);
  }

  async function generate(e) {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      const data = await api.post('/music/generate',
        { title, genre, mood, bpm, instruments, duration, vocal, energy, prompt },
        { auth: true });
      navigate(`/generations/${data.generation?.id || data.id}`);
    } catch (err) {
      setError(err.message === 'Failed to fetch'
        ? 'Backend offline hai — generation queue Phase 1 me live hogi. Form ka poora state ready hai.'
        : err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-ember">New session</p>
      <h1 className="mt-1 font-display text-3xl font-bold">AI Music Generator</h1>
      <p className="mt-2 text-fog">20 credits per generation. Queue me jayega — screen freeze nahi hogi.</p>

      <form onSubmit={generate} className="mt-6 space-y-6">
        <Card className="space-y-5 p-6">
          <Field label="Track title">
            <input value={title} onChange={(e) => setTitle(e.target.value)} required
              placeholder="Night Drive" className={inputCls} />
          </Field>

          <div>
            <span className="mb-1.5 block font-mono text-xs uppercase tracking-widest text-fog">Genre</span>
            <div className="flex flex-wrap gap-2">
              {GENRES.map((g) => (
                <button type="button" key={g} onClick={() => setGenre(g)}
                  className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                    genre === g ? 'border-ember bg-ember-soft text-ember' : 'border-line bg-ink text-fog hover:border-dim hover:text-bone'
                  }`}>
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className="mb-1.5 block font-mono text-xs uppercase tracking-widest text-fog">Mood</span>
            <div className="flex flex-wrap gap-2">
              {MOODS.map((m) => (
                <button type="button" key={m} onClick={() => setMood(m)}
                  className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                    mood === m ? 'border-ember bg-ember-soft text-ember' : 'border-line bg-ink text-fog hover:border-dim hover:text-bone'
                  }`}>
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label={`Tempo — ${bpm} BPM`}>
              <input type="range" min={60} max={180} value={bpm}
                onChange={(e) => setBpm(Number(e.target.value))} className="w-full" />
            </Field>
            <Field label="Duration">
              <div className="flex gap-2">
                {DURATIONS.map((d) => (
                  <button type="button" key={d} onClick={() => setDuration(d)}
                    className={`flex-1 rounded-lg border px-2 py-2 font-mono text-sm ${
                      duration === d ? 'border-ember bg-ember-soft text-ember' : 'border-line bg-ink text-fog hover:border-dim'
                    }`}>
                    {d}s
                  </button>
                ))}
              </div>
            </Field>
          </div>

          <div>
            <span className="mb-1.5 block font-mono text-xs uppercase tracking-widest text-fog">Instruments</span>
            <div className="flex flex-wrap gap-2">
              {INSTRUMENTS.map((i) => (
                <button type="button" key={i} onClick={() => toggleInstrument(i)}
                  className={`rounded-lg border px-3 py-1.5 text-sm transition-colors ${
                    instruments.includes(i) ? 'border-moss/60 bg-moss-soft text-moss' : 'border-line bg-ink text-fog hover:border-dim hover:text-bone'
                  }`}>
                  {i}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Voice">
              <div className="flex gap-2">
                {['Instrumental', 'With vocals'].map((v) => (
                  <button type="button" key={v} onClick={() => setVocal(v)}
                    className={`flex-1 rounded-lg border px-2 py-2 text-sm ${
                      vocal === v ? 'border-ember bg-ember-soft text-ember' : 'border-line bg-ink text-fog hover:border-dim'
                    }`}>
                    {v}
                  </button>
                ))}
              </div>
            </Field>
            <Field label="Energy">
              <div className="flex gap-2">
                {ENERGIES.map((e) => (
                  <button type="button" key={e} onClick={() => setEnergy(e)}
                    className={`flex-1 rounded-lg border px-2 py-2 text-sm ${
                      energy === e ? 'border-ember bg-ember-soft text-ember' : 'border-line bg-ink text-fog hover:border-dim'
                    }`}>
                    {e}
                  </button>
                ))}
              </div>
            </Field>
          </div>
        </Card>

        <Card className="space-y-4 p-6">
          <Field label="Describe it — plain words work">
            <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={4}
              placeholder="Night drive music…" className={`${inputCls} resize-none`} />
          </Field>
          <div className="flex flex-wrap items-center gap-2">
            <Button type="button" variant="secondary" onClick={enhance}>
              <Wand2 size={15} /> Enhance prompt <Badge tone="gold">5 credits</Badge>
            </Button>
            {enhanced && (
              <Button type="button" variant="ghost" onClick={useEnhanced}>
                Use enhanced version
              </Button>
            )}
          </div>
          {enhanced && (
            <div className="rounded-lg border border-moss/40 bg-moss-soft p-3 text-sm leading-relaxed text-bone">
              <span className="font-mono text-xs uppercase tracking-widest text-moss">Enhanced</span>
              <p className="mt-1">{enhanced}</p>
            </div>
          )}
        </Card>

        {error && (
          <p className="rounded-lg border border-ember/40 bg-ember-soft px-3 py-2 text-sm text-ember">{error}</p>
        )}

        <Button className="w-full py-3 text-base" disabled={busy}>
          <Sparkles size={17} /> {busy ? 'Queueing…' : 'Generate track — 20 credits'}
        </Button>
      </form>
    </div>
  );
}
