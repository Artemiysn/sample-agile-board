import { Box, CircularProgress, Typography } from "@mui/material";

export default function LoadingPage() {
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
    > <Box>
          <Typography variant="h4" component="div" display="inline-block" marginRight="15px">
              Can take up to 15 seconds. Be patient.. 
          </Typography>
          <CircularProgress />
      </Box>
    </Box>
  );
}
