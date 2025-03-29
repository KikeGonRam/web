import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';

// Componente temporal para verificar que el router funciona
const Home = () => <h1 style={{ padding: '20px' }}>Página de Inicio - Ve a /register</h1>;

function App() {
  return (
    <Router>
      <div>
        {/* Contenido básico para verificar que se renderiza */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;