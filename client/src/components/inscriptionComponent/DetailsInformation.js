import { React } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default function DetailsInformation(props) {
  return (
    <Grid container spacing={2} justify="center" alignItems="center">
      <Grid item>
        <Typography variant="h5" color="initial">
          Nom:
        </Typography>
        <Typography variant="h5" color="initial">
          {props.nom}
        </Typography>
      </Grid>
    </Grid>
  );
}
