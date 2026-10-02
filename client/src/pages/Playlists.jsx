import { ListMusic, Plus } from 'lucide-react';
import { MOCK_TRACKS } from '../data/catalog.js';
import { Button, Card, SectionHeading, EmptyState } from '../components/ui.jsx';
import TrackCard from '../components/TrackCard.jsx';

const PLAYLISTS = [
  { id: 'p1', name: 'Night Drives', description: 'For late edits and long roads.', trackIds: ['t-night-drive', 't-neon-sakura'], isPublic: true },
  { id: 'p2', name: 'Focus Rain', description: 'Work background.', trackIds: ['t-lofi-rain'], isPublic: false },
];

export default function Playlists() {
  if (PLAYLISTS.length === 0) {
    return <EmptyState icon={<ListMusic size={22} />} title="No playlists yet"
      blurb="Bundle tracks for videos, streams or moods." action={<Button><Plus size={16} /> New playlist</Button>} />;
  }
  return (
    <div>
      <div className="flex items-end justify-between">
        <SectionHeading title="Playlists" blurb="Public ones show on your profile." />
        <Button><Plus size={16} /> New playlist</Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {PLAYLISTS.map((p) => (
          <Card key={p.id} className="p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-bold">{p.name}</h3>
              <span className="font-mono text-xs text-dim">{p.isPublic ? 'public' : 'private'}</span>
            </div>
            <p className="mt-1 text-sm text-fog">{p.description}</p>
            <div className="mt-4 space-y-2">
              {p.trackIds.map((id) => {
                const t = MOCK_TRACKS.find((x) => x.id === id);
                return t ? <TrackCard key={id} track={t} showCreator={false} /> : null;
              })}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
