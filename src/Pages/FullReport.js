import { Box, Center, Flex, Image, Stack, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import BackBtn from '../Components/BackBtn';
import Headers from '../Components/Headers';
import Preloader from '../Components/Preloader';
import ReportCard from '../Components/ReportCard';
import MainLayout from '../Layouts/Index';
import Seo from '../Utils/Seo';

export default function FullReport() {
    const onlineUser = useSelector((state) => state.onlineUser);
    const nav = useNavigate();
    const apiLink = useSelector((state) => state.apiLink);
    const [FullData, setFullData] = useState("")
    const [Loading, setLoading] = useState(true)

    const fullReport= ()=>{

        fetch(`${apiLink.link}/user/getAllusers/${onlineUser.user.estateName}`)

        .then(res => res.json())
        .then(json => {

            console.log("report", json);

            if (json.status == 200) {
                setFullData(json)
                setLoading(false)
            }
        })

        .catch(error => {
            console.log("error", error);
           
        })
    }

    const [Verified, setVerified] = useState(onlineUser.user.Verified);
    const isLogged = useSelector((state) => state.isLogged);


    const middleWare = ()=>{
     
       
            if(Verified == false){
                nav("/home")
            }
        
       
    }

    useEffect(() => {
     
        fullReport()
    }, [])

  return (
    <MainLayout>
      <Seo title="Full report" description='Letmein Full Report' />

      {
        Loading && (

            <Preloader/>
        )
      }

            <Headers mt="41px" text={`${onlineUser.user.estateName} Full report`} />

        <Box mx={["6%","10%"]}>

            <Center my="60px">
                <Box w={["80%", "50%"]}>
                    <Stack spacing={"30px"}>

                    {
                        // <ReportCard title="No. of Landlords" text="8"/>
                    }
                    
                    <ReportCard title="Total no of verified user" text={`${FullData.verifiedUsers?.length}`}/>
                    <ReportCard title="No. of Estate Managers" text={`${FullData.estateManagers?.length}`}/>
                    <ReportCard title="Total No. of Subscribed Users" text={`${FullData.subscribedUsers?.length}`}/>
                    <ReportCard title="Total No of Access Request Granted " fontSize="18px" text="coming soon"/>
                    <ReportCard title="Most frequent User " text="coming soon" fontSize='18px'/>
                    <ReportCard title="Most Frequent Visiting Days" fontSize='18px' text="coming soon "/>
                    </Stack>

                </Box>
            </Center>
        <BackBtn onclick={()=>nav("/home")}/>
        </Box>
    </MainLayout>
  );
}
