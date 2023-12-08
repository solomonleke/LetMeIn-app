import React from "react";
import { Box, Image, Center, Flex } from "@chakra-ui/react";
import HomeNav from "../Layouts/HomeNav";
import privacy1 from "../assets/privacyimages-jpg/LetMeIn Privacy policy_page-0001.jpg";
import privacy2 from "../assets/privacyimages-jpg/LetMeIn Privacy policy_page-0002.jpg";
import privacy3 from "../assets/privacyimages-jpg/LetMeIn Privacy policy_page-0003.jpg";
import privacy4 from "../assets/privacyimages-jpg/LetMeIn Privacy policy_page-0004.jpg";

const Privacy = () => {
  return (
    <Box
      bg="url(/landing2.png)"
      w="100%"
      h={["auto", "auto", "auto", "auto"]}
      minH="100vh"
      bgRepeat={"none"}
      bgSize="cover"
      pb={"32px"}
      pt="34.5px"
      px={["6%", "10%"]}
    >
      <HomeNav />
      <Center>
        <Flex flexDir="column" mt={"2rem"}>
          <Image src={privacy1} />
          <Image src={privacy2} />
          <Image src={privacy3} />
          <Image src={privacy4} />
        </Flex>

        
      </Center>
    </Box>
  );
};

export default Privacy;
