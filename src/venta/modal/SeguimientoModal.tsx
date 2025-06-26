import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { formatearFecha } from '../../core/util/formaterFecha';
import { TrackingProps } from '../interface/trackingProps';

export const SeguimientoModal = ({
  closeModal,
  isOpen,
  seguimiento,
  pedido,
}: TrackingProps) => {
  return (
    <Dialog
      open={isOpen}
      onClose={closeModal}
      fullWidth
      maxWidth="md"
      aria-labelledby="seguimiento-dialog-title"
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        <Typography variant="h6">
          Número de Pedido: {pedido}
        </Typography>
        <IconButton
          aria-label="close"
          onClick={closeModal}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell><strong>Tracking</strong></TableCell>
                <TableCell><strong>Sector</strong></TableCell>
                <TableCell><strong>Reproceso</strong></TableCell>
                <TableCell><strong>Fecha</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {seguimiento.map((item, i) => (
                <TableRow
                  key={i}
                  sx={{
                    backgroundColor:
                      item.reproceso === 'Si' ? 'rgba(255, 0, 0, 0.2)' : 'inherit',
                  }}
                >
                  <TableCell>{item.tracking}</TableCell>
                  <TableCell>{item.sector}</TableCell>
                  <TableCell>{item.reproceso === 'null' ? '' : item.reproceso}</TableCell>
                  <TableCell>{formatearFecha(item.fechaTracking)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
    </Dialog>
  );
};
