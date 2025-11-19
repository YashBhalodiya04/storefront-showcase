import { useCallback } from 'react';
import { useSnackbar as useNotistackSnackbar } from 'notistack';

export const useSnackbar = () => {
  const { enqueueSnackbar } = useNotistackSnackbar();

  const toast = {
    success: useCallback((message: string) => {
      enqueueSnackbar(message, { variant: 'success' });
    }, [enqueueSnackbar]),
    error: useCallback((message: string) => {
      enqueueSnackbar(message, { variant: 'error' });
    }, [enqueueSnackbar]),
    info: useCallback((message: string) => {
      enqueueSnackbar(message, { variant: 'info' });
    }, [enqueueSnackbar]),
  };

  return { toast };
};
