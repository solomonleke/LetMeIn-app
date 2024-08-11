import React from 'react'
import MainLayout from '../../Layouts/Index'
import Seo from '../../Utils/Seo'
import { Box } from '@chakra-ui/react'

function ViewAllEstate() {

    // const getAllEstate = () => {
    //     fetch(`${apiLink.link}/user/getAllEstates`)

    //         .then(res => res.json())
    //         .then(json => {
    //             setEstateList(json.msg)
    //             console.log("estate list", json)
    //         })
    //         .catch(error => {
    //             console.log("error", error);
    //         })

    // }

  return (
  <MainLayout>
        <Seo title='LetMeIn SuperAdmin View all Estate' description='LetMeIn SuperAdmin Dashboard' />


        <Box mx={["6%", "10%"]}>

        {/* dsfjsdskdskdskd */}
        </Box>


  </MainLayout>
  )
}

export default ViewAllEstate
