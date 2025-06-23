import React, { useState, useEffect, useCallback } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Chip,
  LinearProgress
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import apiService from '../../services/api';
import { SKATEBOARD_STATUSES } from '../../mocks/types';

const statusColors = {
  [SKATEBOARD_STATUSES.AVAILABLE]: 'success',
  [SKATEBOARD_STATUSES.MAINTENANCE]: 'warning',
  [SKATEBOARD_STATUSES.BROKEN]: 'error',
  [SKATEBOARD_STATUSES.RENTED]: 'info'
};

const SkateTable = ({ onEdit }) => {
  const [skateboards, setSkateboards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [total, setTotal] = useState(0);

  const fetchSkateboards = useCallback(async () => {
    try {
      setLoading(true);
      const response = await apiService.getSkateboards();
      const startIndex = page * rowsPerPage;
      const endIndex = startIndex + rowsPerPage;
      
      // Для мока делаем пагинацию на клиенте
      setSkateboards(response.slice(startIndex, endIndex));
      setTotal(response.length);
    } catch (error) {
      console.error('Error fetching skateboards:', error);
    } finally {
      setLoading(false);
    }
  }, [page, rowsPerPage]);

  useEffect(() => {
    fetchSkateboards();
  }, [fetchSkateboards]);

  const handleDelete = async (id) => {
    if (window.confirm('Вы уверены, что хотите удалить этот скейтборд?')) {
      try {
        // В будущем здесь будет вызов API для удаления
        setSkateboards(prev => prev.filter(skate => skate.id !== id));
        setTotal(prev => prev - 1);
      } catch (error) {
        console.error('Error deleting skateboard:', error);
      }
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      {loading && <LinearProgress />}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Модель</TableCell>
              <TableCell>Заряд</TableCell>
              <TableCell>Статус</TableCell>
              <TableCell>Последняя локация</TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {skateboards.map((skate) => (
              <TableRow key={skate.id}>
                <TableCell>{skate.id}</TableCell>
                <TableCell>{skate.model}</TableCell>
                <TableCell>
                  <LinearProgress
                    variant="determinate"
                    value={skate.battery_level}
                    sx={{
                      height: 10,
                      borderRadius: 5,
                      backgroundColor: '#e0e0e0',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: skate.battery_level < 20 ? '#f44336' : '#4caf50'
                      }
                    }}
                  />
                  <div style={{ textAlign: 'center', fontSize: '0.75rem' }}>
                    {skate.battery_level}%
                  </div>
                </TableCell>
                <TableCell>
                  <Chip
                    label={skate.status}
                    color={statusColors[skate.status]}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {skate.location ? (
                    `${skate.location.lat.toFixed(6)}, ${skate.location.lng.toFixed(6)}`
                  ) : (
                    'Нет данных'
                  )}
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={() => onEdit(skate)}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDelete(skate.id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={total}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25, 50]}
      />
    </>
  );
};

export default SkateTable;
