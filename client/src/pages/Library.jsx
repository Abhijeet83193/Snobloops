import { useMemo, useState } from 'react';
import { Search, LibraryBig } from 'lucide-react';
import { MOCK_TRACKS, GENRES } from '../data/catalog.js';
import { SectionHeading, EmptyState, Button, inputCls } from '../components/ui.jsx';
import TrackCard from '../components/TrackCard.jsx';

export default function Library() {
  const [q, setQ] = useState('');
  const [genre, setGenre] = useState('All');
  const [sort, setSort] = useState('recent');
  const [favOnly, setFavOnly] = useState(false);

  const tracks = useMemo(() => {
    let list = MOCK_TRACKS.filter((t) =>
      (genre === 'All' || t.genre === genre) &&
      (!favOnly || t.favorite) &&
      (t.title.toLowerCase().includes(q.toLowerCase()) || t.genre.toLowerCase().includes(q.toLowerCase()))
    );
    if (sort === 'liked') list = [...list].sort((a, b) => b.likes - a.likes);
    if (sort === 'plays') list = [...list].sort((a, b) => b.plays - a.plays);
    return list;
  }, [q, genre, sort, favOnly]);

  return (
    <div>
      <SectionHeading title="My Library" blurb="Search, filter, sort. Heart a track to keep it close." />

      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-dim" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search title or genre…"
            className={`${inputCls} pl-9`} />
        </div>
        <select value={genre} onChange={(e) => setGenre(e.target.value)} className={`${inputCls} md:w-48`}>
          <option>All</option>
          {GENRES.map((g) => <option key={g}>{g}</option>)}
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)} className={`${inputCls} md:w-44`}>
          <option value="recent">Most recent</option>
          <option value="liked">Most liked</option>
          <option value="plays">Most played</option>
        </select>
        <button onClick={() => setFavOnly(!favOnly)}
          className={`rounded-lg border px-4 py-2.5 text-sm transition-colors ${
            favOnly ? 'border-ember bg-ember-soft text-ember' : 'border-line bg-coal text-fog hover:text-bone'
          }`}>
          Favorites
        </button>
      </div>

      {tracks.length === 0 ? (
        <EmptyState
          icon={<LibraryBig size={22} />}
          title="Nothing matches"
          blurb="Try a different search — or generate something brand new."
          action={<Button to="/generate">Generate a track</Button>}
        />
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {tracks.map((t) => <TrackCard key={t.id} track={t} showCreator={false} />)}
        </div>
      )}
    </div>
  );
}
