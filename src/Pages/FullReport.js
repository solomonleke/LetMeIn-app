import { Box, Center, Stack, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import BackBtn from '../Components/BackBtn';
import Headers from '../Components/Headers';
import ReportCard from '../Components/ReportCard';
import MainLayout from '../Layouts/Index';
import Seo from '../Utils/Seo';

export default function FullReport() {
    const onlineUser = useSelector((state) => state.onlineUser);
    const nav = useNavigate();
    const apiLink = useSelector((state) => state.apiLink);
    const [FullData, setFullData] = useState({})

    const fullReport= ()=>{

        fetch(`${apiLink.link}/user/getAllusers/${onlineUser.user.estateName}`)

        .then(res => res.json())
        .then(json => {

            console.log("report", json);

            if (json.status == 200) {
                setFullData(json)
            }
        })

        .catch(error => {
            console.log("error", error);
           
        })
    }

    useEffect(() => {
        fullReport()
    }, [])

  return (
    <MainLayout>
      <Seo title="Full report" description='Letmein Full Report' />
        <Headers mt="41px" text={`${onlineUser.user.estateName} Full report`} />

        <Box mx={["6%","10%"]}>

            <Center my="60px">
                <Box w={["80%", "310px"]}>
                    <Stack spacing={"30px"}>

                    {
                        // <ReportCard title="No. of Landlords" text="8"/>
                    }
                    
                    <ReportCard title="Total no of verified user" text={`${FullData?.verifiedUsers.length}`}/>
                    <ReportCard title="No. of Estate Managers" text={`${FullData?.estateManagers.length}`}/>
                    <ReportCard title="Total No. of Subscribed Users" text={`${FullData?.subscribedUsers.length}`}/>
                    <ReportCard title="Total No of Access Request Granted " text="4000"/>
                    <ReportCard title="Most frequent User " text="Mr Komolafe" fontSize='20px'/>
                    <ReportCard title="Most Frequent Visiting Days" text="Sat"/>
                    </Stack>

                </Box>
            </Center>
        <BackBtn onclick={()=>nav("/home")}/>
        </Box>
    </MainLayout>
  );
}
