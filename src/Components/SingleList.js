import { Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function SingleList({link, name, pageActive}) {

   
    return (
        <Link to={`${link}`}>
            <Text _hover={{bg: "linear-gradient(269.11deg, #50FCDA 19.49%, #12CDA8 87.44%)"}} bg={pageActive ?
             "linear-gradient(269.11deg, #50FCDA 19.49%, #12CDA8 87.44%)": ""} p="10px"
              fontFamily={"body"} textTransform="capitalize" fontWeight={700} fontSize={"16px"}
               borderBottom={'0.5px solid #A7A5A5'}>{name}</Text>
        </Link>
    )
}
