import { useState } from 'react';
import { Card, Field, inputCls, Button, SectionHeading } from '../components/ui.jsx';

export default function Settings() {
  const [bio, setBio] = useState('Producer of night-drive house and rainy lo-fi.');
  const [saved, setSaved] = useState(false);

  return (
    <div className="mx-auto max-w-2xl">
      <SectionHeading title="Settings" blurb="Profile, preferences and danger zone." />
      <Card className="space-y-5 p-6">
        <Field label="Display name">
          <input defaultValue="Abhijeet" className={inputCls} />
        </Field>
        <Field label="Bio">
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={3} className={`${inputCls} resize-none`} />
        </Field>
        <Field label="Default track visibility">
          <select defaultValue="Private" className={inputCls}>
            <option>Private</option>
            <option>Public</option>
          </select>
        </Field>
        <Button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }}>
          {saved ? 'Saved ✓' : 'Save changes'}
        </Button>
      </Card>
      <Card className="mt-4 border-ember/40 p-6">
        <h3 className="font-display font-semibold text-ember">Danger zone</h3>
        <p className="mt-1 text-sm text-fog">Delete your account and all tracks. This cannot be undone.</p>
        <Button variant="secondary" className="mt-3">Delete account</Button>
      </Card>
    </div>
  );
}
