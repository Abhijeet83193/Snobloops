import { MapPin } from 'lucide-react';
import { MOCK_TRACKS } from '../data/catalog.js';
import { Card, Badge, SectionHeading } from '../components/ui.jsx';
import TrackCard from '../components/TrackCard.jsx';

export default function Profile() {
  const mine = MOCK_TRACKS.filter((t) => t.creator === 'abhijeet');
  const pub = mine.filter((t) => t.isPublic);

  return (
    <div>
      <Card className="flex flex-col items-start gap-5 p-7 sm:flex-row sm:items-center">
        <span className="flex h-20 w-20 items-center justify-center rounded-2xl bg-ember font-display text-3xl font-bold text-white">
          A
        </span>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="font-display text-2xl font-bold">Abhijeet</h1>
            <span className="font-mono text-sm text-dim">@abhijeet</span>
          </div>
          <p className="mt-1 max-w-lg text-sm text-fog">
            Producer of night-drive house and rainy lo-fi. Making background music for my own edits.
          </p>
          <p className="mt-2 flex items-center gap-1 font-mono text-xs text-dim">
            <MapPin size={12} /> India · joined Sep 2026
          </p>
        </div>
        <div className="flex gap-5 font-mono text-xs text-dim">
          <span><strong className="block font-display text-xl text-bone">{mine.length}</strong>tracks</span>
          <span><strong className="block font-display text-xl text-bone">128</strong>followers</span>
          <span><strong className="block font-display text-xl text-bone">46</strong>following</span>
        </div>
      </Card>

      <div className="mt-8">
        <SectionHeading title="Public tracks" blurb="Private tracks never appear here." />
        <div className="grid gap-3 md:grid-cols-2">
          {pub.map((t) => <TrackCard key={t.id} track={t} showCreator={false} />)}
        </div>
        {pub.length < mine.length && (
          <p className="mt-3 text-sm text-dim">
            + {mine.length - pub.length} private track{mine.length - pub.length > 1 ? 's' : ''} <Badge>only you see these</Badge>
          </p>
        )}
      </div>
    </div>
  );
}
