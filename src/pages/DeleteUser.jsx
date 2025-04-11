import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import { Box, Typography, Button, CircularProgress, Alert } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const DeleteUser = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    setLoading(true);
    try {
      // Solicitar eliminación del usuario
      await api.delete(`/users/${userId}`);
      
      // Redirigir después de la eliminación
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Error al eliminar el usuario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 4 }}>
      <Button 
        startIcon={<ArrowBackIcon />} 
        onClick={() => navigate('/dashboard')}
        sx={{ mb: 2 }}
      >
        Volver
      </Button>

      <Typography variant="h4" component="h1" gutterBottom>
        Eliminar Usuario
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Typography variant="body1" sx={{ mb: 2 }}>
        ¿Estás seguro de que deseas eliminar este usuario?
      </Typography>

      <Box mt={2}>
        <Button 
          variant="contained" 
          color="error" 
          fullWidth
          onClick={handleDelete}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} /> : null}
        >
          {loading ? 'Eliminando...' : 'Eliminar'}
        </Button>
      </Box>
    </Box>
  );
};

export default DeleteUser;
