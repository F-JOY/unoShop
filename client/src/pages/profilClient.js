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
import Header from "../components/appBarF";
import { makeStyles } from "@mui/styles";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from '@mui/icons-material/Logout';
import { Achat } from "../components/profilClientComponent/Achat";
import { MexFournisseur } from "../components/profilClientComponent/fournisseur";
export const ProfilClient = () => {
  const [user, setUser] = useState([]);
  const [userPhoto, setUserPhoto] = useState();
  const [clickAchat, setClickAchat] = useState(true);
  const [clickFavorie, setClickFavorie] = useState(false);
  const [clickFornis, setClickFornis] = useState(false);
  const [fournisseurs,setFrounisseur]=useState([]);
  const [orders,setOrders]=useState([]);
  const[orderItems,setOrderItems]=useState([]);
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
  
 
  return (
    <>
      <Header cartData={[]} />
      <Box height={"50px"}></Box>
      <Grid container display={"flex"} >
        <Grid
          item
          md={3}
          display="block"
          height={"100%"}
          sx={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)", }}
          
        >
          <Avatar
            src={userPhoto}
            sx={{
              height: "200px",
              width: "200px",
              margin: "auto",
              marginTop: "50px",
            }}
          ></Avatar>
          <Box display={"flex"} justifyContent="center" padding={4}>
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
          <Typography variant="body1" ml={2} fontSize="20px">
            {user.nom} {user.prenom}
            <Typography>{user.type}</Typography>
            <Typography>Email : {user.email}</Typography>
            <Typography>Adresse : {user.adresse}</Typography>
            <Typography>Telephone : {user.numtel}</Typography>
            <Typography>Numero CCP : {user.numccp}</Typography>
          </Typography>

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
        </Grid>
        <Grid item md={9} sx={{ msOverflowStyle: "hidden" }}>
          <Box display={"flex"} justifyContent="Left" height="50px">
            <Link
              variant="button"
              underline="hover"
              sx={{
                paddingTop: "25px",
                marginRight: "90px",
                marginLeft: "5px",
                color: clickAchat ? "#F39200" : "gray",
                fontSize: clickAchat ? "20px" : "13px"
              }}
              onClick={() => { 
                
                setClickAchat(true);
                setClickFavorie(false);
                setClickFornis(false);
              }}
             
            >
              Mes achat
            </Link>
            <Link
              variant="button"
              underline="hover"
              color={"gray"}
              sx={{
                paddingTop: "25px",
                marginRight: "90px",
                color: clickFavorie ? "#F39200" : "gray",
                fontSize: clickFavorie ? "20px" : "13px",
                
              }}
              onClick={() => {
               
                setClickAchat(false);
                setClickFavorie(true);
                setClickFornis(false);
              }}
            >
              Mes Favories
            </Link>
            <Link
              variant="button"
              underline="hover"
              color={"gray"}
              sx={{
                paddingTop: "25px",
                marginRight: "90px",
                color: clickFornis ? "#F39200" : "gray",
                fontSize: clickFornis ? "20px" : "13px",
             
              }}
              onClick={() => {
                setClickAchat(false);
                setClickFavorie(false);
                setClickFornis(true);
              }}
            >
              Mes Fournisseurs
            </Link>
          </Box>
          <Box style={{ height: "2px", backgroundColor: "#F39200",marginTop:"10px" }}></Box>
          {clickAchat ? (
           <Achat />
          ) : clickFavorie ? (
            <Typography>Favorie</Typography>
          ) : clickFornis ?(
            <MexFournisseur/>
          ):(
            <Achat orders={orders}/>
          )}
        </Grid>
      </Grid>
    </>
  );
};
