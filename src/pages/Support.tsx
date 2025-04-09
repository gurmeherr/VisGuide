import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Alert, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useForm, ValidationError } from '@formspree/react';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface SnackbarState {
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'info' | 'warning';
}

const Support: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [snackbar, setSnackbar] = useState<SnackbarState>({ 
    open: false, 
    message: '', 
    severity: 'success' 
  });
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  // Initialize Formspree
  const [state, handleSubmit] = useForm("mldjoyyw");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      // Add user ID to the form data
      const formDataWithUserId = {
        ...formData,
        userId: currentUser?.uid || 'anonymous'
      };
      
      // Submit the form using Formspree
      await handleSubmit(e);
      
      // If we get here, the submission was successful
      setSnackbar({
        open: true,
        message: 'Message sent successfully! We will get back to you soon.',
        severity: 'success'
      });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to send message. Please try again later.',
        severity: 'error'
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  // Check if there are any errors
  const hasErrors = state.errors ? true : false;

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Support
        </Typography>
        <Typography variant="body1" paragraph align="center" color="text.secondary">
          Need help? Send us a message and we'll get back to you as soon as possible.
        </Typography>
      </Box>

      <Box component="form" onSubmit={onSubmit} sx={{ mt: 3 }}>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          margin="normal"
          error={hasErrors}
          helperText={hasErrors ? "Please enter a valid email address" : ""}
        />
        <TextField
          fullWidth
          label="Message"
          name="message"
          multiline
          rows={4}
          value={formData.message}
          onChange={handleChange}
          required
          margin="normal"
          error={hasErrors}
          helperText={hasErrors ? "Please enter your message" : ""}
        />
        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            onClick={() => navigate(-1)}
            sx={{ flex: 1 }}
          >
            Back
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={state.submitting}
            sx={{ flex: 1 }}
          >
            {state.submitting ? 'Sending...' : 'Send Message'}
          </Button>
        </Box>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Support;