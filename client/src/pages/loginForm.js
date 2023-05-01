import React from "react";
import { useState, useEffect, useRef} from "react";
import {useHistory} from "react-router-dom";
import {
  Grid,
  Typography,
  Box,
  Container,
  Link,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import UnoV4 from "../images/UnoV4.png";

export const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  let state=true;

  const handleSubmit = async (event) => {
    
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
    
      if (response.ok) {
         if(data.token){
        localStorage.setItem('token', data.token);
        state=true;
        props.onData(state);
        } 
        console.log(data.email);
        console.log(data.token);
       
      } else {
        setError(true);
        state=false;
        console.log("Connexion échouée");
        props.onData(state)
      }
    } catch (error) {
      console.error(error);
     
    }
  };
  
  return (
    <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
      <Box display={"flex"} justifyContent="center">
        <img src={UnoV4} style={{ width: "150px", heigh: "170px" }} />
      </Box>
      <Typography variant="h4" align="center">
        Authentification
      </Typography>
      <Box
        component="form"
        noValidate
        sx={{ mt: 1 }}
        display="block"
        justifyContent="center"
        alignItems="center"
        alignContent={"center"}
        onSubmit={handleSubmit}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email:"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={error}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Mot De Passe:"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={error}
          
        />
        <Box display="flex" justifyContent="center">
          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: "#69d2e7",
              ":hover": { backgroundColor: "#F39200" },
            }}
           // onClick={handleClick}
           
          >
            Se Connecter
          </Button>
        </Box>
      </Box>
      <Link
        variant="body2"
        align="center"
        sx={{ mt: 5, ":hover": { color: "#F39200" } }}
        style={{ marginTop: "20px" }}
      >
        {"Vous N'avez pas De compte? Inscrivez Vous"}
      </Link>
    </Container>
  );
};
