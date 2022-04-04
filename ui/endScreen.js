import { Grid, Typography, Fade, IconButton } from "@mui/material";
import Image from "next/image";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

export default function EndScreen({ song, loaded, setPlaying, playerRef }) {
  return (
    <Grid
      sx={{ minHeight: "100vh" }}
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      {loaded && (
        <>
          <Image src={song.image} height={300} width={300} alt={song.name} />
          <IconButton
            sx={(theme) => ({ margin: theme.spacing(5)})}
            disabled={!loaded}
            onClick={() => setPlaying(true)}
          >
            <PlayArrowIcon />
          </IconButton>
          <Typography variant="h3">{song.name}</Typography>
          <Typography>{song.artist}</Typography>
        </>
      )}
    </Grid>
  );
}
