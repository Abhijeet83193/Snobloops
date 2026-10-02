import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Play } from 'lucide-react';
import { setTrack } from '../features/player/playerSlice.js';
import { MOCK_TRACKS } from '../data/catalog.js';
import { Button, Card, Badge, SectionHeading } from '../components/ui.jsx';
import Waveform from '../components/Waveform.jsx';

const tone = { QUEUED: 'gold', PROCESSING: 'ember', COMPLETED: 'moss', FAILED: 'default' };

export default function GenerationDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const demo = MOCK_TRACKS[0];
  const status = 'PROCESSING';

  return (
    <div className="mx-auto max-w-3xl">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-dim">generation · {id}</p>
      <div className="mt-1 flex flex-wrap items-center gap-3">
        <h1 className="font-display text-3xl font-bold">Night Drive</h1>
        <Badge tone={tone[status]}>{status}</Badge>
      </div>

      <Card className="mt-6 p-6">
        <Waveform seed={demo.seed} progress={0.45} count={72} />
        <div className="mt-3 flex items-center justify-between font-mono text-xs text-dim">
          <span>rendering… stems → mix → master</span>
          <span>~40s left</span>
        </div>
        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-line">
          <div className="h-full w-[45%] rounded-full bg-ember" />
        </div>
        <div className="mt-5 flex gap-3">
          <Button onClick={() => dispatch(setTrack(demo))}><Play size={16} /> Preview draft</Button>
          <Button variant="secondary">Cancel job</Button>
        </div>
      </Card>

      <div className="mt-8">
        <SectionHeading title="Brief sent to the model" />
        <Card className="space-y-2 p-6 font-mono text-sm">
          <p><span className="text-dim">genre ……</span> Progressive House</p>
          <p><span className="text-dim">mood ……</span> Energetic · energy High</p>
          <p><span className="text-dim">tempo ……</span> 128 BPM · 60s · Instrumental</p>
          <p><span className="text-dim">tools ……</span> Synth, Piano, Bass</p>
          <p><span className="text-dim">prompt …</span> <span className="font-sans text-bone">“{demo.prompt}”</span></p>
          <p><span className="text-dim">provider …</span> mock (swappable → replicate / mubert)</p>
        </Card>
      </div>
    </div>
  );
}
