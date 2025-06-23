import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import SkateTable from '../../components/admin/SkateTable';
import SkateForm from '../../components/admin/SkateForm';

const SkateboardsPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSkate, setEditingSkate] = useState(null);

  const handleAddNew = () => {
    setEditingSkate(null);
    setIsFormOpen(true);
  };

  const handleEdit = (skate) => {
    setEditingSkate(skate);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingSkate(null);
  };

  const handleFormSubmit = async (skateData) => {
    // TODO: Реализовать сохранение данных
    console.log('Saving skateboard:', skateData);
    handleFormClose();
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Управление скейтбордами
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddNew}
        >
          Добавить скейтборд
        </Button>
      </Box>

      <Paper sx={{ p: 2 }}>
        <SkateTable onEdit={handleEdit} />
      </Paper>

      <Dialog
        open={isFormOpen}
        onClose={handleFormClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {editingSkate ? 'Редактировать скейтборд' : 'Добавить скейтборд'}
        </DialogTitle>
        <DialogContent>
          <SkateForm
            initialValues={editingSkate}
            onSubmit={handleFormSubmit}
            onCancel={handleFormClose}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default SkateboardsPage;
