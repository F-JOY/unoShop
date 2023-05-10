import React, { useState } from "react";
import { Container, CssBaseline, Box, TextField } from "@mui/material";

export default function (props) {

  return (
    <Container component="main" maxWidth="xs" sx={{height:"150px"}}>
     
      <Box component="form"  noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
          autoFocus
          value={props.email}
          onChange={(e) => {
            props.handleEmailChange(e.target.value);
          }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Mot De Passe"
          type="password"
          id="password"
          autoComplete="current-password"
          value={props.mdp}
          onChange={(e) => props.handleMdpChange(e.target.value)}
        />
      </Box>
    </Container>
  );
}
