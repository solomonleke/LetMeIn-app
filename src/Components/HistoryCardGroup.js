import { Box, Text } from '@chakra-ui/react';
import moment from 'moment';
import React from 'react';

export default function HistoryCardGroup({
    guestName, gender, guestCreatedAt,
    residentName, residentPhone, residentAddress,
    securityName,checkInTime, checkOutTime,
    noOfGuest,
    typeOf= "Temporary"
}) {
    return (
        <Box>

            <Box display={typeOf === "Single" ? "block": "none"} bg="#F1F1F1" boxShadow={"1px 2px 1px 1px rgba(0, 0, 0, 0.01)"} px="18px" py="8px">
                <Text fontFamily={"body"} fontSize="15px" fontWeight={"400"} color="#000000">{guestName}  | <Box as='span' fontSize="10px" >{gender} | {moment(guestCreatedAt).format("LLL")} </Box></Text>
                <Text mt="0" fontFamily={"body"} fontSize="10px" fontWeight={"300"} color="#000000">Guest Details </Text>
                <hr />
                <Text mt={"11px"} fontFamily={"body"} fontSize="15px" fontWeight={"400"} color="#000000">{residentName}| <Box as='span' fontSize="10px" > {residentPhone} | {residentAddress}</Box> </Text>
                <Text mt="0" fontFamily={"body"} fontSize="10px" fontWeight={"300"} color="#000000">Resident Details</Text>
                <hr />
                <Text mt={"11px"} fontFamily={"body"} fontSize="15px" fontWeight={"400"} color="#000000">{securityName} | <Box as='span' fontSize="10px" > {checkInTime} | {checkOutTime} </Box> </Text>
                <Text mt="0" fontFamily={"body"} fontSize="10px" fontWeight={"300"} color="#000000">Security Ops. Details    Check-in Time  &emsp;&emsp;   Check-out Time</Text>

            </Box>
           
            <Box display={typeOf === "Taxi" ? "block": "none"} bg="#F1F1F1" boxShadow={"1px 2px 1px 1px rgba(0, 0, 0, 0.01)"} px="18px" py="8px">
                <Text fontFamily={"body"} fontSize="15px" fontWeight={"400"} color="#000000">{guestName} adeleke | <Box as='span' fontSize="10px" >{gender} | {moment(guestCreatedAt).format("LLL")} </Box></Text>
                <Text mt="0" fontFamily={"body"} fontSize="10px" fontWeight={"300"} color="#000000">Taxi Details </Text>
                <hr />
                <Text mt={"11px"} fontFamily={"body"} fontSize="15px" fontWeight={"400"} color="#000000">{residentName}| <Box as='span' fontSize="10px" > {residentPhone} | {residentAddress}</Box> </Text>
                <Text mt="0" fontFamily={"body"} fontSize="10px" fontWeight={"300"} color="#000000">Resident Details</Text>
                  <hr />
                <Text mt={"11px"} fontFamily={"body"} fontSize="15px" fontWeight={"400"} color="#000000">{securityName} | <Box as='span' fontSize="10px" > {checkInTime} | {checkOutTime} </Box> </Text>
                <Text mt="0" fontFamily={"body"} fontSize="10px" fontWeight={"300"} color="#000000">Security Ops. Details    Check-in Time  &emsp;&emsp;   Check-out Time</Text>


            </Box>
            <Box display={typeOf === "Multiple" ? "block": "none"} bg="#F1F1F1" boxShadow={"1px 2px 1px 1px rgba(0, 0, 0, 0.01)"} px="18px" py="8px">
                <Text fontFamily={"body"} fontSize="15px" fontWeight={"400"} color="#000000">Multiple Access| <Box as='span' fontSize="10px" > {noOfGuest} | {moment(guestCreatedAt).format("LLL")} </Box></Text>
                <Text mt="0" fontFamily={"body"} fontSize="10px" fontWeight={"300"} color="#000000">Guest Details </Text>
                <hr />
                <Text mt={"11px"} fontFamily={"body"} fontSize="15px" fontWeight={"400"} color="#000000">{residentName}| <Box as='span' fontSize="10px" > {residentPhone} | {residentAddress}</Box> </Text>
                <Text mt="0" fontFamily={"body"} fontSize="10px" fontWeight={"300"} color="#000000">Resident Details</Text>
                <hr />
                <Text mt={"11px"} fontFamily={"body"} fontSize="15px" fontWeight={"400"} color="#000000">{securityName} | <Box as='span' fontSize="10px" > Not Applicable</Box> </Text>
                <Text mt="0" fontFamily={"body"} fontSize="10px" fontWeight={"300"} color="#000000">Security Ops. Details    Check-in Time  </Text>


            </Box>

            <Box display={typeOf === "Temporary" ? "block": "none"} bg="#F1F1F1" boxShadow={"1px 2px 1px 1px rgba(0, 0, 0, 0.01)"} px="18px" py="8px">
                <Text fontFamily={"body"} fontSize="15px" fontWeight={"400"} color="#000000">{guestName}  | <Box as='span' fontSize="10px" >{gender} | {moment(guestCreatedAt).format("LLL")} 24 jul 2024</Box></Text>
                <Text mt="0" fontFamily={"body"} fontSize="10px" fontWeight={"300"} color="#000000">Guest Details | <Box as='span' fontWeight={"700"}>Temporary Pass</Box> </Text>
                <hr />
                <Text mt={"11px"} fontFamily={"body"} fontSize="15px" fontWeight={"400"} color="#000000">{residentName}| <Box as='span' fontSize="10px" > {residentPhone} | {residentAddress}</Box> </Text>
                <Text mt="0" fontFamily={"body"} fontSize="10px" fontWeight={"300"} color="#000000">Resident Details</Text>
                <hr />
                <Text mt={"11px"} fontFamily={"body"} fontSize="15px" fontWeight={"400"} color="#000000">{securityName} | <Box as='span' fontSize="10px" color={"#1F73D5"} fontWeight={"700"}>Multiple    |   Multiple</Box> </Text>
                <Text mt="0" fontFamily={"body"} fontSize="10px" fontWeight={"300"} color="#000000">Security Ops. Details  </Text>


            </Box>

        </Box>
    );
}
