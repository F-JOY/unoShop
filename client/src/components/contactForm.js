import React, { useState } from "react";
import { TextField, Button, makeStyles, Box, Typography } from "@mui/material";
import { height } from "@mui/system";

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
<>
<Typography variant="h3" mb={3} align="center">Contactez nous</Typography>

 <Box
        marginBottom={5}
        style={{ height: "2px", backgroundColor: "#F39200" }}
      >
      </Box>

    <Box sx={{display: "flex",

    flexDirection: "column",
    alignItems: "center",
}}>  

    
      <form onSubmit={handleSubmit} sx={formStyles}>
       
        <TextField
          label="Prénom"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
          sx={fieldStyles}
        />
        <TextField
          label="Nom"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
          sx={fieldStyles}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          sx={fieldStyles}
        />
        <TextField
          label="Message"
          name="message"
          multiline
          rows={4}
          value={formData.message}
          onChange={handleChange}
          required
          sx={{
            width: "100%",
            marginBottom: "16px",
            height: "50px",
          }}
        />
        <Box display={'flex'} justifyContent="end">
            <Button
          variant="contained"
          type="submit"
          sx={{
            marginTop: "100px",
            backgroundColor: "#0049f2",
            color: "white",
            "&:hover": {
              backgroundColor: "#0069d9",
            },
          }}
        >
          Envoyer
        </Button>
        </Box>
        
      </form>
    </Box>
    </>
  );
};

export default ContactForm;

const formStyles = {
   
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width:"400px"
};

const fieldStyles = {
  width: "100%",
  marginBottom: "16px",
};


