import { useState } from 'react';
import { Upload, Disc3 } from 'lucide-react';
import { Button, Card, Field, Badge, SectionHeading } from '../components/ui.jsx';

const TRANSFORMS = ['Change genre', 'Change mood', 'Alternate version', 'Extend track', 'Variation', 'Restyle instrumental'];

export default function Remix() {
  const [transform, setTransform] = useState('Change genre');
  const [target, setTarget] = useState('Afrobeat');
  const [file, setFile] = useState(null);

  return (
    <div className="mx-auto max-w-3xl">
      <SectionHeading
        title="Remix Studio"
        blurb="Upload audio, pick a transformation. Runs async like generation — 30 credits."
      />
      <Card className="space-y-5 p-6">
        <Field label="Source audio (mp3 / wav, max 20 MB)">
          <label className="flex cursor-pointer flex-col items-center rounded-xl border border-dashed border-line bg-ink px-6 py-10 text-center transition-colors hover:border-dim">
            <Upload size={22} className="text-dim" />
            <span className="mt-2 text-sm text-fog">{file ? file.name : 'Drop a file or click to browse'}</span>
            <input type="file" accept="audio/mpeg,audio/wav,audio/*" className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] || null)} />
          </label>
        </Field>

        <div>
          <span className="mb-1.5 block font-mono text-xs uppercase tracking-widest text-fog">Transformation</span>
          <div className="flex flex-wrap gap-2">
            {TRANSFORMS.map((t) => (
              <button type="button" key={t} onClick={() => setTransform(t)}
                className={`rounded-full border px-3.5 py-1.5 text-sm ${
                  transform === t ? 'border-ember bg-ember-soft text-ember' : 'border-line text-fog hover:text-bone'
                }`}>
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="From">
            <input value="Progressive House" disabled className="w-full rounded-lg border border-line bg-coal px-3.5 py-2.5 text-sm text-dim" />
          </Field>
          <Field label="To">
            <input value={target} onChange={(e) => setTarget(e.target.value)} className="w-full rounded-lg border border-line bg-ink px-3.5 py-2.5 text-sm text-bone" />
          </Field>
        </div>

        <Button className="w-full" disabled={!file}>
          <Disc3 size={16} /> Remix — 30 credits {file ? '' : '(upload first)'}
        </Button>
        <p className="text-center"><Badge>Phase 3 · UI ready, queue wiring next</Badge></p>
      </Card>
    </div>
  );
}
