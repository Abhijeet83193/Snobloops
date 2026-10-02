import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Play, Pause, Volume2, VolumeX, X, SkipForward } from 'lucide-react';
import { togglePlay, stop } from '../features/player/playerSlice.js';
import { formatTime } from '../utils/format.js';
import Waveform from './Waveform.jsx';

export default function PlayerBar() {
  const dispatch = useDispatch();
  const { currentTrack, isPlaying } = useSelector((s) => s.player);
  const audioRef = useRef(null);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    if (isPlaying) a.play().catch(() => dispatch(togglePlay()));
    else a.pause();
  }, [isPlaying, currentTrack, dispatch]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = muted;
    }
  }, [volume, muted]);

  if (!currentTrack) return null;

  const progress = duration ? time / duration : 0;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-coal/95 backdrop-blur">
      <audio
        ref={audioRef}
        src={currentTrack.audioUrl}
        onTimeUpdate={(e) => setTime(e.target.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.target.duration)}
        onEnded={() => dispatch(togglePlay())}
      />
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-6 py-3">
        <button
          onClick={() => dispatch(togglePlay())}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ember text-white hover:bg-ember-deep"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
        </button>

        <div className="hidden min-w-0 sm:block">
          <p className="truncate text-sm font-semibold">{currentTrack.title}</p>
          <p className="truncate text-xs text-fog">{currentTrack.genre} · {currentTrack.bpm} BPM</p>
        </div>

        <span className="hidden font-mono text-xs text-dim sm:inline">{formatTime(time)}</span>
        <div className="min-w-0 flex-1">
          <Waveform seed={currentTrack.seed ?? 7} progress={progress} count={64} className="w-full" />
          <input
            type="range" min={0} max={duration || 0} step={0.1} value={time}
            onChange={(e) => {
              const t = Number(e.target.value);
              if (audioRef.current) audioRef.current.currentTime = t;
              setTime(t);
            }}
            className="mt-1 w-full"
            aria-label="Seek"
          />
        </div>
        <span className="hidden font-mono text-xs text-dim sm:inline">{formatTime(duration)}</span>

        <div className="hidden items-center gap-2 md:flex">
          <button onClick={() => setMuted(!muted)} className="text-fog hover:text-bone" aria-label="Mute">
            {muted ? <VolumeX size={17} /> : <Volume2 size={17} />}
          </button>
          <input
            type="range" min={0} max={1} step={0.05} value={muted ? 0 : volume}
            onChange={(e) => { setVolume(Number(e.target.value)); setMuted(false); }}
            className="w-20" aria-label="Volume"
          />
        </div>

        <button className="hidden text-fog hover:text-bone lg:block" aria-label="Next (soon)">
          <SkipForward size={17} />
        </button>
        <button onClick={() => dispatch(stop())} className="text-fog hover:text-bone" aria-label="Close player">
          <X size={17} />
        </button>
      </div>
    </div>
  );
}
