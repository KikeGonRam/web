import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Alert,
  Button
} from '@mui/material';

const Dashboard = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchUsuarios = async () => {
    try {
      const token = localStorage.getItem('userToken');
      const response = await api.get('/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsuarios(response.data);
    } catch (err) {
      console.error('Error al obtener usuarios:', err.response || err.message); // Imprime detalles del error
      setError('Error al obtener usuarios');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    window.location.href = '/login';
  };

  const handleCrearUsuario = () => {
    navigate('/register');
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  const handleEditarUsuario = (userId) => {
    navigate(`/user/edit/${userId}`);
  };

  const handleEliminarUsuario = async (userId) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este usuario?');
    if (confirmDelete) {
      try {
        const token = localStorage.getItem('userToken');
        await api.delete(`/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsuarios(prev => prev.filter(user => user.id !== userId)); // Eliminar usuario de la lista sin necesidad de recargar
      } catch (err) {
        setError('Error al eliminar usuario');
        console.error('Error al eliminar usuario:', err.response || err.message);
      }
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h4">Dashboard</Typography>
        <Button onClick={handleLogout} variant="outlined" color="error">
          Cerrar Sesión
        </Button>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button variant="contained" color="primary" onClick={handleCrearUsuario}>
          Crear Usuario
        </Button>
      </Box>

      <Typography variant="h6" gutterBottom>Usuarios registrados:</Typography>
      <List>
        {usuarios.map(user => (
          <ListItem key={user.id}>
            <ListItemText
              primary={user.nombre}
              secondary={user.email}
            />
            <Button 
              variant="outlined" 
              color="primary" 
              onClick={() => handleEditarUsuario(user.id)} 
              sx={{ marginRight: 1 }}
            >
              Editar
            </Button>
            <Button 
              variant="outlined" 
              color="error" 
              onClick={() => handleEliminarUsuario(user.id)}
            >
              Eliminar
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Dashboard;
