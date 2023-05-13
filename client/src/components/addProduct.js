import { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  InputLabel,
  MenuItem,
  Select,
  Alert,
} from "@mui/material";

export const AddProduct = (props) => {
  const [name, setName] = useState("");
  const [nouveauprix, setnouveauprix] = useState("");
  const [ancienprix, setancienprix] = useState("");
  const [description, setDescription] = useState("");
  const [quantite, setquantite] = useState("");
  const [imageCover, setImageCover] = useState("");
  const [images, setImages] = useState([]);
  const [nbImage, setNbImage] = useState(1);
  const [categorie, setcategorie] = useState(localStorage.getItem("catId"));
  const [fournisseur, setfournisseur] = useState(localStorage.getItem("userId"));
  const [isFormValid, setIsFormValid] = useState(true);
  const [bienAjouter,setbienAjouter]= useState(false);
  const [showAlert, setShowAlert] = useState(false);
  useEffect(() => {}, []);
////////////////////////////////////////verification des champs///////////////

const validateForm = () => {
  let isValid = true;
  if (name.trim() === "") {
    isValid = false;
  }
  if (nouveauprix.trim() === "") {
    isValid = false;
  }
  if (ancienprix.trim() === "") {
    isValid = false;
  }
  if (quantite.trim() === "") {
    isValid = false;
  }
  if (description.trim() === "") {
    isValid = false;
  }
  if (imageCover === undefined || imageCover === null  || imageCover === "" ) {
    isValid = false;
  }
  
  for (let i = 0; i < nbImage; i++) {
    if (images[i] === undefined || images[i] === null||images[i] === "") {
      isValid = false;
      break;
    }
  }
  setIsFormValid(isValid);
  if (!isValid) {
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 2000); 
  }
};


/////////////////recuperation des images//////////////////////////////////
  const handleFileChange = (index, event) => {
    const newImages = [...images];
    newImages[index] = event.target.files[0];
    setImages(newImages);
  };
  const imageFields = Array.from(Array(nbImage)).map((_, index) => (
    <Box key={index} sx={{ paddingBottom: 1 }}>
      <TextField
        fullWidth
        type="file"
        required
        onChange={(event) => handleFileChange(index, event)}
      />
    </Box>
  ));
  


  async function handleaddProduct() {
    
 const url = "http://localhost:3001/api/v1/products";
    const authToken = "Bearer " + localStorage.getItem("token");
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("fournisseur", fournisseur);
    formData.append("categorie", categorie);
    formData.append("nouveauprix", nouveauprix);
    formData.append("ancienprix", ancienprix);
    formData.append("quantite", quantite);
    formData.append("imageCover", imageCover);
    for (const image of images) {
      formData.append("images", image);
    }
   
    try {
      const response = await fetch("http://localhost:3001/api/v1/products", {
        method: "POST",
        headers: {
             Authorization: authToken,
        },
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        console.log("produit Ajouter");
       setbienAjouter(true);
       props.envoyerAcat(true);
      } else {
        
        console.log("creation échouée");
        console.log(data);
        
      }
    } catch (error) {
      console.log(error);
      setIsFormValid(false)
    }
    
   
  }

  return (
    <>
    
      <Box display={"flex"} justifyContent={"center"}>
        <form>
       
          <Box mb={2}>
            <TextField
             type={"text"}
              label="Nom"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              required
            />
          </Box>
          <Box display={"flex"} justifyContent={"center"}>
            <Box mb={2} mr={1}>
              <TextField
               type={"number"}
                label="Prix Nouveau"
                value={nouveauprix}
                onChange={(e) => setnouveauprix(e.target.value)}
                fullWidth
                required
              />
            </Box>
            <Box mb={2} ml={1}>
              <TextField
              type={"number"}
                label="Prix Ancien"
                value={ancienprix}
                onChange={(e) => setancienprix(e.target.value)}
                fullWidth
                required
              />
            </Box>
            <Box mb={2} ml={2}>
              <TextField
              type={"number"}
                label="Quantité"
                value={quantite}
                onChange={(e) => setquantite(e.target.value)}
                fullWidth
                required

              />
            </Box>
           
          </Box> 
          {showAlert && (
        <Box display="flex" justifyContent="center" mt={2}>
          <Alert severity="error">Veuillez saisir tous les champs obligatoires</Alert>
        </Box>
      )}
          <Box mb={2}>
            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              multiline
              rows={4}
              required
            />
          </Box>

          <Box mb={2} display="block">
            <InputLabel>Image Principale</InputLabel>
            <TextField
              type="file"
              fullWidth
              required
              onChange={(e) => setImageCover(e.target.files[0])}
            />
          </Box>

          <Box display={"block"}>
            <Box display={"flex"}>
              <Select
                labelId="nbImage"
                id="nbImage"
                value={nbImage}
                label="Ajouter image"
                onChange={(event) => setNbImage(event.target.value)}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
              </Select>
              <InputLabel sx={{ paddingTop: 1.5, paddingLeft: 1 }}>
                Images discriptive
              </InputLabel>
            </Box>
            <Box display={"block"}>{imageFields}</Box>¨
          </Box>

          <Box display={"flex"} justifyContent={"center"}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                 validateForm();
                 if(isFormValid==true){
                  handleaddProduct();
                 }
                
              }}
            >
              Ajouter
            </Button>
          </Box>
         
        </form>
      </Box>
    </>
  );
};
