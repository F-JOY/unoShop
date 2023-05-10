import { React, useState, Fragment } from "react";
import {
  Typography,
  TextField,
  Checkbox,
  Button,
  Stepper,
  Step,
  StepLabel,
  Container,
  Paper,
  Box,
  CssBaseline,
} from "@mui/material";
import InformationProfil from "../components/inscriptionComponent/InformationProfil";
import InformationBase from "../components/inscriptionComponent/InformationBase";
import DetailsInformation from "../components/inscriptionComponent/DetailsInformation";
import logo from "../images/UnoV4.png";
const steps = [
  "Information De Base",
  "Information Profil",
  "Valider Votre Profil",
];

function getStepContent(step, props) {
  switch (step) {
    case 0:
      return (
        <InformationProfil
          nom={props.nom}
          prenom={props.prenom}
          adresse={props.adresse}
          numeroccp={props.numeroccp}
          numerotelephone={props.numerotelephone}
          numerorc={props.numerorc}
          numeronif={props.numeronif}
          releverib={props.releverib}
          handleTypeChange={props.handleTypeChange}
          handleNomChange={props.handleNomChange}
          handlePrenomChange={props.handlePrenomChange}
          handleAdresseChange={props.handleAdresseChange}
          handleNumeroCcpChange={props.handleNumeroCcpChange}
          handleNumeroTelephoneChange={props.handleNumeroTelephoneChange}
          handleNumerorcChange={props.handleNumerorcChange}
          handleNumeronifChange={props.handleNumeronifChange}
          handleReleveribChange={props.handleReleveribChange}
        />
      );
    case 1:
      return (
        <InformationBase
          email={props.email}
          mdp={props.mdp}
          handleEmailChange={props.handleEmailChange}
          handleMdpChange={props.handleMdpChange}
        />
      );
    case 2:
      return (
        <DetailsInformation
         photodeprofil={props.photodeprofil}
         handlePhotoChange={props.handlePhotoChange}
        />
      );
    default:
      throw new Error("Unknown step");
  }
}

export default function FormInscription(props) {
  const [activeStep, setActiveStep] = useState(0);
  const [email, setEmail] = useState("");
  const [mdp, setMdp] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [adresse, setAdresse] = useState("");
  const [numeroccp, setNumeroCcp] = useState("");
  const [numerorc, setNumeroRc] = useState("");
  const [numeronif, setNumeroNif] = useState("");
  const [releverib, setReleverIb] = useState("");
  const [numerotelephone, setNumeroTelephone] = useState("");
  const [type, setType] = useState("Client");
  const [photodeprofil, setPhotodeprofil] = useState("");
  
  const handleNext = () => {
    if (activeStep == 1 && email != "" && mdp != "") {
      setActiveStep(activeStep + 1);
    }
    if (
      activeStep == 0 &&
      type !="Fournisseurs" &&
      nom != "" &&
      prenom != "" &&
      adresse != "" &&
      numerotelephone != "" &&
      numeroccp != ""
    ) {
      setActiveStep(activeStep + 1);
    }
    if (activeStep == 2) {
      setActiveStep(activeStep + 1);
    }
    if (
      activeStep == 0 &&
      type =="Fournisseurs" &&
      nom != "" &&
      prenom != "" &&
      adresse != "" &&
      numerotelephone != "" &&
      numeroccp != "" &&
      numerorc != ""&&
      numeronif !="" &&
      releverib != ""
    ) {
      setActiveStep(activeStep + 1);
    }

  };
 const handlePhotoChange =(photodeprofil)=>{
  setPhotodeprofil(photodeprofil);

 }
  const handleTypeChange = (type) => {
    setType(type);
  };

  const handleEmailChange = (email) => {
    setEmail(email);
  };

  const handleNomChange = (nom) => {
    setNom(nom);
  };

  const handlePrenomChange = (prenom) => {
    setPrenom(prenom);
  };

  const handleAdresseChange = (adresse) => {
    setAdresse(adresse);
  };

  const handleNumeroCcpChange = (numeroccp) => {
    setNumeroCcp(numeroccp);
  };

  const handleNumeroTelephoneChange = (numerotelephone) => {
    setNumeroTelephone(numerotelephone);
  };

  const handleMdpChange = (mdp) => {
    setMdp(mdp);
  };
  const handleNumerorcChange = (numerorc) => {
    setNumeroRc(numerorc);
  };
  const handleNumeronifChange = (numeronif) => {
    setNumeroNif(numeronif);
  };
  const handleReleveribChange = (releverib) => {
    setReleverIb(releverib);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  const numtel = numerotelephone;
  const password = mdp;
  const numccp = numeroccp;
  const numnif = numeronif;
  const numrc = numerorc;
 //const photo =photodeprofil.name
  const handleSubmitFour = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('type', type);
      formData.append('nom', nom);
      formData.append('prenom', prenom);
      formData.append('adresse', adresse);
      formData.append('numtel', numtel);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('numccp', numccp);
      formData.append('numnif', numnif);
      formData.append('numrc', numrc);
      formData.append('releverib', releverib);
       formData.append('photodeprofil',photodeprofil);
      const test =formData.get("photodeprofil");

      const response = await fetch("http://localhost:3001/api/v1/auth/register", {
        method: "POST",
        body: formData,
      });

      
      const data = await response.json();
      if (response.ok) {
          
        localStorage.setItem('photo',data.data.photodeprofil);
        props.onData(data.data.photodeprofil);
        console.log("compte créer avec succé");
        console.log(photodeprofil);
      } else {
     
        console.log("Connexion échouée");
        
      }
    } catch (error) {
      console.error(error);
    }
  };

  
  const handleSubmit = async (event) => {
    
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('type', type);
      formData.append('nom', nom);
      formData.append('prenom', prenom);
      formData.append('adresse', adresse);
      formData.append('numtel', numtel);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('numccp', numccp);
       formData.append('photodeprofil',photodeprofil);
       
      const response = await fetch("http://localhost:3001/api/v1/auth/register", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        console.log(formData.get("photodeprofil"))
        localStorage.setItem('photo',data.data.photodeprofil);
        props.onData(data.data.photodeprofil);
        console.log("compte créer avec succé");
        console.log(data.data.photodeprofil);
      } else {
        console.log(formData.get("photodeprofil"))

        console.log("Connexion échouée");
        console.log(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
      <Box display="flex" justifyContent="center">
        <img src={logo} style={{ width: "150px", heigh: "170px" }} />
      </Box>
      <Typography variant="h4" align="center" sx={{ mt: 1 }}>
        Inscription
      </Typography>
      <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel></StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box
        component="form"
        noValidate
        onSubmit={type == "Fournisseurs" ? handleSubmitFour : handleSubmit}
      >
        {activeStep === steps.length ? (
          <Fragment>
            <Typography variant="h5" gutterBottom>
              Thank you for your order.
            </Typography>
            <Typography variant="subtitle1">
              Your order number is #2001539. We have emailed your order
              confirmation, and will send you an update when your order has
              shipped.
            </Typography>
            
            <Button
                  variant="contained"
                  type="submit" variant="contained"
                  sx={{ mt: 3, ml: 1 }}
                 
                >
                  terminer
                </Button>
          </Fragment>
        ) : (
          <Fragment>
            {activeStep == 1
              ? getStepContent(activeStep, {
                  handleEmailChange,
                  handleMdpChange,
                  email,
                  mdp,
                })
              : activeStep == 0
              ? getStepContent(activeStep, {
                  type,
                  nom,
                  prenom,
                  adresse,
                  numerotelephone,
                  numeroccp,
                  numeronif,
                  releverib,
                  numerorc,
                  handleTypeChange,
                  handleNomChange,
                  handlePrenomChange,
                  handleAdresseChange,
                  handleNumeroCcpChange,
                  handleNumeroTelephoneChange,
                  handleNumerorcChange,
                  handleNumeronifChange,
                  handleReleveribChange,
                }): activeStep == 2 ? 
                getStepContent(activeStep,{
                  handlePhotoChange,
                     photodeprofil
                  }

                )
              : getStepContent(activeStep, {
               
                })}
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                  Back
                </Button>
              )}
              {activeStep == steps.length ? (
                <Button
                  variant="contained"
                  type="submit" variant="contained"
                  sx={{ mt: 3, ml: 1 }}
                 
                >
                  terminer
                </Button>
              ) : (
                <Button 
                  type="button"
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  Next
                </Button>
              )}
            </Box>
          </Fragment>
        )}
      </Box>
    </Container>
  );
}
