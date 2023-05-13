import { Box, Typography } from '@mui/material'
import { blue } from '@mui/material/colors'
import React,{useState} from 'react'
import Header from '../components/appBarF'
import Footer from '../components/footer'
import Slide from '../components/slider'
import {About} from '../components/about'
import HomeProducts from './homeProducts'
import {ContactForm} from '../components/contactForm'



export default function Acceuil() {
 
  return ( 
     
       <>
       <Box sx={{backgroundColor:"rgba (233, 233, 233, 0.3)"}}>
    <Header cartData={[]}/>
      <Slide/>
      <Box height={"10px"} sx={{backgroundColor:"rgba (233, 233, 233, 0.3)"}}></Box>
      <Typography variant='h4'  align='center' >Un seul monde de shopping une seul distination UnoShop</Typography>
      <Typography variant='h5'align='center' fontWeight={"bold"}>Decouvrire</Typography>
      <Box height={"80px"}></Box>
      <HomeProducts/>
      <Box height={"80px"} ></Box>
      <About></About>
      <Box height={"150px"} ></Box>
      <ContactForm/>
      <Box height={"80px"} ></Box>
      <Footer/>
      </Box>
   </>
  )
}