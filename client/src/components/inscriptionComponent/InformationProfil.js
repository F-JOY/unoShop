import { React, Fragment, useState } from "react";
import {
  Grid,
  TextField,
  Typography,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
  FormControl
} from "@mui/material";

export default function InformationPersonnel(props) {
  const [Category, setCategory] = useState('Client');
  const handleCategoryChange=(Category)=>{
        setCategory(Category);
        
  }
  return (
    <Fragment>
     
      <Grid container spacing={3}>
      <Grid item xs={12}>
          <FormControl>
            <FormLabel>S'inscrire En Tant Que:</FormLabel>
            <RadioGroup
              row
              sx={{height:'20px'}}
              value={Category}
              onChange={(e) => {handleCategoryChange(e.target.value);props.handleTypeChange(e.target.value)}}
            >
              <FormControlLabel
                value="Client"
                label="Client"
                control={<Radio />}
              />
              <FormControlLabel
                value="Fournisseurs"
                label="Fournisseur"
                control={<Radio />}
              />
              <FormControlLabel
                value="Affiliate"
                label="Affiliate"
                control={<Radio />}
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="nom"
            name="nom"
            label="Nom:"
            size="10px"
            fullWidth
            variant="outlined"
            value={props.nom}
            onChange={(e) => props.handleNomChange(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="prenom"
            name="prenom"
            label="Prénom"
            fullWidth
            variant="outlined"
            value={props.prenom}
            onChange={(e) => props.handlePrenomChange(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="address"
            name="address"
            label="Adresse:"
            fullWidth
            variant="outlined"
            value={props.adresse}
            onChange={(e) => props.handleAdresseChange(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="telephone"
            name="telephone"
            label="Numéro Telephone:"
            fullWidth
            variant="outlined"
            value={props.numerotelephone}
            onChange={(e) => props.handleNumeroTelephoneChange(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="numeroccp"
            name="numeroccp"
            label="numero ccp:"
            fullWidth
            variant="outlined"
            value={props.numeroccp}
            onChange={(e) => props.handleNumeroCcpChange(e.target.value)}
          />
        </Grid>
        {Category === 'Fournisseurs' ? (
          <>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="numerorc"
                name="numerorc"
                label="Numéro Registre Commerce(RC):"
                fullWidth
                variant="outlined"
                value={props.numerorc}
                onChange={(e)=> props.handleNumerorcChange(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="numeronif"
                name="numeronif"
                label="Numéro d'Identification Fiscale(NIF):"
                fullWidth
                variant="outlined"
                value={props.numeronif}
                onChange={(e)=> props.handleNumeronifChange(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              sx={{
                height:"2px",
              }}
                required
                id="releverib"
                name="releverib"
                label="Relevé d'Identification Bancaire(RIB):"
                fullWidth
                variant="outlined"
                value={props.releverib}
                onChange={(e)=> props.handleReleveribChange(e.target.value)}
              />
            </Grid>
          </>
        ):(
          <></>
        )}
       
      </Grid>
    </Fragment>
  );
}
