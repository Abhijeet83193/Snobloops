import { Link } from 'react-router-dom';
import { Button } from '../components/ui.jsx';

export default function NotFound() {
  return (
    <div className="py-20 text-center">
      <p className="font-mono text-sm text-ember">404 · off the record</p>
      <h1 className="mt-2 font-display text-4xl font-bold">This track doesn&apos;t exist</h1>
      <Button to="/" className="mt-6">Back to the studio</Button>
      <p className="mt-3 text-sm text-fog"><Link to="/discover" className="hover:text-bone">or dig through Discover</Link></p>
    </div>
  );
}
