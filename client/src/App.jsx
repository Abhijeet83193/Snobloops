import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Landing from './pages/Landing.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Generator from './pages/Generator.jsx';
import GenerationDetails from './pages/GenerationDetails.jsx';
import Library from './pages/Library.jsx';
import Discover from './pages/Discover.jsx';
import Remix from './pages/Remix.jsx';
import Playlists from './pages/Playlists.jsx';
import Profile from './pages/Profile.jsx';
import Settings from './pages/Settings.jsx';
import Pricing from './pages/Pricing.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route element={<MainLayout />}>
        <Route index element={<Landing />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="discover" element={<Discover />} />
        <Route path="pricing" element={<Pricing />} />
      </Route>

      {/* Protected */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="generate" element={<Generator />} />
          <Route path="generations/:id" element={<GenerationDetails />} />
          <Route path="library" element={<Library />} />
          <Route path="remix" element={<Remix />} />
          <Route path="playlists" element={<Playlists />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
