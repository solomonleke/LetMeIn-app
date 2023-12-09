import { Avatar, Box, Center, HStack, Input, Stack, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { AiFillCamera } from 'react-icons/ai';
import { BsFillCloudUploadFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import BackBtn from '../Components/BackBtn';
import Button from '../Components/Button';
import MainLayout from '../Layouts/Index';
import Seo from '../Utils/Seo';


const Profile = () => {
    const nav = useNavigate()
    const isLogged = useSelector((state) => state.isLogged);
    const onlineUser = useSelector((state) => state.onlineUser);
    const apiLink = useSelector((state) => state.apiLink);
    const dispatch = useDispatch();
    const [Loading, setLoading] = useState(false);



    const [Image, setImage] = useState(null)
    const [Img, setImg] = useState()

    const handleImg = (e) => {

        setImage(null)
        let file = e.target.files[0]
        setImage(file)


    }



    const upload = () => {
        const formData = new FormData();

      
      

        formData.append("image", Image);
        formData.append("id", onlineUser.user.id,);

        console.log("formData", formData.get("image"))

        const payload = {

            method: "POST",
            // Authorization: 'Bearer  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiN2I2MGJiZjQtYmZmNy00ZTE0LWE0ZjEtZmNmMWI4YTE1YzI3IiwiZW1haWwiOiJ2ODExMTEzOTRAZ21haWwuY29tIiwiaWF0IjoxNzAxOTI3NDY2fQ.JadOH-8vPVtZb_mVpw84U29h8MdeR2waanBpQA6xYMg',
            body: formData

        }

        setLoading(true)
        
        // fetch(`https://fynd-app-d5c4611a1c58.herokuapp.com/api/v1/users/upload`, payload)
        fetch(`${apiLink.link}/user/profilePhoto`, payload)
        
        .then(res => res.json())
        .then(json => {

                console.log("img json ", json)
                if(json.status === 200){

                    dispatch(
                        
                        { type: "ADD_USER", payload: { data: json.msg } }
                        );
                        
                        setImage(null)
                        setLoading(false)
                           
                }

            })
            .catch(error => {
                console.log("error", error);
            })




    }




  



    return <MainLayout>

        <Seo title='My Profile' description='Profile of user' />
        <Box px={["6%", "10%"]} pb="100px">
            <Center>
                <Box w={["90%", "85%", "65%", "49%", "35%"]} mb="20px" cursor={"pointer"}>
                    <Box bg="#FAFAFA" boxShadow={"0px 2px 8px rgba(177, 177, 177, 0.25)"} rounded='7px' px="13px" pb="30px" mt="50px">
                        {
                            //    <Text textAlign={"center"} fontSize={"24px"} fontFamily="body" fontWeight={"500"} color="#424242">Your Profile</Text>
                        }
                        <Box display={"flex"} justifyContent="center" pos={"relative"} top="-40px">
                            <label for="upload">
                                <Avatar pos={"relative"} border={"2px solid #D7D2D1"} src={ Image?.name||`${apiLink.link}/${onlineUser.user.profileImage}`} size='2xl'>
                                    <Box pos={"absolute"} left={"-18px"} top={"60px"}>
                                        <Input onChange={handleImg} type="file" id="upload" hidden />
                                        <label className='label2' for="upload"><BsFillCloudUploadFill /></label>
                                    </Box>
                                </Avatar>
                            </label>
                        </Box>

                        {
                            Image != null &&
                            <Button isLoading={Loading} loadingText="Uploading..." onClick={upload}>upload</Button>
                        }
                        <Stack mt="18px" spacing={"14px"}>

                            <HStack borderTop={"0.5px solid #A7A5A5"} pt="18px" pb={"5px"} spacing={"20px"}>
                                <Text fontSize={"14px"} w="20%" fontFamily="body" fontWeight={"400"} color="#424242">Name </Text>

                                <Text fontSize={"14px"} w="80%" fontFamily="body" fontWeight={"700"} color="#000000"> {onlineUser.user.prefix} {onlineUser.user.firstName} {onlineUser.user.lastName}</Text>
                            </HStack>

                            <HStack borderTop={"0.5px solid #A7A5A5"} pt="18px" pb={"5px"} spacing={"20px"}>
                                <Text fontSize={"14px"} w="20%" fontFamily="body" fontWeight={"400"} color="#424242">Email</Text>

                                <Text fontSize={"14px"} w="80%" fontFamily="body" fontWeight={"700"} color="#000000">{onlineUser.user.email || ""}</Text>
                            </HStack>

                            <HStack borderTop={"0.5px solid #A7A5A5"} pt="18px" pb={"5px"} spacing={"20px"}>
                                <Text fontSize={"14px"} w="20%" fontFamily="body" fontWeight={"400"} color="#424242">Phone No.</Text>

                                <Text fontSize={"14px"} w="80%" fontFamily="body" fontWeight={"700"} color="#000000">{onlineUser.user.phone}</Text>
                            </HStack>

                            <HStack borderTop={"0.5px solid #A7A5A5"} pt="18px" pb={"5px"} spacing={"20px"}>
                                <Text fontSize={"14px"} w="20%" fontFamily="body" fontWeight={"400"} color="#424242">Estate </Text>

                                <Text fontSize={"14px"} w="80%" fontFamily="body" fontWeight={"700"} color="#000000">{onlineUser.user.estateName}</Text>
                            </HStack>

                            <HStack borderTop={"0.5px solid #A7A5A5"} pt="18px" pb={"5px"} spacing={"20px"}>
                                <Text fontSize={"14px"} w="20%" fontFamily="body" fontWeight={"400"} color="#424242">Address </Text>

                                <Text fontSize={"14px"} w="80%" fontFamily="body" fontWeight={"700"} color="#000000">{onlineUser.user.houseNo || ""}, {onlineUser.user.estateName}</Text>
                            </HStack>

                        </Stack>


                    </Box>


                </Box>


            </Center>
            <BackBtn onclick={() => nav("/home")} />

        </Box>
    </MainLayout>;
}



export default Profile;
