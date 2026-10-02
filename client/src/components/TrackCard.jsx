import { Play, Pause, Heart, Lock } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setTrack, togglePlay } from '../features/player/playerSlice.js';
import { compact } from '../utils/format.js';
import Waveform from './Waveform.jsx';
import { Badge } from './ui.jsx';

const ART = ['bg-ember-soft', 'bg-moss-soft', 'bg-raise'];

export default function TrackCard({ track, showCreator = true }) {
  const dispatch = useDispatch();
  const { currentTrack, isPlaying } = useSelector((s) => s.player);
  const active = currentTrack?.id === track.id;
  const playing = active && isPlaying;

  return (
    <div className="group rounded-2xl border border-line bg-card p-4 transition-colors hover:border-dim">
      <div className="flex items-center gap-4">
        <button
          onClick={() => (active ? dispatch(togglePlay()) : dispatch(setTrack(track)))}
          className={`relative flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${ART[track.seed % ART.length]} border border-line transition-colors group-hover:border-dim`}
          aria-label={playing ? `Pause ${track.title}` : `Play ${track.title}`}
        >
          <span className="font-display text-lg font-bold text-bone">
            {track.title.slice(0, 1)}
          </span>
          <span className="absolute inset-0 flex items-center justify-center rounded-xl bg-ink/70 opacity-0 transition-opacity group-hover:opacity-100">
            {playing ? <Pause size={20} className="text-bone" /> : <Play size={20} className="text-bone" />}
          </span>
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate font-semibold">{track.title}</h3>
            {!track.isPublic && <Lock size={13} className="shrink-0 text-dim" />}
            {track.favorite && <Heart size={13} className="shrink-0 fill-ember text-ember" />}
          </div>
          <p className="truncate text-sm text-fog">
            {track.genre} · {track.bpm} BPM
            {showCreator && ` · @${track.creator}`}
          </p>
          <Waveform seed={track.seed} progress={active ? 1 : 0} count={36} className="mt-2" />
        </div>

        <div className="hidden shrink-0 items-center gap-2 sm:flex">
          <Badge>{compact(track.likes)} likes</Badge>
        </div>
      </div>
    </div>
  );
}
