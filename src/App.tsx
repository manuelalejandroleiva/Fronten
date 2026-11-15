import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Routess from './routes/routes';


export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <Navbar />
          <Routess />
      </div>
    </BrowserRouter>
  );
}