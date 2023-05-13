import {
  Link,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemButton,
  Typography,
  Button,
  Box,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Badge,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import SearchIcon from "@mui/icons-material/Search";
import Header from "../components/appBarF";
import IconButton from "@mui/material/IconButton";
import { InputBase } from "@mui/material";
import { faHeartCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

export default function HomeProducts(props) {
  const drawerWidth = 240;
  const useStyles = makeStyles({
    drawerContainer: {
      overflow: "hidden",
      "&::-webkit-scrollbar": {
        display: "none",
      },
    },
  });

  const [produit, setProduit] = useState([]);

  const [formattedDate, setFormatedDate] = useState();
  const [images, setImages] = useState([]);
  const history = useHistory();
  useEffect(() => {
    getProduits();
  }, []);

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
        setProduit(data.data.reverse().slice(0, 10));
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
    
      <Box
        marginBottom={1}
        style={{ height: "2px", backgroundColor: "#F39200" }}
      ></Box>
      <Typography variant="h3" align="center" mb={4} fontWeight={"bold"}>Nouveaux Produits</Typography>
      <Grid
        container
        spacing={4}
        classes={{ paper: classes.drawerContainer }}
        display="flex"
      >
        {produit.map((prod) => (
          <Grid item xs={12} sm={6} md={2.4}>
            <Card
              sx={{ height: 200, width: 250, paddingBottom: 4 }}
              key={prod._id}
            >
              <Box sx={{ position: "relative" }}>
                <Badge
                  sx={{
                 
                    color:"#ff3a31",
                  
                    width: 50,
                    height: 30,
                    position: "absolute",
                    top: "15px",
                    right: 220,
              
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    "& .MuiBadge-badge": {
                        fontSize: "25px",
                        fontWeight:"bold"
                      },
                  }}
                  badgeContent="New"
                ></Badge>

                <CardMedia
                  sx={{ height: 140 }}
                  image={"http://localhost:3001/products/" + prod.imageCover}
                />
              </Box>
              <CardContent>
                <Typography 
                align="center"
                  gutterBottom
                  variant="h6"
                  fontSize="23px"
                  component="div"
                >
                  {prod.name}
                </Typography>
                <Typography variant="h6" color="#0049F2"
                align="center"
               
                >
                  {prod.nouveauprix} DA
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box display={"flex"} justifyContent="center">
      <Link
                    variant="button"
                    underline="always"
                    fontSize="20px"
                    sx={{
                      
                      paddingLeft: 3,
                      paddingRight: 3,
                      paddingTop: 2,
                      ":hover": { color: "#F39200" },
                    }}
                    onClick={() => history.push("/produits")}
                  >
                  Voir Plus
                  </Link>
      </Box>
    </>
  );
}
