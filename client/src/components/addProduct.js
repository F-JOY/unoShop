import { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

export const AddProduct = () => {
  const [name, setName] = useState("");
  const [nouveauprix, setnouveauprix] = useState("");
  const [ancienprix, setancienprix] = useState("");
  const [description, setDescription] = useState("");
  const [quantite, setquantite] = useState("");
  const [imageCover, setImageCover] = useState("");
  const [images, setImages] = useState([]);
  const [nbImage, setNbImage] = useState(1);
  const [categorie, setcategorie] = useState(localStorage.getItem("catId"));
  const [fournisseur, setfournisseur] = useState("userId");
  useEffect(() => {}, []);

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
        onChange={(event) => handleFileChange(index, event)}
      />
    </Box>
  ));

  async function compressFormData(formData) {
    const data = new Blob([formData], { type: "text/plain" });
    const compressedData = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsBinaryString(data);
    });
    return compressedData;
  }

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
    formData.append("images", images);
    const compressedFormData = await compressFormData(formData);
    console.log(compressedFormData);
    try {
      const response = await fetch("http://localhost:3001/api/v1/products", {
        method: "POST",
        headers: {
          Authorization: authToken,
          "Content-Encoding": "gzip", // set content encoding header to gzip
        },
        body: compressedFormData,
      });
      const data = await response.json();
      if (response.ok) {
        console.log("produit Ajouter");
      } else {
        console.log("creation échouée");
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
    
      <Box display={"flex"} justifyContent={"center"}>
        <form>
          <Box mb={2}>
            <TextField
              label="Nom"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
            />
          </Box>
          <Box display={"flex"} justifyContent={"center"}>
            <Box mb={2} mr={1}>
              <TextField
                label="Prix Nouveau"
                value={nouveauprix}
                onChange={(e) => setnouveauprix(e.target.value)}
                fullWidth
              />
            </Box>
            <Box mb={2} ml={1}>
              <TextField
                label="Prix Ancien"
                value={ancienprix}
                onChange={(e) => setancienprix(e.target.value)}
                fullWidth
              />
            </Box>
            <Box mb={2} ml={2}>
              <TextField
                label="Quantité"
                value={quantite}
                onChange={(e) => setquantite(e.target.value)}
                fullWidth
              />
            </Box>
          </Box>
          <Box mb={2}>
            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              multiline
              rows={4}
            />
          </Box>

          <Box mb={2} display="block">
            <InputLabel>Image Principale</InputLabel>
            <TextField
              type="file"
              fullWidth
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
            <Box display={"block"}> {imageFields}</Box>¨
          </Box>

          <Box display={"flex"} justifyContent={"center"}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleaddProduct}
            >
              Ajouter
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
};
