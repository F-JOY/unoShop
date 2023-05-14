import {
    Avatar,
    Grid,
    Box,
    Drawer,
    Link,
    Typography,
    Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  } from "@mui/material";
  import React, { useEffect, useState } from "react";
  import { useHistory } from "react-router-dom";
  import EditIcon from "@mui/icons-material/Edit";


export const ClientProfil=()=>{
    const [user, setUser] = useState([]);
    const [userPhoto, setUserPhoto] = useState();
    const history = useHistory();

    useEffect(() => {
      if (localStorage.getItem("photo")) {
        setUserPhoto(
          "http://localhost:3001/users/" + localStorage.getItem("photo")
        );
      }
     
      getUserById(localStorage.getItem("userId"));
     
    }, []);
    ////////////////////////// deconnexion///////////////////////////////////
    const handleLogOut = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("photo");
      localStorage.removeItem("type");
      localStorage.removeItem("typeCompt");
      localStorage.removeItem("userId");
      history.push('/');
    };
  
    

 /////////////// http request get user informations by id//////////////////
 const getUserById = async (userId) => {
    try {
      const authToken = "Bearer " + localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:3001/api/v1/users/" + userId,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: authToken,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        console.log("user gotten");
        console.log(data);
        setUser(data.data);
      } else {
        console.log(data);
      }
    } catch (error) {
      console.error(error);
    }
  };   
return(
    <Box display={"flex"} justifyContent={"center"}>
    <Box  sx={{padding:"30px",width:"700px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)", }}>
      <Avatar
        src={userPhoto}
        sx={{
          height: "150px",
          width: "150px",
          margin: "auto",
          
        }}
      ></Avatar>
      <Box display={"flex"} justifyContent="center" padding={2}>
        <Button
          variant="outlined"
          sx={{
            color: "black",
            borderColor: "black",
            borderRadius: "10px",
            ":hover": { color: "#F39200", borderColor: "#F39200",},
          }}
        >
          Modifier Profil <EditIcon />
        </Button>
      </Box>
      <Box display={"flex"} justifyContent="center" >
         <Typography align="center" variant="body1" ml={2} fontSize="20px" fontWeight={"bold"}>
        {user.type}{" "}:{" "}{user.nom}{" "} {user.prenom}
       
        <Typography>Email : {user.email}</Typography>
        <Typography>Adresse : {user.adresse}</Typography>
        <Typography>Telephone : {user.numtel}</Typography>
        <Typography>Numero CCP : {user.numccp}</Typography>
      </Typography>
      </Box>
     

      <Box display={"flex"} justifyContent="center" pt={2}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#0049f2",
            borderRadius: "10px",
            ":hover": {backgroundColor: "#F39200",},
          
          }}
          onClick={handleLogOut}
          
        >
          Deconnecter 
        </Button>
       
      </Box>
      </Box>
      </Box>
);

}