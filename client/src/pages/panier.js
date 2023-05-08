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
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import { width } from "@mui/system";
export const Panier = (props) => {
const [products, setProducts] = useState(props.cartData);
const [countDelet,setCountDelet]=useState(1);
const  type=localStorage.getItem("typeCompt");


  const incrementQuantity = (productId,qnt) => {
    const updatedProducts = products.map((product) => {
      
      if (product._id === productId && product.quantity<qnt) {
        return { ...product, quantity: product.quantity + 1 };
      } else {
        return product;
      }
    });
    setProducts(updatedProducts);
    props.updateCart(updatedProducts);
  };
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

  const removeProduct = (productId) => {
    const updatedProducts = [...products].filter(
      (product) => product._id !== productId
    );
    setCountDelet(countDelet+1)
    setProducts(updatedProducts);
    props.updateCart(updatedProducts);
    props.count(countDelet);
    
  };
 
  const totalPrix = products.reduce((acc, item) => {
    return acc + item.nouveauprix * item.quantity ;
  }, 0);


  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      {products.length === 0 ? (
        <Typography variant="h4" align="center">
          Panier vide
        </Typography>
      ) : (
        <>
          {" "}
          <Grid container display="flex">
            <Grid item md={6}>
              <Box display="block">
              <Typography variant="h5" >
                Mon Panier
              </Typography>
              <Typography variant="body1" >
                Totale Prix : {totalPrix} DA
              </Typography>
              </Box>
             
            </Grid>
            <Grid item md={6} display="flex" AlignContent="end" justifyContent="end" paddingRight="20px">
              <Button
                variant="contained"
                sx={{
                  height :"35px",
                  paddingLeft: "15px",
                  paddingRight: "15px",
                  borderRadius: "15px",
                  backgroundColor: "#0049f2",
                }}
              >
                Acheter
                <InventoryOutlinedIcon
                          fontSize="small"
                          sx={{marginLeft:"4px", color: "white" }}
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
                            incrementQuantity(prod._id,prod.quantite);
                          }}
                        >
                          <AddIcon fontSize="small" sx={{ color: "black" }} />
                        </IconButton>
                      </Box>
                      <Button 
                        variant="contained"
                        sx={{
                          marginLeft:"230px",
    
                          paddingLeft: "15px",
                          paddingRight: "15px",
                          borderRadius: "15px",
                          backgroundColor: "#ff3a31",
                        }}
                        onClick={() => {
                          removeProduct(prod._id);
                          console.log(products)
                        }}
                      >
                        {" "}
                        Supprimer
                        <DeleteOutlineIcon
                          fontSize="small"
                          sx={{ color: "white",marginBottom:"3px" }}
                        />
                      </Button>
                    </Box>
                  </CardContent>
                </Box>
              </Card>
            ))}
          </Box>
        </>
      )}
    </Box>
  );
};
