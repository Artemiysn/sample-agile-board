import { Box, Alert } from "@mui/material";

export default function ErrorPage() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        top: "0",
        left: "0",
        bottom: "0",
        right: "0",
        overflow: "auto",
      }}
    >
      <Alert severity="error">Error happened. Oopps!</Alert>
    </Box>
  );
}
