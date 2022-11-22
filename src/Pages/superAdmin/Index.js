import { Center, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../Components/Button'
import MainLayout from '../../Layouts/Index'
import Seo from '../../Utils/Seo'

export default function IndexAdmin() {

  const navigate = useNavigate()
  return (
    <MainLayout>
      <Seo title='LetMeIn SuperAdmin Dashboard' description='LetMeIn SuperAdmin Dashboard' />
      <Center mt={["60px", "90px"]} >
        <Stack spacing={'15px'} cursor="pointer">

          <Text color="#939393" >What would you like to request for ?</Text>
          <Button  onClick={()=>navigate("/superAdmin/newOffice")}>New Estate/Office</Button>
          <Button  onClick={()=>navigate("/superAdmin/verifyAdmin")}>Verify Estate Admin</Button>
        </Stack>

      </Center>






    </MainLayout>
  )
}
