import React, { useEffect, useState ,useContext,useRef} from 'react'
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link'; 
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";

 import {Context} from "./../index.js";



const  ForgotPassword=()=>{
  const datacontext = useContext(Context);

  console.log(datacontext,"datacontexts")

const customEle=useRef(null)

  const params=useParams();
  const navigation=useNavigate();

  const [apiRes,setApiRes]=useState([]);

  console.log(params)
const Row =(({title,arr})=>(


  <div>{title}

  {arr.map((d,i)=>(<img src={d.url} />))}
    

  </div>


  

)) 

useEffect(()=>{

  console.log(customEle.current,'customEle')

  const fatchData=async()=>{
     
    const  {data }=await axios.get('https://jsonplaceholder.typicode.com/photos');
    console.log(data)
    setApiRes(data)

  }

  fatchData();

},[])



  return (
    <div>forgot-password
    

    <Row title="mahendra" arr={apiRes} />
    <Row title="111" arr={apiRes} />



    <Grid container  ref={customEle} >
    <Grid item xs>
      <Link href="/" variant="body2">
        login   
      </Link>
      <button onClick={()=> navigation('/about') }>about</button> 
    </Grid>
    
    </Grid> 
    </div>
  )
}


 
export default ForgotPassword;

 