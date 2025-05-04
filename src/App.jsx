import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from './pages/Inicio';
import ListaCurriculum from './pages/ListaCurriculum';
import FormularioCandidato from './components/FormularioCandidato';
import PanelFiltros from './components/PanelFiltros';
import DetalleCurriculum from './pages/DetalleCurriculum';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/lista" element={<ListaCurriculum />} />
        <Route path="/registrar" element={<FormularioCandidato />} />
        <Route path="/filtros" element={<PanelFiltros />} />
        <Route path="/detalle/:id" element={<DetalleCurriculum />} />
      </Routes>
    </Router>
  );
}

export default App;
