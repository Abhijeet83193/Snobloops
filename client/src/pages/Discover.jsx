import { useMemo, useState } from 'react';
import { Flame, Clock } from 'lucide-react';
import { MOCK_TRACKS, GENRES, MOODS } from '../data/catalog.js';
import { SectionHeading } from '../components/ui.jsx';
import TrackCard from '../components/TrackCard.jsx';

export default function Discover() {
  const [genre, setGenre] = useState('All');
  const [mood, setMood] = useState('All');
  const [tab, setTab] = useState('trending');
  const publicTracks = useMemo(() => MOCK_TRACKS.filter((t) => t.isPublic), []);

  const list = useMemo(() => {
    let l = publicTracks.filter((t) =>
      (genre === 'All' || t.genre === genre) && (mood === 'All' || t.mood === mood));
    l = [...l].sort((a, b) => (tab === 'trending' ? b.plays - a.plays : b.likes - a.likes));
    return l;
  }, [publicTracks, genre, mood, tab]);

  return (
    <div>
      <SectionHeading
        title="Discover"
        blurb="Only public tracks appear here. Private stays private — enforced by the API, not just hidden in CSS."
      />

      <div className="mb-4 flex gap-2">
        {[{ id: 'trending', icon: Flame, label: 'Trending' }, { id: 'recent', icon: Clock, label: 'Fresh' }].map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm ${
              tab === t.id ? 'border-ember bg-ember-soft text-ember' : 'border-line bg-coal text-fog hover:text-bone'
            }`}>
            <t.icon size={14} /> {t.label}
          </button>
        ))}
      </div>

      <div className="mb-6 flex flex-col gap-3 md:flex-row">
        <div className="flex flex-wrap gap-2">
          {['All', ...GENRES].map((g) => (
            <button key={g} onClick={() => setGenre(g)}
              className={`rounded-full border px-3 py-1 text-xs ${
                genre === g ? 'border-ember bg-ember-soft text-ember' : 'border-line text-fog hover:text-bone'
              }`}>
              {g}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-6 flex flex-wrap gap-2">
        {['All', ...MOODS].map((m) => (
          <button key={m} onClick={() => setMood(m)}
            className={`rounded-full border px-3 py-1 text-xs ${
              mood === m ? 'border-moss/60 bg-moss-soft text-moss' : 'border-line text-fog hover:text-bone'
            }`}>
            {m}
          </button>
        ))}
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {list.map((t) => <TrackCard key={t.id} track={t} />)}
      </div>
    </div>
  );
}
