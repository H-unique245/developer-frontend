import { Box, Button, Text, useStatStyles, useToast, VStack } from '@chakra-ui/react';
import {TbDatabaseImport} from "react-icons/tb";
import {MdDelete} from "react-icons/md";
import {BsTextIndentLeft} from "react-icons/bs";
import { Link } from 'react-router-dom';
import axios from "axios";
import { useState } from 'react';

function Home() {
const [loading,setLoading]= useState(false);
const toast= useToast();
  const FetchUsers=async()=>{
   try{
    setLoading(true)
     let result= await axios.post("https://erin-talented-butterfly.cyclic.app/fetchUsers");
     setLoading(false)
     toast({
        status:'success',
        title:result.data,
        position:'top',
        isClosable:true,
        duration:2000
     })
   }
   catch(err){
    console.log(err)
   }
  }  

  const DeleteUsers=async()=>{
    try{
     setLoading(true)
      let result= await axios.delete("https://erin-talented-butterfly.cyclic.app/deleteUsers");
      setLoading(false)
      toast({
         status:'success',
         title:result.data.message,
         position:'top',
         isClosable:true,
         duration:2000
      })
    }
    catch(err){
     console.log(err)
    }
   }
  return (
    <Box p="2rem">
    <VStack>
       <Button leftIcon={<TbDatabaseImport/>} colorScheme='whatsapp' variant='solid' onClick={FetchUsers}>
    Fetch Users
  </Button>
  <Button leftIcon={<BsTextIndentLeft/>} colorScheme='orange' variant='solid'>
    <Link to="/userDetails">
    Users Details
    </Link>
  </Button>
  <Button leftIcon={<MdDelete/>} colorScheme='red' variant='solid' onClick={DeleteUsers}>
    Delete Users
  </Button>
    </VStack>
    <Box>
        {loading?<Text>....loading</Text>:null }
        
    </Box>
    </Box>
  )
}

export default Home
