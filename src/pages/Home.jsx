import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import EditUser from './pages/EditUser';
import DeleteUser from './pages/DeleteUser';

// Componente Home rediseñado
const Home = () => {
  const navigate = useNavigate();
  
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>Bienvenido a nuestra plataforma</h1>
        <p style={styles.subtitle}>Gestiona tus usuarios de forma sencilla y eficiente</p>
        
        <button 
          onClick={() => navigate('/login')} 
          style={styles.button}
        >
          Comenzar
        </button>
        
        <div style={styles.features}>
          <div style={styles.featureCard}>
            <h3>✔️ Registro fácil</h3>
            <p>Crea cuentas en segundos</p>
          </div>
          <div style={styles.featureCard}>
            <h3>🔒 Seguridad</h3>
            <p>Tus datos protegidos</p>
          </div>
          <div style={styles.featureCard}>
            <h3>📊 Dashboard</h3>
            <p>Visualiza toda la información</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Estilos profesionales
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    padding: '20px',
  },
  content: {
    textAlign: 'center',
    maxWidth: '800px',
    background: 'white',
    padding: '40px',
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '2.5rem',
    color: '#2c3e50',
    marginBottom: '16px',
    fontWeight: '700',
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#7f8c8d',
    marginBottom: '40px',
  },
  button: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '12px 30px',
    fontSize: '1rem',
    borderRadius: '50px',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    marginBottom: '40px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  buttonHover: {
    backgroundColor: '#2980b9',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15)',
  },
  features: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '20px',
  },
  featureCard: {
    flex: '1',
    minWidth: '200px',
    background: '#f8f9fa',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
  }
};

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user/edit/:userId" element={<EditUser />} />
          <Route path="/user/delete/:userId" element={<DeleteUser />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;