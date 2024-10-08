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
  Alert,
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

import { makeStyles } from "@mui/styles";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import casque from "../images/casque.png";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import AddBusinessRoundedIcon from "@mui/icons-material/AddBusinessRounded";
import heartplus from "../icons/heart.png";
import { AddProduct } from "../components/addProduct";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowBack from "@mui/icons-material/ArrowBack";
export default function Produits(props) {
  const drawerWidth = 240;
  const useStyles = makeStyles({
    drawerContainer: {
      overflow: "hidden",
      "&::-webkit-scrollbar": {
        display: "none",
      },
    },
  });
  const [catClicked, setCatClicked] = useState(false);
  const [categorie, setCategorie] = useState([]);
  const [produit, setProduit] = useState([]);
  const [catName, setCatName] = useState("");
  const [catProd, setCatProd] = useState([]);
  const [prodDetaile, setProdDetail] = useState("");
  const [fournisseur, setFrounisseur] = useState({});
  const [formattedDate, setFormatedDate] = useState();
  const [images, setImages] = useState([]);
  const [imageCover, setImageCover] = useState("");
  const [panierProduct, setPanierProduct] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [type, setType] = useState(localStorage.getItem("type"));
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [ajoutTerminer,setAjouotTerminer]=useState(false);
  const [showAlert, setShowAlert] = useState(false);// produit ajouter
  const [showAlert2, setShowAlert2] = useState(false);// favorie ajouter
  const [showAlert3, setShowAlert3] = useState(false);//favorie existe dija
  const [shouldUpdate, setShouldUpdate] = useState(false);
   const[favCount,setFavCount]=useState();


  useEffect(() => {
    getCategorie();
    getProduits();
    getAllFavoris();
    if (
      localStorage.getItem("type") === "Fournisseurs" ||
      localStorage.getItem("type") === "Admin"
    ) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }


  }, [shouldUpdate]);




  ////////////////////props handler des donne envoyer des child component //////////////////////
  const updatedPanierProduct = (newCartData) => {
    setPanierProduct(newCartData);
  };
  const addedProduct = (bienAjouter) => {
    if(bienAjouter===true){
      setAjouotTerminer(true);
      setShouldUpdate(true)
      handleClose2();
      setShowAlert(true);
      setCatClicked(false);
  setTimeout(() => {
    setShowAlert(false);
  }, 4000);
    }
     
  }

  //////////////////////dialogue ditail produit open close functions////////////////////////
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  /////////////////////////dialogue Ajout Produit open close function///////////////
  const handleOpen2 = () => {
    setOpen2(true);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };
  ////////////////////////http req Ajouter Favorie heart icon Click////////////////////////////////
  const AddFavorie = async (prodId) => {
    
    try {
       const authToken = "Bearer " + localStorage.getItem("token");
        const user=localStorage.getItem("userId")
      const response = await fetch(
        "http://localhost:3001/api/v1/favoris",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: authToken,
          },
         body: JSON.stringify({user: user,product:prodId})
        }
      );
      const data = await response.json();
      if (response.ok) {
       console.log(data);
       setShowAlert2(true);
   setTimeout(() => {
     setShowAlert2(false);
   }, 3000);
     
      } else {
        console.log(data);
        setShowAlert3(true);
        setTimeout(() => {
          setShowAlert3(false);
        }, 3000);
      }
    } catch (error) {
      console.error(error);
    }
  };
//////////////////////////recupiration des favories pour le badge : count favories////////////////////////
const getAllFavoris = async () => {

  try {
    const authToken = "Bearer " + localStorage.getItem("token");
   const response = await fetch(
     "http://localhost:3001/api/v1/favoris",
     {
       method: "GET",
       headers: {
         Authorization: authToken,
       },
      
     }
   );
   const data = await response.json();
   if (response.ok) {
    console.log(data);
    setFavCount(data.length)
    console.log(data.length)
   } else {
     console.log(data);
   }
 } catch (error) {
   console.error(error);
 }
};


  ////////////////recupere detail d'un produit par _id on Product clicked/////////////////

  const handleShowProduct = async (prodId) => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/products/" + prodId,
        {
          method: "GET",
          headers: {
            "Cache-Control": "no-cache",
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setProdDetail(data.data);
        setFrounisseur(data.data.fournisseur);
        setImages(data.data.images);
        setImageCover(data.data.imageCover);
        const date = new Date(data.data.createdAt);
        const options = {
          year: "numeric",
          month: "long",
          day: "numeric",
        };
        setFormatedDate(date.toLocaleDateString("en-US", options)); //recupere la date d'ajout format mounth day year
        handleOpen();
      } else {
        console.log(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  /////////////////////http requeste :recuperer les produit d'un categorie specefice onCatClicked////////////////////
  const getCatProduct = async (catId) => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/products/categories/" + catId,
        {
          method: "GET",
          headers: {
            "Cache-Control": "no-cache",
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setCatProd(data.data);
      } else {
        console.log(data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  ////////////////////http request :recupere les categories existantes////////////////////////
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
  ////////////////////////////recuperer les Produits de dernier Ajouter reverse get product////////////////////
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
        setProduit(data.data.reverse());
      } else {
        console.log(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const classes = useStyles(); ///////Make Style for the drawer bcz the sx is not working

  return (
    <>
      <Header
        cartData={panierProduct}
        updatedPanierProduct={updatedPanierProduct}
        favoriCount={favCount}
      />
     
      <Grid container>
        <Grid item xs={6} md={1}>
          <Drawer
            anchor="left"
            variant="permanent"
            open={true}
            classes={{ paper: classes.drawerContainer }}
          >
            <Box sx={{ paddingTop: "80px" }}></Box>

            <Box
              position={"sticky"}
              border={1}
              borderColor="black"
              height="35px"
              width="215px"
              display="flex"
              paddingLeft="10px"
              justifyContent={"center"}
              marginLeft="10px"
              marginRight={"10px"}
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
            <List>
              {categorie.map((cat) => (
                <ListItem key={cat._id} disableGutters disablePadding>
                  <ListItemButton
                    onClick={() => {
                      setCatClicked(true);
                      localStorage.setItem("catId", cat._id);
                      getCatProduct(cat._id);
                      setCatName(cat.name);
                    }}
                    sx={{
                      marginTop: "3px",
                      backgroundColor: "#fafcfb",
                      ":hover": { backgroundColor: "#F39200" },
                    }}
                  >
                    <ListItemText primary={cat.name} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Drawer>
        </Grid>
        <Grid item xs={6} md={11}>
          <Grid display={"flex"}>
            <Grid item>
              <Box width={150}></Box>
            </Grid>

            <Grid item marginTop={10}>
              {catClicked ? (
                <>
                  {" "}
                  <Grid container display={"flex"} spacing={4} fullWidth>
                    <Grid item item xs={12} md={6} lg={6}>
                      <Box display={"flex"} width={900}>
                        <IconButton
                          onClick={() => {
                            setCatClicked(false);
                          }}
                        >
                          <ArrowBack
                            sx={{
                              color: "black",
                              fontSize: "30px",
                              marginBottom: "5px",
                            }}
                          />
                        </IconButton>
                        <Typography variant="h4">{catName}</Typography>
                      
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                      {localStorage.getItem("type") === "Fournisseurs" || localStorage.getItem("type") === "Admin" ? (
                        <Button
                          variant="contained"
                          sx={{
                            height: "50px",
                            paddingLeft: "15px",
                            paddingRight: "15px",
                            borderRadius: "15px",
                            backgroundColor: "#0049f2",
                            margin: "0px 10px 20px 250px",
                          }}
                          onClick={() => {
                            handleOpen2();
                          }}
                        >
                          Ajouter Produits
                          <AddBusinessRoundedIcon
                            sx={{ marginLeft: "10px", fontSize: "20px" }}
                          />
                        </Button>
                      ) : (
                        <></>
                      )}
                    </Grid>
                  </Grid>
                 
                  <Grid
                    container
                    spacing={4}
                    //classes={{ paper: classes.drawerContainer }}
                    display="flex"
                  >
                    {catProd.map((prod) => (
                      <Grid item xs={12} sm={6} md={6} lg={3}>
                        <Card
                          sx={{ height: 300, width: 250, paddingBottom: 5 ,}}
                          key={prod._id}
                        >
                          <CardMedia
                            sx={{ height: 140 }}
                            image={
                              "http://localhost:3001/products/" +
                              prod.imageCover
                            }
                            onClick={() => {
                              handleShowProduct(prod._id);
                            }}
                          />
                          <CardContent
                            onClick={() => {
                              handleShowProduct(prod._id);
                            }}
                          >
                            <Typography
                              gutterBottom
                              variant="h6"
                              fontSize={17}
                              component="div"
                              align="center"
                              fontSize="23px"
                            >
                              {prod.name}
                            </Typography>
                          <Typography variant="h6" align="center"  sx={{
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    bottom:15,
                   
                    width: '80px',
                    height: '2px',
                    backgroundColor: 'red',
                  },
                }}>
                            {prod.ancienprix} DA
                            </Typography>

                            <Typography variant="h6" align="center" color="#0049F2">
                              {prod.nouveauprix} DA
                            </Typography>
                            
                          </CardContent>
                          <CardActions>
                            {prod.quantite <= 0 ? (
                              <Button
                                sx={{
                                  paddingLeft: "15px",
                                  paddingRight: "15px",
                                  borderRadius: "15px",
                                  backgroundColor: "gray",
                                }}
                                disabled={true}
                              >
                                terminer
                              </Button>
                            ) : (
                              <Button
                                variant="contained"
                                sx={{
                                  paddingLeft: "15px",
                                  paddingRight: "15px",
                                  borderRadius: "15px",
                                  backgroundColor: "#0049f2",
                                }}
                                disabled={isDisabled}
                                onClick={() => {
                                  setPanierProduct([...panierProduct, prod]);
                                  setPanierProduct((prevPanier) =>
                                    prevPanier.filter(
                                      (obj, index, self) =>
                                        index ===
                                        self.findIndex((o) => o._id === obj._id)
                                    )
                                  );
                                  setPanierProduct((prevPanier) =>
                                    prevPanier.map((product) => {
                                      if (product._id === prod._id) {
                                        return { ...product, quantity: 1 };
                                      }
                                      return product;
                                    })
                                  );
                                }}
                              >
                                Ajouter
                                <AddShoppingCartOutlinedIcon
                                  sx={{ marginLeft: "10px", fontSize: "20px" }}
                                />
                              </Button>
                            )}

                            <Box
                              display="flex"
                              justifyContent="end"
                              sx={{ marginLeft: 10 }}
                            >
                              <IconButton
                              disabled={isDisabled}
                              onClick={()=>{AddFavorie(prod._id)}}
                              >
                                <FontAwesomeIcon
                                  icon={faHeartCirclePlus}
                                  style={{ color: "#949494" }}
                                />
                              </IconButton>
                            </Box>
                          </CardActions>
                        </Card>
                        <>
                          <Box></Box>
                        </>
                      </Grid>
                    ))}
                  </Grid>
                </>
              ) : (
                <>
                  <Grid container display={"block"}>
                    <Grid item xs={12} md={12} display={"flex"}>
                      <Grid item xs={6} md={6} sm={6}>
                         <Typography variant="h4" >Nouveaux </Typography>
                      </Grid>
                      <Grid item xs={6} md={6} sm={6} display="flex" justifyContent={"center"}>
                       {showAlert && (
                    <Box display="flex" justifyContent="right" marginBottom={2}>
                     <Alert variant="filled" severity="success">Produit Ajouter avec succes</Alert>
                      </Box>
                      )}
                      {showAlert2 && (
                    <Box display="flex" justifyContent="right" marginBottom={2}>
                     <Alert variant="filled" severity="success">Produit Ajouter au Favorie</Alert>
                      </Box>
                      )}
                      {showAlert3 && (
                    <Box display="flex" justifyContent="right" marginBottom={2}>
                     <Alert variant="filled" severity="error">Produit existe dans vos favoris</Alert>
                      </Box>
                      )}
                      </Grid>
                     
                      </Grid>
                      {localStorage.getItem("type") === "Fournisseurs" || localStorage.getItem("type") === "Admin" ?(
                       <>
                       <Grid item xs={12} md={12} sm={12}>
                          <Typography variant="body1" mb="20px"  align="left">selctioner une categorie pour Ajouter </Typography>
                        </Grid>
                      </>
                      ):(
                        <></>
                      )}
                   </Grid>
                    <Grid
                    container
                    spacing={4}
                    classes={{ paper: classes.drawerContainer }}
                    display="flex"
                  >
                    {produit.map((prod) => (
                      <Grid item xs={12} sm={6} md={3}>
                        <Card
                          sx={{ height: 300, width: 250, paddingBottom: 5 }}
                          key={prod._id}
                        >
                          <CardMedia
                            sx={{ height: 140 }}
                            image={
                              "http://localhost:3001/products/" +
                              prod.imageCover
                            }
                            onClick={() => {
                              handleShowProduct(prod._id);
                            }}
                          />
                          <CardContent
                            onClick={() => {
                              handleShowProduct(prod._id);
                            }}
                          >
                            <Typography
                            align="center"
                              gutterBottom
                              variant="h6"
                              fontSize="23px"
                              component="div"
                            >
                              {prod.name}
                            </Typography>
                              <Typography variant="h6"
                               sx={{
                                position: 'relative',
                                '&::before': {
                                  content: '""',
                                  position: 'absolute',
                                  bottom:15,   
                                  width: '80px',
                                  height: '2px',
                                  backgroundColor: 'red',
                                },
                              }} align="center" color="text.secondary">
                            {prod.ancienprix} DA
                            </Typography>
                            <Typography variant="h6" align="center" color="#0049f2">
                              {prod.nouveauprix} DA
                            </Typography>
                          
                          </CardContent>
                          <CardActions>
                            {prod.quantite <= 0 ? (
                              <Button
                                sx={{
                                  paddingLeft: "15px",
                                  paddingRight: "15px",
                                  borderRadius: "15px",
                                  backgroundColor: "gray",
                                }}
                                disabled={true}
                              >
                                terminer
                              </Button>
                            ) : (
                              <Button
                                variant="contained"
                                sx={{
                                  paddingLeft: "15px",
                                  paddingRight: "15px",
                                  borderRadius: "15px",
                                  backgroundColor: "#0049f2",
                                }}
                                disabled={isDisabled}
                                onClick={() => {
                                  console.log(isDisabled);
                                  setPanierProduct([...panierProduct, prod]);
                                  setPanierProduct((prevPanier) =>
                                    prevPanier.filter(
                                      (obj, index, self) =>
                                        index ===
                                        self.findIndex((o) => o._id === obj._id)
                                    )
                                  );
                                  setPanierProduct((prevPanier) =>
                                    prevPanier.map((product) => {
                                      if (product._id === prod._id) {
                                        return { ...product, quantity: 1 };
                                      }
                                      return product;
                                    })
                                  );
                                }}
                              >
                                Ajouter
                                <AddShoppingCartOutlinedIcon
                                  sx={{ marginLeft: "10px", fontSize: "20px" }}
                                />
                              </Button>
                            )}

                            <Box
                              display="flex"
                              justifyContent="end"
                              sx={{ marginLeft: 10 }}
                            >
                              <IconButton
                               disabled={isDisabled}
                               onClick={()=>{AddFavorie(prod._id)}}>
                                <FontAwesomeIcon
                                  icon={faHeartCirclePlus}
                                  style={{ color: "#949494" }}
                                />
                              </IconButton>
                            </Box>
                          </CardActions>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleClose} maxWidth="md">
        <Box display={"flex"}>
          <DialogTitle>Detaille Produit</DialogTitle>
          <DialogActions sx={{ height: "20px", marginLeft: 65 }}>
            <IconButton>
              <CancelRoundedIcon
                onClick={() => {
                  handleClose();
                }}
              />
            </IconButton>
          </DialogActions>
        </Box>
        <Box sx={{ height: "3px", backgroundColor: "#F39200" }}></Box>
        <DialogContent sx={{ width: "700px", height: "700px" }}>
          <Box display={"block"}>
            <Grid container display={"flex"}>
              <Grid item md={6} xs={6} sm={6} display="inline-block">
                <Box display="flex">
                  <img
                    src={"http://localhost:3001/products/" + imageCover}
                    height="250"
                    width={300}
                  />
                </Box>
                <Box display={"flex"}>
                  {images.map((image, index) => (
                    <img
                      src={"http://localhost:3001/products/" + image}
                      height="90"
                      width="90"
                      key={index}
                      style={{ marginTop: "5px", marginRight: "5px" }}
                      onClick={() => {
                        {
                          setImages(images.splice(index, 1));
                          setImages([...images, imageCover]);
                          setImageCover(image);
                        }
                      }}
                    />
                  ))}
                </Box>
              </Grid>
              <Grid item md={6} xs={6} sm={6}>
                <Box display={"block"} pl={1}>
                  <Typography variant="h3">{prodDetaile.name}</Typography>
            
                  <Typography variant="body2" fontWeight="bold">
                    {prodDetaile.description}
                  </Typography>
                  <Box display={"block"} m={1}>
                  
                  <Typography variant="h6" 
                   sx={{
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    bottom:15,
                   
                    width: '80px',
                    height: '2px',
                    backgroundColor: 'red',
                  },
                }}>
                   {prodDetaile.ancienprix} DA
                  </Typography>
                 <Typography variant="h6" fontWeight="bold"  color="#0049F2">
                    {prodDetaile.nouveauprix} DA
                  </Typography>

                  </Box>
                 
                  <Box display={"flex"} justifyContent="left" alignContent={"left"} alignItems={"left"} pt={4}>
                    {prodDetaile.quantite <= 0 ? (
                      <Button
                        sx={{
                          paddingLeft: "15px",
                          paddingRight: "15px",
                          borderRadius: "15px",
                          backgroundColor: "gray",
                        }}
                        disabled={true}
                      >
                        terminer
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        sx={{
                          height:"40px",
                          width:"150px",
                          paddingLeft: "15px",
                          paddingRight: "15px",
                          borderRadius: "15px",
                          backgroundColor: "#0049f2",
                        }}
                        disabled={isDisabled}
                        onClick={() => {
                          setPanierProduct([...panierProduct, prodDetaile]);
                          setPanierProduct((prevPanier) =>
                            prevPanier.filter(
                              (obj, index, self) =>
                                index ===
                                self.findIndex((o) => o._id === obj._id)
                            )
                          );
                          setPanierProduct((prevPanier) =>
                            prevPanier.map((product) => {
                              if (product._id === prodDetaile._id) {
                                return { ...product, quantity: 1 };
                              }
                              return product;
                            })
                          );
                          console.log(panierProduct);
                        }}
                      >
                        Ajouter
                        <AddShoppingCartOutlinedIcon
                          sx={{ marginLeft: "10px", fontSize: "20px" }}
                        />
                      </Button>
                    )}

                    <Box
                      display="flex"
                      justifyContent="end"
                      sx={{ marginLeft: 4 }}
                    >
                      <IconButton
                       disabled={isDisabled}
                       onClick={()=>{AddFavorie(prodDetaile._id)}}>
                        <FontAwesomeIcon
                          icon={faHeartCirclePlus}
                          style={{ color: "#949494" }}
                        />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Box display={"block"} paddingTop="20px">
              <Typography variant="body1" marginTop={"25px"}>
                Deposer par : {fournisseur.nom} {fournisseur.prenom}
              </Typography>
              <Typography variant="body1" marginTop={"3px"}>
                Date:
                {formattedDate}
              </Typography>
              <Box display={"flex"}>
                <Typography variant="body1" marginRight={"20px"}>
                  Telephone:
                  <Link
                    href="#"
                    underline="hover"
                    color={"gray"}
                    fontSize="14px"
                    sx={{
                      ":hover": { color: "#F39200" },
                    }}
                  >
                    {fournisseur.numtel}
                  </Link>
                </Typography>
                <Typography variant="body1">
                  Email:
                  <Link
                    href="#"
                    underline="hover"
                    color={"gray"}
                    fontSize="14px"
                    sx={{
                      ":hover": { color: "#F39200" },
                    }}
                  >
                    {fournisseur.email}
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
      <Dialog open={open2} onClose={handleClose2} maxWidth="md">
        <Box display={"flex"}>
          <DialogTitle>Ajouter Produit en {catName}</DialogTitle>
          <DialogActions
            sx={{ height: "20px", marginRight: 0, marginLeft: 40 }}
          >
            <IconButton>
              <CancelRoundedIcon
                onClick={() => {
                  handleClose2();
                }}
              />
            </IconButton>
          </DialogActions>
        </Box>
        <Box mb={2} sx={{ height: "2px", backgroundColor: "#F39200" }}></Box>
        <DialogContent>
          <AddProduct envoyerAcat={addedProduct}/>
        </DialogContent>
      </Dialog>
    </>
  );
}
