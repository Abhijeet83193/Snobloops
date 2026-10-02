import { Link } from 'react-router-dom';
import { AudioWaveform } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-line bg-coal">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ember text-white">
              <AudioWaveform size={17} />
            </span>
            <span className="font-display font-bold">Snobloops</span>
          </div>
          <p className="mt-3 text-sm text-fog">Create Music. Your Way.</p>
          <p className="mt-1 font-mono text-xs text-dim"> royalty-friendly AI music</p>
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-dim">Create</p>
          <ul className="mt-3 space-y-2 text-sm text-fog">
            <li><Link to="/generate" className="hover:text-bone">AI Generator</Link></li>
            <li><Link to="/remix" className="hover:text-bone">Remix Studio</Link></li>
            <li><Link to="/pricing" className="hover:text-bone">Credits & pricing</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-dim">Explore</p>
          <ul className="mt-3 space-y-2 text-sm text-fog">
            <li><Link to="/discover" className="hover:text-bone">Discover</Link></li>
            <li><Link to="/library" className="hover:text-bone">My Library</Link></li>
            <li><Link to="/playlists" className="hover:text-bone">Playlists</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-dim">Account</p>
          <ul className="mt-3 space-y-2 text-sm text-fog">
            <li><Link to="/login" className="hover:text-bone">Login</Link></li>
            <li><Link to="/register" className="hover:text-bone">Register</Link></li>
            <li><Link to="/settings" className="hover:text-bone">Settings</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line py-4 text-center font-mono text-xs text-dim">
        © 2026 Snobloops · Made for creators
      </div>
    </footer>
  );
}
