import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AudioWaveform, Coins, LogOut } from 'lucide-react';
import { logout } from '../features/auth/authSlice.js';

const linkCls = ({ isActive }) =>
  `rounded-lg px-3 py-1.5 text-sm transition-colors ${
    isActive ? 'bg-raise text-bone' : 'text-fog hover:text-bone hover:bg-card'
  }`;

export default function Navbar() {
  const token = useSelector((s) => s.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/90 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-ember text-white">
            <AudioWaveform size={20} />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            Snobloops
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          <NavLink to="/discover" className={linkCls}>Discover</NavLink>
          {token && (
            <>
              <NavLink to="/dashboard" className={linkCls}>Dashboard</NavLink>
              <NavLink to="/generate" className={linkCls}>Generate</NavLink>
              <NavLink to="/library" className={linkCls}>Library</NavLink>
            </>
          )}
          <NavLink to="/pricing" className={linkCls}>Pricing</NavLink>
        </div>

        <div className="flex items-center gap-2">
          {token ? (
            <>
              <span className="mr-1 hidden items-center gap-1.5 rounded-full border border-gold/40 bg-coal px-3 py-1 text-xs font-semibold text-gold sm:flex">
                <Coins size={13} /> 65
              </span>
              <button
                onClick={() => { dispatch(logout()); navigate('/'); }}
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-fog hover:bg-card hover:text-bone"
              >
                <LogOut size={15} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="rounded-lg px-3 py-1.5 text-sm text-fog hover:text-bone">
                Login
              </Link>
              <Link to="/register" className="rounded-lg bg-ember px-4 py-2 text-sm font-semibold text-white hover:bg-ember-deep">
                Start creating
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
