import { CircularProgress, Backdrop } from "@mui/material";
import { useIsFetching, useIsMutating } from "@tanstack/react-query";

export default function GlobalLoader() {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  const loading = isFetching > 0 || isMutating > 0;

  return (
    <Backdrop
      open={loading}
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
