import { React } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Avatar, Box, Button, Input, TextField } from "@mui/material";

export default function DetailsInformation(props) {
  return (
    <Box>
      <Grid
        container
        spacing={2}
        justify="center"
        alignItems="center"
        display={"block"}
      >
        <Grid item display={"flex"} justifyContent="center">
          <Grid display={"inline-block"} alignContent="center">
           
            <Typography
              variant="h4"
              fontSize={25}
              color="initial"
              align="center"
            >
              Photo de profile
            </Typography>
            <Box display={"flex"} justifyContent="center" padding={"20px"}>
              <Avatar sx={{ height: "150px", width: "150px"}} >
               
              </Avatar>
            </Box>
             <Input
               
              name="photodeprofil"
              type="file"
              id="photodeprofil"
              value=""
              onChange={(e) => props.handlePhotoChange(e.target.files[0])}
            />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
