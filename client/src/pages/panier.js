import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Button,
  InputBase,
  Input,
  Grid,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ArrowDropDownSharpIcon from "@mui/icons-material/ArrowDropDownSharp";
import ArrowDropUpSharpIcon from "@mui/icons-material/ArrowDropUpSharp";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { width } from "@mui/system";
export const Panier = (props) => {
  const [products, setProducts] = useState(props.cartData);
  const [user, setUser] = useState(localStorage.getItem("userId"));
  const [adresse, setAdresse] = useState([]);
  const [telephone, setTelephone] = useState("");
  const authToken = "Bearer " + localStorage.getItem("token");
  const [orderPassed,setOrderPassed]=useState(false);
  const [client ,setClient]=useState([]);
  //////////////////////incrementation de la quntity choisit du produit////////////////////////

  const incrementQuantity = (productId, qnt) => {
    const updatedProducts = products.map((product) => {
      if (product._id === productId && product.quantity < qnt) {
        return { ...product, quantity: product.quantity + 1 };
      } else {
        return product;
      }
    });
    setProducts(updatedProducts);
    props.updateCart(updatedProducts);
  };
  //////////////////////decrementation de la quntity choisit du produit////////////////////////
  const decrementQuantity = (productId) => {
    const updatedProducts = products.map((product) => {
      if (product._id === productId && product.quantity > 0) {
        return { ...product, quantity: product.quantity - 1 };
      } else {
        return product;
      }
    });
    setProducts(updatedProducts);
    props.updateCart(updatedProducts);
  };
  /////////////////////// supprimer un produit de la liste des produit du panier////////////////////
  const removeProduct = (productId) => {
    const updatedProducts = [...products].filter(
      (product) => product._id !== productId
    );

    setProducts(updatedProducts);
    props.updateCart(updatedProducts);
  };
  ////////////////////////////calcule le prix des totale de produit dans le panier////////////////////
  const totalPrix = products.reduce((acc, item) => {
    return acc + item.nouveauprix * item.quantity;
  }, 0);

  //////////////////////redwire les  propriété de liste des produits/////////////
  const orderItems = products.map((prod) => {
    return { product: prod._id, quantite: prod.quantity };
  });
  /////////////////////recuperer Adresse et telephone du user//////////////////
  ///////////////////Asynchronisation functions issus//////////////////////
  /////////////n the use effect hook to set the adresse and telephone whene panier rendered ///////////
  useEffect(() => {
    getUserById(localStorage.getItem("userId"));
  }, []);
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
        setClient(data.data);
        setAdresse(data.data.adresse[0]);
        setTelephone(data.data.numtel);
      } else {
        console.log(data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  ///////////////////////http request for order//////////////////////////////
  const Acheter = async () => {
    try {
      const authToken = "Bearer " + localStorage.getItem("token");
      const requestBody = {
        orderItems: orderItems,
        adresse: adresse,
        telephone: telephone,
        user: user,
      };
      const response = await fetch("http://localhost:3001/api/v1/order", {
        method: "POST",
        headers: {
          "Cache-Control": "no-cache",
          "Content-Type": "application/json",
          Authorization: authToken,
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Order successful");
        setOrderPassed(true);
        setProducts([])
        props.updateCart([]);
        console.log(data);
      } else {
        console.log(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      {products.length === 0 && !orderPassed ? (
        <Typography variant="h4" align="center" >
          Panier vide
        </Typography>
      ):( orderPassed ? (
        <>
        <Typography variant="h4">Commande enregistrer
        </Typography>  
      <CheckCircleIcon sx={{color:"green" ,marginLeft:"10px",marginTop:"20px",fontSize:"60px"}}/>
        <Box sx={{marginRight:"440px",marginTop:"50px"}}>
          <Typography variant="h6" align="left">Client : {client.nom}{client.prenom}</Typography>
          <Typography variant="h6" align="left">Adresse :{adresse}</Typography>
          <Typography  variant="h6" align="left">Telephone :{telephone}</Typography>
        </Box>
         </>
      ):(
      
      

        <>
          {" "}
          <Grid container display="flex">
            <Grid item md={6}>
              <Box display="block">
                <Typography variant="h5">Mon Panier</Typography>
                <Typography variant="body1">
                  Totale Prix : {totalPrix} DA
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              md={6}
              display="flex"
              AlignContent="end"
              justifyContent="end"
              paddingRight="20px"
            >
              <Button
                variant="contained"
                sx={{
                  height: "35px",
                  paddingLeft: "15px",
                  paddingRight: "15px",
                  borderRadius: "15px",
                  backgroundColor: "#0049f2",
                }}
                onClick={() => {
                  Acheter();
                }}
              >
                Acheter
                <InventoryOutlinedIcon
                  fontSize="small"
                  sx={{ marginLeft: "4px", color: "white" }}
                />
              </Button>
            </Grid>
          </Grid>
          <Box sx={{ width: "100%", maxWidth: 800 }}>
            {products.map((prod, index) => (
              <Card
                key={index}
                sx={{ display: "flex", height: 150, margin: 2 }}
              >
                <Box sx={{ display: "flex", flex: 1 }}>
                  <CardMedia
                    component="img"
                    sx={{ width: 150, height: "100%" }}
                    image={"http://localhost:3001/products/" + prod.imageCover}
                  />
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box
                      sx={{ display: "flex", flexDirection: "column", flex: 1 }}
                    >
                      <Typography component="div" variant="h5" sx={{ flex: 1 }}>
                        {prod.name}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        component="div"
                        sx={{ flex: 1 }}
                      >
                        Prix :{prod.nouveauprix}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          width: 120,
                        }}
                      >
                        <IconButton
                          sx={{
                            height: "30px",
                            width: "30px",
                            borderRadius: "50%",
                          }}
                          onClick={() => {
                            decrementQuantity(prod._id);
                          }}
                        >
                          <RemoveIcon
                            fontSize="small"
                            sx={{ color: "black" }}
                          />
                        </IconButton>
                        <Input
                          value={prod.quantity}
                          sx={{
                            width: 30,
                            Align: "center",
                            paddingLeft: 1,
                            color: "black",
                          }}
                          disabled
                        />
                        <IconButton
                          sx={{
                            height: "30px",
                            width: "30px",
                            borderRadius: "50%",
                          }}
                          onClick={() => {
                            incrementQuantity(prod._id, prod.quantite);
                          }}
                        >
                          <AddIcon fontSize="small" sx={{ color: "black" }} />
                        </IconButton>
                      </Box>
                      <Button
                        variant="contained"
                        sx={{
                          marginLeft: "230px",

                          paddingLeft: "15px",
                          paddingRight: "15px",
                          borderRadius: "15px",
                          backgroundColor: "#ff3a31",
                        }}
                        onClick={() => {
                          removeProduct(prod._id);
                          console.log(products);
                        }}
                      >
                        {" "}
                        Supprimer
                        <DeleteOutlineIcon
                          fontSize="small"
                          sx={{ color: "white", marginBottom: "3px" }}
                        />
                      </Button>
                    </Box>
                  </CardContent>
                </Box>
              </Card>
            ))}
          </Box>
        </>
      ))}
    </Box>
  );
};
