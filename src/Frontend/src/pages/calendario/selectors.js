import { createSelector } from 'reselect';

// Selecciona el estado base
const selectRootState = state => state;

// Memoiza la selección de currentDate
export const selectCurrentDate = createSelector(
  [selectRootState],
  (state) => state.currentDate
);

// Memoiza la selección de desde
export const selectDesde = createSelector(
  [selectRootState],
  (state) => state.desde
);

// Memoiza la selección de hasta
export const selectHasta = createSelector(
  [selectRootState],
  (state) => state.hasta
);

// Memoiza la selección de TURNOS
export const selectTurnos = createSelector(
  [selectRootState],
  (state) => state.TURNOS
);

// Memoiza la selección de TURNOS_COMPLETE
export const selectTurnosComplete = createSelector(
  [selectRootState],
  (state) => state.TURNOS_COMPLETE
);

// Memoiza la selección de SUCURSAL
export const selectSucursal = createSelector(
  [selectRootState],
  (state) => state.SUCURSAL
);

// Memoiza la selección de TIPOESTADOTURNO
export const selectTipoEstadoTurno = createSelector(
  [selectRootState],
  (state) => state.TIPOESTADOTURNO
);

// Memoiza la selección de UNIDAD
export const selectUnidad = createSelector(
  [selectRootState],
  (state) => state.UNIDAD
);

// Memoiza la selección de SERVICIO
export const selectServicio = createSelector(
  [selectRootState],
  (state) => state.SERVICIO
);

// Memoiza la selección de adicionalesTurno
export const selectAdicionalesTurno = createSelector(
  [selectRootState],
  (state) => state.adicionalesTurno
);
