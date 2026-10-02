import { Link } from 'react-router-dom';
import { Plus, Loader } from 'lucide-react';
import { MOCK_TRACKS } from '../data/catalog.js';
import { Button, Stat, SectionHeading, Badge } from '../components/ui.jsx';
import TrackCard from '../components/TrackCard.jsx';

const QUEUE = [
  { id: 'g-91', title: 'Monsoon Pads', status: 'PROCESSING' },
  { id: 'g-90', title: 'Gym Rager', status: 'QUEUED' },
];

const statusTone = { PROCESSING: 'ember', QUEUED: 'gold', COMPLETED: 'moss', FAILED: 'default' };

export default function Dashboard() {
  const recent = MOCK_TRACKS.slice(0, 3);

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ember">Studio overview</p>
          <h1 className="mt-1 font-display text-3xl font-bold">Welcome back, Abhijeet</h1>
        </div>
        <Button to="/generate"><Plus size={16} /> New track</Button>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat label="Credits" value="65" sub="−20 last generation" />
        <Stat label="Tracks" value="24" sub="18 public" />
        <Stat label="Favorites" value="8" sub="across 4 genres" />
        <Stat label="Generations" value="31" sub="29 completed" />
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div>
          <SectionHeading title="Live queue" blurb="Async generations in flight — the page never blocks." />
          <div className="space-y-3">
            {QUEUE.map((q) => (
              <Link
                key={q.id}
                to={`/generations/${q.id}`}
                className="flex items-center justify-between rounded-xl border border-line bg-card px-4 py-3 hover:border-dim"
              >
                <span className="flex items-center gap-3 text-sm font-medium">
                  <Loader size={15} className="animate-spin text-ember" />
                  {q.title}
                </span>
                <Badge tone={statusTone[q.status]}>{q.status}</Badge>
              </Link>
            ))}
          </div>
        </div>
        <div>
          <SectionHeading title="Recent generations" />
          <div className="space-y-3">
            {recent.map((t) => <TrackCard key={t.id} track={t} showCreator={false} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
