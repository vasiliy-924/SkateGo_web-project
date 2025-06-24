import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  LinearProgress,
  Tooltip,
  TablePagination,
  Box,
  Typography
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  BatteryChargingFull as BatteryIcon,
  Speed as SpeedIcon,
  ElectricBolt as VoltageIcon,
  Route as RouteIcon
} from '@mui/icons-material';
import { SKATEBOARD_STATUSES, TECHNICAL_PARAMS } from '../../mocks/types';

const statusColors = {
  [SKATEBOARD_STATUSES.AVAILABLE]: 'success',
  [SKATEBOARD_STATUSES.RENTED]: 'warning',
  [SKATEBOARD_STATUSES.MAINTENANCE]: 'info',
  [SKATEBOARD_STATUSES.CHARGING]: 'info',
  [SKATEBOARD_STATUSES.BROKEN]: 'error',
  [SKATEBOARD_STATUSES.OFFLINE]: 'default'
};

const getBatteryHealthColor = (health) => {
  if (health >= 90) return 'success';
  if (health >= TECHNICAL_PARAMS.CRITICAL_HEALTH) return 'warning';
  return 'error';
};

const formatBatteryPercentage = (current, max) => {
  return Math.round((current / max) * 100);
};

const SkateTable = ({ skateboards, onEdit, onDelete }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Модель</TableCell>
              <TableCell>Серийный номер</TableCell>
              <TableCell>Статус</TableCell>
              <TableCell>Батарея</TableCell>
              <TableCell>Характеристики</TableCell>
              <TableCell>Местоположение</TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {skateboards
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((skate) => {
                const batteryPercentage = formatBatteryPercentage(
                  skate.current_battery_capacity_ah,
                  skate.model.battery_capacity_from_factory_ah
                );

                return (
                  <TableRow key={skate.id}>
                    <TableCell>{skate.id}</TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="subtitle2">{skate.model.name}</Typography>
                        <Typography variant="caption" color="textSecondary">
                          {skate.model.description}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{skate.serial_number}</TableCell>
                    <TableCell>
                      <Chip
                        label={skate.status}
                        color={statusColors[skate.status]}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ width: '100%', mb: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={batteryPercentage}
                          sx={{
                            height: 10,
                            borderRadius: 5,
                            backgroundColor: '#e0e0e0',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: batteryPercentage < 20 ? '#f44336' : '#4caf50'
                            }
                          }}
                        />
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Tooltip title="Заряд">
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <BatteryIcon fontSize="small" />
                            <Typography variant="caption">
                              {batteryPercentage}%
                            </Typography>
                          </Box>
                        </Tooltip>
                        <Tooltip title="Здоровье батареи">
                          <Chip
                            label={`${skate.battery_health}%`}
                            color={getBatteryHealthColor(skate.battery_health)}
                            size="small"
                          />
                        </Tooltip>
                      </Box>
                      <Box sx={{ mt: 1 }}>
                        <Tooltip title="Напряжение">
                          <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <VoltageIcon fontSize="small" />
                            {skate.current_battery_voltage_v}В
                          </Typography>
                        </Tooltip>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Tooltip title="Максимальная скорость">
                          <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <SpeedIcon fontSize="small" />
                            {skate.model.max_speed} км/ч
                          </Typography>
                        </Tooltip>
                        <Tooltip title="Общий пробег">
                          <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <RouteIcon fontSize="small" />
                            {skate.total_distance.toFixed(1)} км
                          </Typography>
                        </Tooltip>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption">
                        {skate.location.address}
                      </Typography>
                      <Typography variant="caption" color="textSecondary" display="block">
                        {new Date(skate.location.timestamp).toLocaleString()}
                      </Typography>
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
                        onClick={() => onDelete(skate.id)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={skateboards.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default SkateTable;
