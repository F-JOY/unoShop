import { Grid, Typography,Box, TextField,InputLabel, Button, Table,IconButton,DialogContent,Dialog,DialogActions, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Drawer, } from "@mui/material";
import React, { useEffect, useState } from "react";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import AddIcon from '@mui/icons-material/Add';
export const AdminCategoies=()=>{
    const [categories,setCategories]=useState([]);
    const [shouldUpdate, setShouldUpdate] = useState(false);
    const [catName,setCateName]=useState("");
    const [modifyClicked,setModifyClicked]=useState(false);
    const [deletClicked,setDeletClicked]=useState(false);
    const [catId,setCatId]=useState('');
    const [open, setOpen] = useState(false);
useEffect(()=>{
    getCategories();
},[shouldUpdate])
///////////////////////////dialogue ///////////////////////////
const handleOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setCateName('');
  setModifyClicked(false);
  setDeletClicked(false);
  setOpen(false);
};

/////////////////recuperation des categories///////////////////////////
    const getCategories = async () => {
        try {
          const response = await fetch("http://localhost:3001/api/v1/categories", {
            method: "GET",
            headers: {
              "Cache-Control": "no-cache",
            },
          });
          const data = await response.json();
          if (response.ok) {
            setCategories(data);
        
          } else {
            console.log(data);
          }
        } catch (error) {
          console.error(error);
        }
      }; 
  ///////////////////////////traitement de la date///////////////////////
  const dateChanger = (createDate) => {
    const date = new Date(createDate);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };
  ////////////////////////////Ajouter categorie/////////////////////////////////////////
  const createCategorie = async () => {
    const authToken = "Bearer " + localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:3001/api/v1/categories", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: authToken,
          },
          body: JSON.stringify({name: catName})
          
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        setShouldUpdate(!shouldUpdate);
        setCateName('')
        handleClose();
      } else {
        console.log(data);
      }
    } catch (error) {
      console.error(error);
    }
  }; 
//////////////////////////////////Modifier Categorie/////////////////////////
const updateCategorie = async () => {
  const authToken = "Bearer " + localStorage.getItem("token");
  try {
    const response = await fetch("http://localhost:3001/api/v1/categories/"+catId, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json",
          Authorization: authToken,
        },
        body: JSON.stringify({name: catName})
        
    });
    const data = await response.json();
    if (response.ok) {
      console.log(data);
      setShouldUpdate(!shouldUpdate);
      setCateName('');
      setModifyClicked(false);
      handleClose();
    } else {
      console.log(data);
    }
  } catch (error) {
    console.error(error);
  }
}; 
//////////////////////////////delete categorie/////////////////////
const deleteCategorie = async () => {
  const authToken = "Bearer " + localStorage.getItem("token");
  try {
    const response = await fetch("http://localhost:3001/api/v1/categories/"+catId, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json",
          Authorization: authToken,
        }, 
    });
    
      setShouldUpdate(!shouldUpdate);
      setDeletClicked(false);
      handleClose();
    
  } catch (error) {
    console.error(error);
  }

}

    return(
    <>  
     <Box height={"10px"}></Box>
    <Grid container display={"block"} 
         > 
          <Box display="flex" justifyContent="right">
              <Button variant="contained"  
            sx={{ marginBottom:"10px",
                  marginRight:"30px",
                 paddingLeft: "15px",
                 paddingRight: "15px",
                 borderRadius: "10px",
                 backgroundColor: "#0049f2",
              height:"40px",
            }}
            onClick={handleOpen}
            >Ajouter
            <AddIcon/>
            </Button>
        
          </Box>
         


       
        <Grid item >
       
        <Table>
        <TableHead>
          <TableRow sx={{ borderBottom:"solid" ,borderBottomWidth:"2px",borderBottomColor:"#F39200" }}>
          <TableCell align="center" sx={{ fontSize: "20px" }}>
             Num
            </TableCell>
            <TableCell align="center" sx={{ fontSize: "20px" }}>
             Nom
            </TableCell>
            <TableCell align="center" sx={{ fontSize: "20px" }}>
              Date Creation
            </TableCell>
            <TableCell  align="center" sx={{ fontSize: "20px" }}>
              Date mise a jour
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((cat, index) => (
            <TableRow key={index} sx={{ borderBottom: "solid" , borderBottomWidth:"2px" }}>
              <TableCell align="center">{index+1}</TableCell>
              <TableCell align="center">{cat.name}</TableCell>
              <TableCell align="center">{dateChanger(cat.createdAt)}</TableCell>
              <TableCell align="center">{dateChanger(cat.updatedAt)}</TableCell>
              <TableCell align="center"><Button variant="contained" sx={{backgroundColor: "#0049f2",width:"10px",fontSize:"10px"}}
              onClick={()=>{setModifyClicked(true);setCateName(cat.name);setCatId(cat._id);handleOpen()}}
              >Modifier</Button></TableCell>   
              <TableCell align="center" ><Button variant="contained" sx={{backgroundColor: "#ff3a31",width:"10px",fontSize:"10px"}}
               onClick={()=>{setDeletClicked(true);setCateName(cat.name);setCatId(cat._id);handleOpen()}}
              >supprimer</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

        </Grid>

    </Grid>
    <Dialog open={open} onClose={handleClose} maxWidth="md">
          <DialogActions sx={{ height: "20px" }}>
            <IconButton>
              <CancelRoundedIcon onClick={handleClose} />
            </IconButton>
          </DialogActions>
          {modifyClicked == true ? (
            <DialogContent >
             <Box display="flex" justifyContent="right" alignItems="end">
                <Box display="block">   
                 <Typography variant="h4" mb={3}>Modifier categorie</Typography>
                <TextField
                label="Name"
                value={catName}
          
               sx={{mr:"10px",}}
                  onChange={(e) => setCateName(e.target.value)}
                />
                  </Box>
                 
              
               <Button variant="contained"  
                sx={{ marginBottom:"10px",
                     paddingLeft: "15px",
                     paddingRight: "15px",
                     borderRadius: "10px",
                     backgroundColor: "#0049f2",
                  height:"40px",
                }}
                onClick={updateCategorie}
                >Modifier</Button>
               
             </Box>  
            </DialogContent>
          ) : (deletClicked?(
            <DialogContent>
               <Box display="bolck">
              <Typography variant="body1">voullez vous vriment supprimer cette categorie
              {catName}</Typography>
              <Typography variant="h6" align="center" fontWeight={"bold"} color={""}>{catName}</Typography>
              <Box display="flex" justifyContent="Right" marginTop={3}>
                <Button  variant="contained" sx={{backgroundColor:"gray",marginRight:"10px"}}
                onClick={()=>{handleClose()}}
                >non</Button>
                <Button  variant="contained" sx={{backgroundColor:"#ff3a31",marginLeft:"10px"}} 
                 onClick={()=>{deleteCategorie()}}
                 >oui</Button>
              </Box>
              </Box>
            </DialogContent>
             
          ):(
            <DialogContent>
              <Box display="flex" justifyContent="center">
            <Box display="block">   
             <Typography variant="h4">Ajouter categorie</Typography>
            <TextField
            label="Name"
            value={catName}
      
           sx={{m:"2px",mr:"10px",}}
              onChange={(e) => setCateName(e.target.value)}
            />
              </Box>
             
          
           <Button variant="contained"  
            sx={{ marginBottom:"10px",
                 paddingLeft: "15px",
                 paddingRight: "15px",
                 borderRadius: "10px",
                 backgroundColor: "#0049f2",
              height:"40px",
            }}
            onClick={createCategorie}
            >Ajouter</Button>
           
         </Box>  

            </DialogContent>
          ) 
            
          )}
        </Dialog>
    </>
    );
}