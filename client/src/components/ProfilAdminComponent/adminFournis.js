import React, { useEffect, useState } from "react";
import {
    Avatar,
    Grid,
    Box,
    Drawer,
    Link,
    Typography,
    Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  } from "@mui/material";
export const AdminFournisseur=()=>{
const [users,setUsers]=useState([]);
const [fournisseurs,setFournisseurs]=useState([]) ;   
useEffect(()=>{
    getUsers();
},[])
//////////////////////////hhttp request to get users and filter the fournisseurs ////////////////////////
const getUsers= async()=>{ 
    try {
        const authToken = "Bearer " + localStorage.getItem("token");
        const response = await fetch(
          "http://localhost:3001/api/v1/users",
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
          console.log("users gotten");
          console.log(data.data);
        setFournisseurs(data.data.filter(user => user.type[0] == "Fournisseurs"));
        } else {
          console.log(data);
        }
      } catch (error) {
        console.error(error);
      }
};
//////////////////////////traitement de ta date d'inscription//////////////////////
const dateChanger = (createDate) => {
    const date = new Date(createDate);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

    return(
        <TableContainer>
        <Table>
        <TableHead>
          <TableRow sx={{ borderBottom:"solid" ,borderBottomWidth:"2px",borderBottomColor:"#F39200" }}>
          <TableCell sx={{ fontSize: "20px" }}>
             Num
            </TableCell>
            <TableCell sx={{ fontSize: "20px" }}>
             Nom Prenom
            </TableCell>
            <TableCell sx={{ fontSize: "20px" }}>
              Adresse
            </TableCell>
            <TableCell sx={{ fontSize: "20px" }}>
              Email
            </TableCell>
            <TableCell sx={{ fontSize: "20px" }}>
             Telephone
            </TableCell>
            <TableCell sx={{ fontSize: "20px" }}>
              NumeroCcp
            </TableCell>
            <TableCell sx={{ fontSize: "20px" }}>
            Date inscription
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fournisseurs.map((fournis, index) => (
            <TableRow key={index} sx={{ borderBottom: "solid" , borderBottomWidth:"2px" }}>
              <TableCell >{index+1}</TableCell>
              <TableCell >{fournis.nom} {fournis.prenom}</TableCell>
              <TableCell >{fournis.adresse}</TableCell>
              <TableCell >{fournis.email}</TableCell>
              <TableCell >{fournis.numtel}</TableCell>
              <TableCell >{fournis.numccp}</TableCell>
              <TableCell > {dateChanger(fournis.createdAt)}</TableCell>
              <TableCell ><Button variant="contained" sx={{width:"10px",fontSize:"10px"}}>Voir_Plus</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    );
}