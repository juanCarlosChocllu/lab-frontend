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
  Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { formatearFecha } from "../../core/util/formaterFecha";
import { TrackingProps } from "../interface/trackingProps";
import { diferencia } from "../../core/util/diferencia";
import React from "react";

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
      PaperProps={{
        sx: {
          borderRadius: 3,
          overflow: "hidden",
        },
      }}
    >
      {/* Header */}
      <DialogTitle
        sx={{
          m: 0,
          p: 3,
          bgcolor: "primary.main",
          color: "primary.contrastText",
          position: "relative",
          fontWeight: "bold",
          fontSize: "1.25rem",
          boxShadow: (theme) => `0 2px 4px ${theme.palette.primary.dark}`,
        }}
      >
        Número de Pedido: {pedido}
        <IconButton
          aria-label="close"
          onClick={closeModal}
          sx={{
            position: "absolute",
            right: 12,
            top: 12,
            color: "primary.contrastText",
            "&:hover": {
              bgcolor: "primary.dark",
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ p: 3 }}>
        <TableContainer component={Paper} variant="outlined" sx={{ boxShadow: "none" }}>
          <Table size="small" sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ bgcolor: "grey.100" }}>
                <TableCell sx={{ fontWeight: "bold" }}>Tracking</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Sector</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Reproceso</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Fecha y hora</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {seguimiento.map((item, i) => (
                <React.Fragment key={i}>
                  <TableRow
                    sx={{
                      bgcolor:
                        item.reproceso === "Si"
                          ? "rgba(255, 0, 0, 0.15)"
                          : i % 2 === 0
                          ? "background.paper"
                          : "grey.50",
                      transition: "background-color 0.3s ease",
                    }}
                    hover
                  >
                    <TableCell>{item.tracking}</TableCell>
                    <TableCell>{item.sector}</TableCell>
                    <TableCell sx={{ color: item.reproceso === "Si" ? "error.main" : "text.primary", fontWeight: item.reproceso === "Si" ? "bold" : "normal" }}>
                      {item.reproceso === "null" ? "" : item.reproceso}
                    </TableCell>
                    <TableCell>{formatearFecha(item.fechaTracking)}</TableCell>
                  </TableRow>
                  {i % 2 === 1 && (
                    <TableRow>
                      <TableCell colSpan={3} sx={{ fontStyle: "italic", color: "text.secondary" }}>
                        Tiempo entre procesos
                      </TableCell>
                      <TableCell sx={{ fontWeight: "medium", color: "text.primary" }}>
                        {diferencia(seguimiento[i - 1].fechaTracking, item.fechaTracking)}
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
    </Dialog>
  );
};
