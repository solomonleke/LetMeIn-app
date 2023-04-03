import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { AiOutlineHome } from 'react-icons/ai'
import { MdVerifiedUser } from 'react-icons/md'
import { GiCancel } from 'react-icons/gi'
import { Link } from 'react-router-dom'
import { isActive } from '../Authenticaation'

export default function SecurityNav({path}) {

    const List = [
        {
            name: "home",
            location: "/security-ops",
            icon: <AiOutlineHome />,
            active: isActive(path, "/security-ops"),
            ml: "5px"
        },
        {
            name: "verify ID",
            location: "/security-ops/verify-id",
            icon: <MdVerifiedUser />,
            active: isActive(path, "/security-ops/verify-id"),
            ml: "13px"
        },
        {
            name: "un-checked out",
            location: "/security-ops/uncheck-out-history",
            icon: <GiCancel />,
            active: isActive(path, "/security-ops/uncheck-out-history"),
            ml: "32px"
        }

    ]
    return (

        <Flex justifyContent={"space-between"} mx="6%" py="10px" >

            {
                List.map((item, i) => (
                        <Box color={item.active ? "red" : "#939393"} w="31%" _hover={{ color: "red" }} >
                    <Link to={`${item.location}`}>
                            <Flex justifyContent="center" fontSize={"20px"} >{item.icon}</Flex>
                            <Text textTransform={"capitalize"} textAlign="center" fontSize={"12px"} fontWeight={"400"}  >{item.name}</Text>
                    </Link>
                        </Box>

                ))
            }



        </Flex>


    )
}
