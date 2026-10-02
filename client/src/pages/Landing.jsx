import { Link } from 'react-router-dom';
import {
  ArrowRight, AudioWaveform, Compass, Disc3, ListMusic,
  Sparkles, Timer, Wallet, Wand2,
} from 'lucide-react';
import { GENRES, MOCK_TRACKS, PRICING_TIERS } from '../data/catalog.js';
import { Button, Card, SectionHeading, Badge } from '../components/ui.jsx';
import TrackCard from '../components/TrackCard.jsx';
import Waveform from '../components/Waveform.jsx';

const STEPS = [
  { n: '01', title: 'Describe your idea', blurb: 'Pick a genre, mood, tempo and instruments — or just type a sentence like “night drive music”.' },
  { n: '02', title: 'Enhance & generate', blurb: 'AI sharpens your prompt into a studio-grade brief, then composes your track in the queue.' },
  { n: '03', title: 'Play, keep, share', blurb: 'Preview in the player, save it to your library, make it public or remix it into something new.' },
];

const FEATURES = [
  { icon: Wand2, title: 'Prompt enhancement', blurb: '“Night drive music” becomes a full arrangement brief — key, texture, structure — before a single note renders.' },
  { icon: Timer, title: 'Async generation', blurb: 'Composing takes time. Queue a track, keep browsing, get notified when it lands. Never a frozen screen.' },
  { icon: AudioWaveform, title: 'Studio-grade player', blurb: 'Seek, volume, waveforms and track metadata — built for desktop and mobile listening.' },
  { icon: Compass, title: 'Discovery, minus the noise', blurb: 'Trending tracks, genres and creators. Private tracks stay private — always.' },
  { icon: Disc3, title: 'Remix Studio', blurb: 'Upload audio and flip its genre, mood or energy into an alternate version.' },
  { icon: Wallet, title: 'Honest credits', blurb: 'Generate costs 20, remix 30, enhance 5. No subscriptions traps — see every credit move.' },
];

export default function Landing() {
  return (
    <div className="-mt-8">
      {/* HERO */}
      <section className="grid items-center gap-10 py-14 md:grid-cols-2 md:py-20">
        <div>
          <Badge tone="ember">
            <Sparkles size={12} /> AI music studio for creators
          </Badge>
          <h1 className="mt-4 text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl">
            Create Music.<br />Your Way.
          </h1>
          <p className="mt-4 max-w-md text-lg text-fog">
            Turn your ideas into original music with AI — no production degree required.
            Built for YouTubers, editors, game devs and producers.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button to="/register">Create Your First Track <ArrowRight size={16} /></Button>
            <Button to="/discover" variant="secondary">Explore Music</Button>
          </div>
          <div className="mt-8 flex gap-8 font-mono text-xs text-dim">
            <span><strong className="block font-display text-2xl text-bone">12</strong>genres</span>
            <span><strong className="block font-display text-2xl text-bone">100</strong>free credits</span>
            <span><strong className="block font-display text-2xl text-bone">60s</strong>per track</span>
          </div>
        </div>

        <Card className="tape-dots overflow-hidden">
          <div className="border-b border-line bg-coal px-5 py-3 font-mono text-xs text-dim">
            ● ● ● &nbsp;night-drive-128bpm.session
          </div>
          <div className="space-y-4 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-display font-bold">Night Drive</p>
                <p className="text-xs text-fog">Progressive House · 128 BPM</p>
              </div>
              <Badge tone="moss">Completed</Badge>
            </div>
            <Waveform seed={11} progress={0.62} count={56} />
            <div className="flex items-center justify-between font-mono text-xs text-dim">
              <span>intro ……………………… drop</span>
              <span>0:37 / 1:00</span>
            </div>
            <div className="rounded-lg border border-line bg-ink p-3 font-mono text-xs leading-relaxed text-fog">
              “atmospheric pads → deep warm bass →<br />melodic drop at 0:32”
            </div>
          </div>
        </Card>
      </section>

      {/* GENRES */}
      <section className="py-10">
        <SectionHeading
          kicker="Genres"
          title="Start from a sound you love"
          blurb="Twelve starting points. Every generation is original — composed from your brief, not pulled from a stock library."
        />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {GENRES.map((g) => (
            <Link
              key={g}
              to="/generate"
              className="group rounded-xl border border-line bg-card px-4 py-5 transition-colors hover:border-ember"
            >
              <Disc3 size={18} className="text-dim transition-colors group-hover:text-ember" />
              <p className="mt-2 font-display font-semibold">{g}</p>
              <p className="text-xs text-dim">Generate →</p>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-10">
        <SectionHeading kicker="Why Snobloops" title="A studio workflow, not a chatbot" />
        <div className="grid gap-4 md:grid-cols-3">
          {FEATURES.map((f) => (
            <Card key={f.title} className="p-6">
              <f.icon size={20} className="text-ember" />
              <h3 className="mt-3 font-display text-lg font-semibold">{f.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-fog">{f.blurb}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-10">
        <SectionHeading kicker="How it works" title="Idea to track in three moves" />
        <div className="grid gap-4 md:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.n} className="rounded-2xl border border-line bg-coal p-6">
              <p className="font-mono text-sm text-ember">{s.n}</p>
              <h3 className="mt-2 font-display text-lg font-semibold">{s.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-fog">{s.blurb}</p>
            </div>
          ))}
        </div>
      </section>

      {/* EXAMPLE TRACKS */}
      <section className="py-10">
        <SectionHeading
          kicker="Fresh from the studio"
          title="Example tracks"
          blurb="Press play — these stream right here so you can feel the player before signing up."
        />
        <div className="grid gap-3 md:grid-cols-2">
          {MOCK_TRACKS.slice(0, 4).map((t) => (
            <TrackCard key={t.id} track={t} />
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section className="py-10">
        <SectionHeading kicker="Pricing" title="Pay in credits, not subscriptions" />
        <div className="grid gap-4 md:grid-cols-3">
          {PRICING_TIERS.map((t) => (
            <Card key={t.name} className={`p-6 ${t.highlight ? 'border-ember' : ''}`}>
              {t.highlight && <Badge tone="ember">Most picked</Badge>}
              <h3 className="mt-2 font-display text-xl font-bold">{t.name}</h3>
              <p className="mt-1 font-display text-3xl font-bold">
                {t.price} <span className="text-sm font-normal text-fog">/ {t.credits} credits</span>
              </p>
              <p className="mt-2 text-sm text-fog">{t.blurb}</p>
              <ul className="mt-4 space-y-1.5 text-sm text-fog">
                {t.features.map((f) => <li key={f}>— {f}</li>)}
              </ul>
              <Button to="/register" variant={t.highlight ? 'primary' : 'secondary'} className="mt-5 w-full">
                Choose {t.name}
              </Button>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-14">
        <Card className="tape-dots px-8 py-12 text-center">
          <ListMusic size={28} className="mx-auto text-ember" />
          <h2 className="mx-auto mt-4 max-w-xl text-3xl font-bold tracking-tight md:text-4xl">
            Your next video deserves its own soundtrack.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-fog">
            100 free credits. No card. Your first track is two minutes away.
          </p>
          <Button to="/register" className="mt-6">Create Your First Track <ArrowRight size={16} /></Button>
        </Card>
      </section>
    </div>
  );
}
