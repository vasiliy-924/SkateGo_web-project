import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Paper
} from '@mui/material';
import { Add as AddIcon, Close as CloseIcon } from '@mui/icons-material';
import SkateTable from '../../components/admin/SkateTable';
import SkateForm from '../../components/admin/SkateForm';
import { mockApi } from '../../mocks/services/mockApi';

const SkateboardsPage = () => {
  const [skateboards, setSkateboards] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedSkate, setSelectedSkate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSkateboards();
  }, []);

  const loadSkateboards = async () => {
    try {
      const data = await mockApi.getSkateboards();
      setSkateboards(data);
    } catch (error) {
      console.error('Error loading skateboards:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddClick = () => {
    setSelectedSkate(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (skate) => {
    setSelectedSkate(skate);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setSelectedSkate(null);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (selectedSkate) {
        await mockApi.updateSkateboard(selectedSkate.id, formData);
      } else {
        await mockApi.createSkateboard(formData);
      }
      loadSkateboards();
      handleFormClose();
    } catch (error) {
      console.error('Error saving skateboard:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Вы уверены, что хотите удалить этот скейтборд?')) {
      try {
        await mockApi.deleteSkateboard(id);
        loadSkateboards();
      } catch (error) {
        console.error('Error deleting skateboard:', error);
      }
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            Управление скейтбордами
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAddClick}
          >
            Добавить скейтборд
          </Button>
        </Box>

        <SkateTable
          skateboards={skateboards}
          onEdit={handleEditClick}
          onDelete={handleDelete}
          loading={loading}
        />
      </Paper>

      <Dialog
        open={isFormOpen}
        onClose={handleFormClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedSkate ? 'Редактировать скейтборд' : 'Добавить скейтборд'}
          <IconButton
            aria-label="close"
            onClick={handleFormClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <SkateForm
            initialValues={selectedSkate}
            onSubmit={handleFormSubmit}
            onCancel={handleFormClose}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default SkateboardsPage;
