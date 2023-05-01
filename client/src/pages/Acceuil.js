import { Box } from '@mui/material'
import { blue } from '@mui/material/colors'
import React,{useState} from 'react'
import Header from '../components/appBarF'
import Categorie from '../components/categories'
import Footer from '../components/footer'
import Slide from '../components/slider'


export default function Acceuil() {
 
  return ( 
     
       <>
      <Header />
      <Slide/>
      <h1>categories</h1>
      <h1>Produits</h1>
      <Footer/>
      
   </>
  )
}