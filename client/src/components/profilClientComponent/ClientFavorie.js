import {
  Grid,
  Typography,
  Box,
  TextField,
  InputLabel,
  Input,
  Button,
  Table,
  IconButton,
  DialogContent,
  Dialog,
  DialogActions,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Drawer,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
export const ClientFavoris = () => {
  const [favoris, setFavoris] = useState([]);//la liste des favories requpere
  const [shouldUpdate, setShouldUpdate] = useState(false);//pour useEffect
  const [favId, setFavId] = useState();
  const [favProd, setFavProd] = useState();
  const [open, setOpen] = useState(false);
  const [AddClicked, setAddClicked] = useState(false);//si  true afficher dialogue Acheter
  const [deletClicked, setDeletClicked] = useState(false);// si tue afficher confirmation de suppression de favorie
  const [orderItem, setorderItem] = useState([]);// l'array qui va contenire le produit et la qnt choisit
  const [produit, setProduit] = useState();///le produit favorie
  const [adresse, setAdresse] = useState([]);
  const [telephone, setTelephone] = useState("");
  const [qntMax,setQntMax]=useState(1);//quantite totale du produit
  const [qnt,setQnt]=useState(1);// quantite de produit saisit par le client
  useEffect(() => {
    getAllFavoris();
    getUserById();
  }, [shouldUpdate]);////s'executer si il ya un changement de shouldUpdate
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setQnt(1);setQntMax(1);
  };
  //////////////////////////http req recupiration des favories////////////////////////
  const getAllFavoris = async () => {
    try {
      const authToken = "Bearer " + localStorage.getItem("token");
      const response = await fetch("http://localhost:3001/api/v1/favoris", {
        method: "GET",
        headers: {
          Authorization: authToken,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setFavoris(data);
      } else {
        console.log(data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  /////////////////////////////////http req delete favorie///////////////////////////////////////////
  const deleteFavoris = async () => {
    try {
      const authToken = "Bearer " + localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:3001/api/v1/favoris/" + favId,
        {
          method: "DELETE",
          headers: {
            Authorization: authToken,
          },
        }
      );
      setShouldUpdate(!shouldUpdate);
      setDeletClicked(false);
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  
  //////////////////////info client pour passer la requette creation de la commande//////////////////////////////////////////////
  const getUserById = async () => {


    try {
      const authToken = "Bearer " + localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:3001/api/v1/users/" + localStorage.getItem("userId"),
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
        setAdresse(data.data.adresse[0]);
        setTelephone(data.data.numtel);
      } else {
        console.log(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //////////////////////http req : passer commande (Acheter le produit favorie)///////////////////////////////////////////////////
  const Acheter = async () => {
   
      const orderItems = [{ product: produit._id, quantite: qnt }]
    try {
      const authToken = "Bearer " + localStorage.getItem("token");
      const requestBody = {
         orderItems: orderItems,
        adresse: adresse,
        telephone: telephone,
        user: localStorage.getItem("useId"),
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
        handleClose();
        deleteFavoris();
        console.log(data);
      } else {
        console.log(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //////////////////////////////////////////////////////////////////////////////
  return (
    <>
      <Box display="flex" justifyContent="center" alignContent={"center"}>
        <Table
          sx={{ width: "800px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)" }}
        >
          <TableHead>
            <TableRow
              sx={{
                borderBottom: "solid",
                borderBottomWidth: "2px",
                borderBottomColor: "#F39200",
              }}
            >
              <TableCell align="center" sx={{ fontSize: "20px" }}>
                num
              </TableCell>
              <TableCell sx={{ fontSize: "20px" }}>Produit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {favoris.map((fav, index) => (
              <TableRow
                key={index}
                sx={{ borderBottom: "solid", borderBottomWidth: "2px" }}
              >
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">
                  <Box display={"flex"}>
                    <img
                      src={
                        "http://localhost:3001/products/" +
                        fav.product.imageCover
                      }
                      alt=""
                      width="80"
                    />
                    <Box display={"block"}>
                      <Typography marginLeft={1}>{fav.product.name}</Typography>

                      <Typography marginLeft={1}>
                        Prix: {fav.product.nouveauprix} DA
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                 
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#0049f2",
                      width: "10px",
                      fontSize: "10px",
                    }}
                    onClick={() => {
                      setFavId(fav._id);
                      handleOpen();
                      setAddClicked(true);
                      setQntMax(fav.product.quantite);
                      setProduit(fav.product);
                    }}
                  >
                    Acheter
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#ff3a31",
                      width: "10px",
                      fontSize: "10px",
                    }}
                    onClick={() => {
                      setFavProd(fav.product.name);
                      setFavId(fav._id);
                      handleOpen();
                      setDeletClicked(true);
                    }}
                  >
                    supprimer
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <Dialog open={open} onClose={handleClose} maxWidth="md">
        <DialogActions sx={{ height: "20px" }}>
          <IconButton>
            <CancelRoundedIcon onClick={handleClose} />
          </IconButton>
        </DialogActions>
        {AddClicked == true ? (
          <DialogContent>
            <Box display="flex" justifyContent="right" alignItems="end">
              <Box display="block">
                <Typography variant="h6" mb={3}  fontWeight={"bold"}>
                  Passer une commande
                </Typography>
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
                         if(qnt>1){setQnt(qnt-1)}
                        }}
                      >
                        <RemoveIcon fontSize="small" sx={{ color: "black" }} />
                      </IconButton>
                      <Input
                        value={qnt}
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
                        onClick={() => {if(qnt<=qntMax){setQnt(qnt+1)}}
                          
                        }
                      >
                        <AddIcon fontSize="small" sx={{ color: "black" }} />
                      </IconButton>
                    </Box>
                  </Box>
              </Box>

              <Button
                variant="contained"
                sx={{
                 
                  paddingLeft: "15px",
                  paddingRight: "15px",
                  borderRadius: "10px",
                  backgroundColor: "#0049f2",
                  height: "40px",
                }}
                 onClick={Acheter}
              >
               Acheter
              </Button>
            </Box>
          </DialogContent>
        ) : deletClicked ? (
          <DialogContent>
            <Box display="bolck">
              <Typography variant="body1">
                voullez vous vraiment supprimer des favoris
              </Typography>
              <Typography variant="h6" align="center" fontWeight={"bold"}>
                {favProd}
              </Typography>
              <Box display="flex" justifyContent="Right" marginTop={3}>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "gray", marginRight: "10px" }}
                  onClick={() => {
                    handleClose();
                  }}
                >
                  non
                </Button>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "#ff3a31", marginLeft: "10px" }}
                  onClick={() => {
                    deleteFavoris();
                  }}
                >
                  oui
                </Button>
              </Box>
            </Box>
          </DialogContent>
        ) : (
          <></>
        )}
      </Dialog>
    </>
  );
};
