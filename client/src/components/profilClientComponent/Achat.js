import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  Typography,
} from "@mui/material";

export const Achat = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    getUserOrders();
  }, []);
  //////////////////////////get user orders////////////////////////
  const getUserOrders = async () => {
    try {
      const authToken = "Bearer " + localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:3001/api/v1/order/orderbyusers",
        {
          method: "GET",
          headers: {
            Authorization: authToken,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        console.log("orders seccusfuly gotten");
        console.log(data);
        setOrders(data.orders);
        /*     const orderItems = data.orders.map(order => order.orderItems);
      setOrderItems(prevOrderItems => [...prevOrderItems, ...orderItems]);*/
      } else {
        console.log(data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  ////////////////////Modifier La date de creation de la commande//////////////////////////
  const dateChanger = (createDate) => {
    const date = new Date(createDate);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: "25px" }} align="center">
                Produits
              </TableCell>
              <TableCell sx={{ fontSize: "25px" }} align="center">
                PrixTotal
              </TableCell>
              <TableCell sx={{ fontSize: "25px" }} align="center">
                Date
              </TableCell>
              <TableCell sx={{ fontSize: "25px" }} align="center">
                État
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order, index) => (
              <TableRow key={index} sx={{ borderBottom: "solid" , borderBottomWidth:"2px" }}>
                <TableCell>
                  {order.orderItems.map((item, key) => (
                    <Box display="block">
                      <Card sx={{ marginBottom: "3px" }}>
                        <Box display={"flex"}>
                          <img
                            src={
                              "http://localhost:3001/products/" +
                              item.product.imageCover
                            }
                            alt=""
                            width="80"
                          />
                          <Box display={"block"}>
                            <Typography marginLeft={1}>
                              {item.product.name}
                            </Typography>
                            <Box display={"flex"}>
                              <Typography marginLeft={1}>
                                Prix: {item.product.nouveauprix}
                              </Typography>
                              <Typography marginLeft={2}>
                                Quantité: {item.quantite}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </Card>
                    </Box>
                  ))}
                </TableCell>
                <TableCell align="center">{order.prixTotal} DA</TableCell>
                <TableCell align="center">
                  {dateChanger(order.createdAt)}
                </TableCell>
                <TableCell align="center">{order.etat}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
