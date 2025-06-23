import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  IconButton,
  Collapse,
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp, Delete, Refresh, Download } from '@mui/icons-material';
import logger from '../../services/logger';

const LogViewer = () => {
  const [logs, setLogs] = useState([]);
  const [filter, setFilter] = useState({
    level: '',
    search: '',
    startDate: '',
    endDate: '',
  });
  const [expandedRows, setExpandedRows] = useState({});

  const loadLogs = () => {
    const filteredLogs = logger.getLogs(filter);
    setLogs(filteredLogs);
  };

  useEffect(() => {
    loadLogs();
  }, [filter]);

  const handleFilterChange = (field) => (event) => {
    setFilter(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleClearLogs = () => {
    if (window.confirm('Вы уверены, что хотите очистить все логи?')) {
      logger.clearLogs();
      loadLogs();
    }
  };

  const toggleRowExpand = (index) => {
    setExpandedRows(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const handleExportLogs = () => {
    logger.exportLogs();
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Просмотр логов
      </Typography>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Уровень</InputLabel>
            <Select
              value={filter.level}
              onChange={handleFilterChange('level')}
              label="Уровень"
            >
              <MenuItem value="">Все</MenuItem>
              <MenuItem value="ERROR">Ошибки</MenuItem>
              <MenuItem value="WARN">Предупреждения</MenuItem>
              <MenuItem value="INFO">Информация</MenuItem>
              <MenuItem value="DEBUG">Отладка</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Поиск"
            value={filter.search}
            onChange={handleFilterChange('search')}
            sx={{ flexGrow: 1 }}
          />

          <TextField
            type="date"
            label="С даты"
            value={filter.startDate}
            onChange={handleFilterChange('startDate')}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            type="date"
            label="По дату"
            value={filter.endDate}
            onChange={handleFilterChange('endDate')}
            InputLabelProps={{ shrink: true }}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={loadLogs}
            startIcon={<Refresh />}
          >
            Обновить
          </Button>

          <Button
            variant="contained"
            color="secondary"
            onClick={handleExportLogs}
            startIcon={<Download />}
          >
            Экспорт
          </Button>

          <Button
            variant="outlined"
            color="error"
            onClick={handleClearLogs}
            startIcon={<Delete />}
          >
            Очистить
          </Button>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox" />
                <TableCell>Время</TableCell>
                <TableCell>Уровень</TableCell>
                <TableCell>Сообщение</TableCell>
                <TableCell>URL</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {logs.map((log, index) => (
                <React.Fragment key={index}>
                  <TableRow
                    hover
                    sx={{
                      '&:nth-of-type(odd)': { bgcolor: 'action.hover' },
                      cursor: 'pointer',
                    }}
                  >
                    <TableCell padding="checkbox">
                      <IconButton size="small" onClick={() => toggleRowExpand(index)}>
                        {expandedRows[index] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                      </IconButton>
                    </TableCell>
                    <TableCell>{formatDate(log.timestamp)}</TableCell>
                    <TableCell>
                      <Typography
                        component="span"
                        sx={{
                          color: log.level === 'ERROR' ? 'error.main' :
                                log.level === 'WARN' ? 'warning.main' :
                                log.level === 'INFO' ? 'info.main' : 'text.primary'
                        }}
                      >
                        {log.level}
                      </Typography>
                    </TableCell>
                    <TableCell>{log.message}</TableCell>
                    <TableCell>{log.url}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                      <Collapse in={expandedRows[index]} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                          <Typography variant="h6" gutterBottom component="div">
                            Детали
                          </Typography>
                          <pre style={{ 
                            whiteSpace: 'pre-wrap', 
                            wordWrap: 'break-word',
                            backgroundColor: 'rgba(0, 0, 0, 0.04)',
                            padding: '8px',
                            borderRadius: '4px'
                          }}>
                            {JSON.stringify(log.details, null, 2)}
                          </pre>
                          <Typography variant="body2" color="text.secondary">
                            User Agent: {log.userAgent}
                          </Typography>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default LogViewer; 