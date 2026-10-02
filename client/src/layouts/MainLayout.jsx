import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import PlayerBar from '../components/PlayerBar.jsx';

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-ink text-bone">
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 pb-32 pt-8">
        <Outlet />
      </main>
      <Footer />
      <PlayerBar />
    </div>
  );
}
