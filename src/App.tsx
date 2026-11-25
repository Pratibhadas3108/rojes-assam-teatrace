import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Simulator } from './pages/Simulator';
import { Analytics } from './pages/Analytics';
import { Proposal } from './pages/Proposal';

export function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/trace-simulator" element={<Simulator />} />
          <Route path="/compliance-audit" element={<Analytics />} />
          <Route path="/proposal" element={<Proposal />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
