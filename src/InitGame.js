import { Button, Stack, TextField } from "@mui/material";

export default function InitGame({ setInstance, setOrientation }) {

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{ py: 1, height: "100vh" }}
    >
      {/* Button for starting a game */}
      <Button
        variant="contained"
        onClick={() => {
          // create a room
          setInstance("123");
          setOrientation("white");
        }}
      >
        Start a game
      </Button>
    </Stack>
  );
}