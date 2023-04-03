import { Avatar, Box, Center, HStack, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import Button from '../../Components/Button'
import Headers from '../../Components/Headers'
import Input from '../../Components/Input'
import VerifyCard from '../../Components/VerifyCard'
import MainLayout from '../../Layouts/Index'
import SecurityNav from '../../Layouts/SecurityNav'
import Seo from '../../Utils/Seo'

export default function VerifyID() {

    const location = useLocation();


    const [ResidentId, setResidentId] = useState("");
    const [Data, setData] = useState({});
    const [Display, setDisplay] = useState(false);
    const [Loading, setLoading] = useState(false);
    const apiLink = useSelector((state) => state.apiLink);


    const onlineUser = useSelector((state) => state.onlineUser);

    console.log("resID", ResidentId)

    const VerifyId = () => {
        setLoading(true)

        fetch(`${apiLink.link}/user/getUniqueUser/${onlineUser.user.estateName}/${ResidentId}`)

        .then(res => res.json())
        .then(json => {

            console.log("getUser", json);

            if (json.status === 200) {
               
                setLoading(false)
                setDisplay(true)
                setData(json.msg)
            }else{
                setLoading(false)
            }
        })

        .catch(error => {
            console.log("error", error);
           
        })



    }
    return (
        <MainLayout>
            <Seo title='Verify Id' description='Letmein Verify Id' />



            <Center>
                <Box w={["80%", "35%"]} >
                    <Headers text="Verify resident ID" mt="32px" />
                    {
                        Display === false ? (
                            <Stack mt="32px" spacing={"100px"}>

                                <Input label="Resident Unique ID" value={ResidentId} val={ResidentId !== "" ? true : false} onChange={(e) => setResidentId(e.target.value)} />
                                <Button isLoading={Loading} disabled={ResidentId !== "" ? false : true} onClick={VerifyId}>Verify</Button>
                            </Stack>
                        ) : (
                            <>
                                <Box mt="15px"  bg="#F8F8F8" p="12px" borderRadius={"8px"}>
                                    <Text textAlign={"center"} fontWeight="700" fontSize="14px" color={"#000000"}>Resident Identification</Text>

                                    <Box display={"flex"} justifyContent="center" mt="20px">

                                        <Avatar src={`${apiLink.link}/${Data.profileImage}`} size='2xl'>

                                        </Avatar>

                                    </Box>
                                    <Stack mt="32px" spacing={"14px"}>

                                        <VerifyCard title="name" value={`${Data.firstName} ${Data.lastName}`} />
                                        <VerifyCard title="Prefix" value={Data.prefix} />
                                        <VerifyCard title="email" value={Data.email} />
                                        <VerifyCard title="phone no" value={Data.phone} />
                                        <VerifyCard title="ID no" value={Data.usersId} />

                                    </Stack>
                                </Box>
                                <Button mb="62px" mt="30px" onClick={()=>setDisplay(false)}>Back</Button>
                            </>

                        )
                    }




                </Box>



            </Center>

            <Box pos="fixed" bottom={"0"} width="100%" display={["block", "none"]}>
                <SecurityNav path={location.pathname} />
            </Box>
        </MainLayout>
    )
}
