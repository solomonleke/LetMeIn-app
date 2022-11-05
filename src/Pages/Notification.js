import { Box, Center, Stack, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import NotificationCard from '../Components/NotificationCard';
import MainLayout from '../Layouts/Index';
import Seo from '../Utils/Seo';
import { useQuery, useQueryClient } from 'react-query';
import Headers from '../Components/Headers';


export default function Notification() {

  const apiLink = useSelector((state) => state.apiLink);
  const onlineUser = useSelector((state) => state.onlineUser);



//useQuery to get updated data every 10 seconds

const { data, isLoading, isError } = useQuery('users', async () => await (await (fetch(`${apiLink.link}/user/residentEvent/${onlineUser.user.id}`))).json(), { refetchInterval: 10000, refetchOnReconnect: false, refetchIntervalInBackground: true, cacheTime: 10000 });
// console.log('data', data, isLoading, isError);
let Data = [];

if (!isLoading) {

     Data = data?.msg;
   
     let newData = Data.filter((item,i) =>(
      item.delete_state == false
     ))

}


const [Show, setShow] = useState(false)
    
const Copied = ()=>{
    
    setShow(true)

    setTimeout(() => {
        setShow(false)
    }, 5000);
}

  const UpdateUnreadState = ()=>{
    
    Data.map((item,i)=>(
      
    fetch(`${apiLink.link}/user/unreadState `, {

      method: "POST",

      headers: {
          "Content-Type": "application/JSON"
      },
  
      body: JSON.stringify({
  
          id: item.id,
  
      }),
    })

    .then(res => res.json())
    .then(json => {

     console.log("unread", Data)
        
    })
    .catch(error => {
      console.log("error", error);
     
  })

    ))

 

  }


  const deleteCard = (id)=>{
    const payload = {

      method: "POST",
  
      headers: {
          "Content-Type": "application/JSON"
      },
  
      body: JSON.stringify({
  
          id: id,
  
      }),
  
  }
    
    fetch(` ${apiLink.link}/user/deleteState`, payload)

    .then(response => response.json())
    .then(data => {

      console.log("deleted data", data)
    })

    .catch((error) => {
        console.error('Error:', error);
    });

  }
  

  useEffect(() => {
    UpdateUnreadState()
  }, [])

  return (
    <MainLayout>
      <Seo title='Notification' description='LetmeIn Notification' />

      <Box px={["6%", "10%"]} pb="100px">
      <Center>
      <Box w={["90%", "85%", "65%", "49%", "35%"]} mb="20px" cursor={"pointer"}>
      
      <Headers mt={"32px"} text={"Verified Multiple Request Access"}/>

           <Stack spacing={"20px"}>
           {

            Data != [] ? (
              Data.map((item,i)=>(

                <NotificationCard
                codeName={item.codeName}
                accessCode={item.accessCode}
                number={item.number_Visitors}
                Show={Show}
                Copied={Copied}
                deleteCard={()=>deleteCard(item.id)}
                />
  
              ))
            ):(

              <Text>No Record to Display</Text>
            )
           
           }
          
          
           </Stack>
          </Box>
        </Center>
      </Box>
    </MainLayout>
  );
}
