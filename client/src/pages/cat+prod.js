import {
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemButton,
  Typography,
  Button,
  Box,
  Grid,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import SearchIcon from "@mui/icons-material/Search";
import Header from "../components/appBarF";
import IconButton from '@mui/material/IconButton';
import { InputBase } from "@mui/material";
import { makeStyles } from '@mui/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import casque from '../images/casque.png';
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

export default function Produits() {
  const drawerWidth = 240;
  const useStyles = makeStyles({
    drawerContainer: {
      overflow: 'hidden',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
     
    },
  });
  const [categorie, setCategorie] = useState([]);
  const [produit, setProduit]=useState([]);
  const produits=[
    {"name":"casque","description":""}
  ]
  useEffect(() => {
    getCategorie();
    getProduits();
  }, []);

  const getCategorie = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/v1/categories", {
        method: "GET",
        headers: {
          "Cache-Control": "no-cache",
        },
      });
      const data = await response.json();
      if (response.ok) {
        setCategorie(data);
      } else {
        console.log(data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const getProduits = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/v1/products", {
        method: "GET",
        headers: {
          "Cache-Control": "no-cache",
        },
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data.data)
        setProduit(data.data);
      } else {
        console.log(data);
      }
    } catch (error) {
      console.error(error);
    }
  };
 
    const classes = useStyles();
  

  return (
    <>
      <Header />
     
      <Drawer anchor="left" variant="permanent" open={true}  classes={{ paper: classes.drawerContainer }} 
      >
        <Box sx={{ paddingTop:"80px" }}></Box>
       
        <Box    position={'sticky'}
                  border={1}
                  borderColor="black"
                  height="35px"
                  width='215px'
                  display="flex"
                  paddingLeft="10px"
                  justifyContent={"center"}
                  marginLeft='10px'
                  marginRight={'10px'}
                >
                  <InputBase
                    sx={{
                      width: "100%",
                    }}
                    color="secondary"
                    placeholder="categorie..."
                  ></InputBase>
                  <IconButton>
                    <SearchIcon sx={{ borderLeft: "solid 1px" }} />
                  </IconButton>
                </Box>
        <List >
          {categorie.map((cat) => (
            <ListItem key={cat._id} disableGutters disablePadding>
              <ListItemButton
                sx={{
                  marginTop:'3px',
                  backgroundColor: "#f0efed",
                  ":hover": { backgroundColor: "#F39200" },
                }}
              >
                <ListItemText primary={cat.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
     <Grid display={'flex'}  >
      <Grid item>
     <Box width={250}></Box>
    
      </Grid>
     
      <Grid item marginTop={10}  >
      <Typography variant="h4">Produits récemment Ajouter</Typography>
      <Box marginBottom={5} style={{ height: "2px", backgroundColor: "#F39200" }}></Box>
      <Grid container  spacing={4} classes={{ paper: classes.drawerContainer }}
          display="flex"> 
            {produit.map((prod)=>(
                 <Grid item xs={12} sm={6} md={3} key={prod._id}>

                 <Card sx={{ maxWidth: 345 }}>
                 <CardMedia
                   sx={{ height: 140 }}
                   image={"http://localhost:3001/products/"+prod.imageCover}
                  
                 />
                 <CardContent>
                   <Typography gutterBottom variant="h6" fontSize={17} component="div">
                    {prod.name}
                   </Typography>
                   <Typography variant="body1" color="text.secondary">
                      prix:{prod.nouveauprix} DA
                   </Typography>
                 </CardContent>
                 <CardActions>
                   <Button  variant="contained"
                      sx={{
                        borderRadius: "15px",
                        backgroundColor: "#69d2e7",
                        ":hover": { backgroundColor: "#F39200" },
                      }}>Acheter</Button>
                      
                  <IconButton ><FavoriteBorderOutlinedIcon sx={{marginLeft:'80px'}}/></IconButton>
                 </CardActions>
               </Card>
           
                 </Grid>

            ))}
     </Grid>
      
     </Grid>
      </Grid>
    </>
  );
}
