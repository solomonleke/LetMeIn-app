import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Img,
  Input,
  SimpleGrid,
  Skeleton,
  Spinner,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ProductCard from "../Components/ProductCard";
import TeamCard from "../Components/TeamCard";
import HomeNav from "../Layouts/HomeNav";
import Privacy from "./Privacy";

export default function Homepage() {
  const [Coming, setComing] = useState(false);
  const [Loading, setLoading] = useState(true);
  const [Show, setShow] = useState(false);
  const [Payload, setPayload] = useState({
    name: "",
    email: "",
    message: "",
  });

  const dispatch = useDispatch();

  const updateApiLink = () => {
    dispatch({
      type: "API-LINK",
      payload: { data: "https://api.letmein.ng" },
    });
  };

  const nav = useNavigate();

  const getStarted = () => {
    nav("/home");
  };

  const comingSoon = () => {
    setComing(!Coming);
  };

  const handleChange = (e) => {
    setPayload({ ...Payload, [e.target.id]: e.target.value });
  };
  const SendMessage = () => {
    alert(JSON.stringify(Payload));
    setShow(true);
  };

  useEffect(() => {
    updateApiLink();
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);
  return (
    <Box w="100%">
      {
        // preloader starts here
      }

      {Loading && (
        <Box
          pt="35vh"
          bg="#FBFBFB"
          w="100%"
          zIndex={10}
          h="100vh"
          pos={"fixed"}
          top="0"
        >
          {
            // <div className='preloader'>
            // </div>
            // <Flex justifyContent={"center"} mt="-80px">
            //     <Image src='/favicon.png' w={"40px"} />
            // </Flex>
          }
          <Flex justifyContent={"center"}>
            <Image src="/preloader.gif" w="300px" />
          </Flex>
        </Box>
      )}

      <Box
        bg="url(/topBg.svg)"
        w="100%"
        h={["auto", "auto", "auto", "auto"]}
        minH="100vh"
        bgRepeat={"none"}
        bgSize="cover"
        pb={"0px"}
        pt="34.5px"
        px={["6%", "10%"]}
        pos="relative"
      >
        <HomeNav />

        <Img src="/landingSvg.svg" display={["none", "none", "block", "block"]} pos="absolute" left={"0"} />

        <Flex
          zIndex={"10"}
          mt={["32px", "71px"]}
          justifyContent={"space-between"}
          flexDir={[
            "column",
            "column",
            "column",
            "row",
            "row",
          ]}
          alignItems="flex-start"
        >
          <Box w={["100%", "100%", "100%", "50%"]}>
            <Text
              mt={["0", "50px"]}
              fontSize={["40px", "50px", "60px", "45px", "60px"]}
              fontFamily="body"
              fontWeight={"800"}
              lineHeight={[
                "62.03px",
                "62.03px",
                "72.03px",
                "67.03px",
                "69.03px",
              ]}
              bg="rgb(190, 40, 44, 0.05)"
              boxShadow={"2px 4px 4px -1px rgba(0, 0, 0, 0.11)"}
              rounded="8px"
              pl="20px"
              pr="20px"
              pt="25px"
              pb="25px"
              borderTop={"0.5px solid #fff"}
              borderLeft="0.5px solid #fff"
              color="#ffffff"
            >
              Control Access to your Home with our Reliable Digital Security{" "}
            </Text>

            <Button
              onClick={getStarted}
              mb={["32px", "32px", "32px", "0"]}
              fontSize={["18px", "23px", "25px", "18px"]}
              fontFamily="body"
              fontWeight={"800"}
              w={["100%", "300px"]}
              rounded={"5px"}
              _hover={{
                bg: "linear-gradient(269.11deg, #50FCDA 19.49%, #12CDA8 87.44%)",
              }}
              bg="#ffffff"
              transition={"1.3s ease"}
              mt="29px"
              color="#000000"
              py="22px"
              px="45px"
            >
              Get Started
            </Button>
          </Box>
          <Flex
            w={["100%", "100%", "100%", "50%"]}
            justifyContent={[
              "center",
              "center",
              "center",
              "flex-end",
              "flex-end",
            ]}
          >
            <Image
              src="/sideImage.svg"
              w={["100%", "100%", "100%", "100%", "100%"]}
              pos="relative"
              left={["0%", "0%", "0%", "25%", "25%"]}
              top="13px"

            />
          </Flex>
        </Flex>
      </Box>
      {
        // Our product starts here
      }
      <Box px={["6%", "10%"]} mt={["32px", "71px"]} pb="32px">
        <div id="our-product">
          <Text
            as={"span"}
            pb="4px"
            textTransform={"capitalize"}
            fontFamily="body"
            fontWeight={"500"}
            fontSize="27px"
            color="#E02828"
          >
            our product
          </Text>
          <Box px={["0%", "7%"]}>
            <Flex
              mt="68px"
              justifyContent={"space-between"}
              flexDir={["column", "column", "column", "row"]}
            >
              <Flex
                w={["100%", "100%", "100%", "30%"]}
                flexDir={"row"}
                justifyContent={["center", "center", "center", "flex-start"]}
              >
                <Box zIndex={3}>
                  <Text
                    fontFamily="body"
                    fontWeight={"700"}
                    fontSize="20px"
                    color="#B7B7B7"
                    textAlign={"center"}
                    pb="10px"
                  >
                    Resident App
                  </Text>
                  <Flex justifyContent={"center"}>

                  <Image rounded={"30px"} w={["70%","70%","70%","65%"]}  src="/Resident.gif" />
                  </Flex>

                  <Box>
                    <Text
                      fontFamily="body"
                      fontWeight={"700"}
                      fontSize="12px"
                      color="#B7B7B7"
                      textAlign={"center"}
                      pb="10px"
                      mt={"10px"}
                    >
                      LetMeIn Resident App{" "}
                    </Text>
                    <Text
                      mt="-12px"
                      fontFamily="body"
                      fontWeight={"400"}
                      fontSize="12px"
                      color="#B7B7B7"
                      textAlign={"center"}
                      pb="10px"
                    >
                      allows residents generate unique <br /> access codes for
                      visiting Guests
                    </Text>
                  </Box>
                </Box>
              </Flex>

              <Flex
                flexDir={"row"}
                justifyContent={["center", "center", "center", "flex-end"]}
                alignItems={"flex-start"}
              >
                <Box pos={"relative"} mt="90px">
                  <Box
                    display={["none", "none", "none", "flex"]}
                    pos="absolute"
                    left={["-110%", "-110%", "-110%", "-24%", "-100%"]}
                    top="60%"
                    borderBottom="1px dashed #A4A4A4"
                    w={["110%", "110%", "110%", "25%", "130%"]}
                  >
                    {" "}
                  </Box>
                  <Box zIndex={5} mt={["60px","60px","60px","16px","60px" ]}>
                    <Image w="200px" src="/red-glow.svg" />
                  </Box>

                  <Box
                    display={["none", "none", "none", "flex"]}
                    pos="absolute"
                    borderBottom="1px dashed #A4A4A4"
                    right={["-110%", "-110%", "-110%", "-16%", "-100%"]}
                    top="60%"
                    w={["110%", "110%", "110%", "110%", "130%"]}
                  >
                    {" "}
                  </Box>
                </Box>
              </Flex>

              <Flex
                w={["100%", "100%", "100%", "30%"]}
                flexDir={"row"}
                justifyContent={["center", "center", "center", "flex-end"]}
                mt={["90px", "90px", "90px", "0"]}
                alignItems="flex-start"
              >
                <Box zIndex={3}>
                  <Text
                    fontFamily="body"
                    fontWeight={"700"}
                    fontSize="20px"
                    color="#B7B7B7"
                    textAlign={"center"}
                    pb="10px"
                  >
                    Security Operative App
                  </Text>

                 <Flex justifyContent={"center"}>
                 <Image rounded={"30px"} w={["70%","70%","70%","65%"]} src="/Security.gif"  />
                 </Flex>
                  <Box>
                    <Text
                      fontFamily="body"
                      fontWeight={"700"}
                      fontSize="12px"
                      color="#B7B7B7"
                      textAlign={"center"}
                      pb="10px"
                      mt={"10px"}
                    >
                      LetMeIn Security Operative App{" "}
                    </Text>
                    <Text
                      mt="-12px"
                      fontFamily="body"
                      fontWeight={"400"}
                      fontSize="12px"
                      color="#B7B7B7"
                      textAlign={"center"}
                      pb="10px"
                    >
                      uses the unique access code provided by <br /> Guests to
                      permit residents into an Estate
                    </Text>
                  </Box>
                </Box>
              </Flex>
            </Flex>
          </Box>
        </div>
      </Box>

      {
        //  product offering starts here
      }
      <Box
        w="100%"
        px={["6%", "10%"]}
        pt="34px"
        pb="32px"
      >
        <Text
          as={"span"}
          pb="4px"
          textTransform={"capitalize"}
          fontFamily="body"
          fontWeight={"500"}
          fontSize="27px"
          color="#E02828"
        >
          Product Offering
        </Text>

        <Flex
          justifyContent={"space-between"}
          flexWrap={"wrap"}
          alignItems={"flex-start"}
          mt="48px"

        >
          <ProductCard
            icon="simple"
            title="simple"
            text="Unique code for individual guests can be simply generated with few clicks in less than 10secs."
          />
          <ProductCard
            icon="reliable"
            title="reliable"
            text="Your security operatives no longer need to worry about the identity of the residents when granting guests access through phone call."
          />
          <ProductCard
            icon="smart"
            title="smart"
            text="With access request history and full comprehensive periodic security reports Letmein provides a smart option for managing access control"
          />
          <ProductCard
            icon="safe"
            title="safe"
            text="Integrating the LetMeIn app into your Estate security protocol makes your estate significantly safer."
          />
        </Flex>
      </Box>

      {
        // Team section start here
      }
      <Box
        display="block"
        id="our-team"
        w="100%"
        px={["6%", "10%"]}
        py="35px"
      >
        <Text
          as={"span"}
          textTransform={"capitalize"}
          fontFamily="body"
          fontWeight={"500"}
          fontSize="27px"
          color="#E02828"
        >
          Our team
        </Text>

        <SimpleGrid
          columns={["1", "1", "2", "3"]}
          spacing={["30px", "60px", "80px", "30px", "100px"]}
          mt="48px"
          px={["0%", "7%", "7%", "3%", "7%"]}
        >
          <TeamCard img="ope" name="Opeyemi Adeleke" pos="Co-Founder" />
          <TeamCard
            img="moyin"
            name="Solomon Adeleke"
            pos="Co-Founder, Lead Developer"
          />

          <TeamCard
            img="obinna"
            name="obinna edmund"
            pos="Co-Founder, Backend Developer"
          />
        </SimpleGrid>
      </Box>


      {
        // Sign up starts here
      }
      <Box w="100%" px={["6%", "10%"]} pt="34px" pb="32px">
        <Text
          as={"span"}
          textTransform={"capitalize"}
          fontFamily="body"
          fontWeight={"500"}
          fontSize="27px"
          color="#E02828"
        >
          Sign Up
        </Text>


        <Flex justifyContent={"space-between"} flexWrap={"wrap"}>

          <Box pos={"relative"} w={["100%", "100%", "48%", "32%", "32%"]}>
            <Image src="/laptopPhone.svg" w="100%" />

          </Box>

          <Box w={["100%", "100%", "48%", "60%", "60%"]}>
            <Text textAlign={["center", "center", "center", "left", "left"]} fontSize={["30px", "30px", "40px", "50px"]} fontWeight={"100"} color={"#424242"} mt="10px">Download it now !!!</Text>

            <Flex justifyContent={"space-between"} flexWrap={"wrap"}>
              <Box w={["100%", "100%", "100%", "45%", "45%"]}>
                <Box display={["flex", "flex", "flex", "block", "block",]} justifyContent={"center"} cursor={"pointer"}>
                  <Image src="/android.svg" />
                </Box>

              </Box>
              <Box w={["100%", "100%", "100%", "45%", "45%"]}>
                <Box display={["flex", "flex", "flex", "block", "block",]} justifyContent={"center"} cursor={"pointer"}>

                  <Image src="/ios.svg" />
                </Box>


              </Box>
            </Flex>

          </Box>




        </Flex>

       

       
      </Box>


      {
        // Footer starts here
      }
      <Box
        id="contact-us"
        bg="url(/footerBg.svg)"
        bgRepeat={"none"}
        bgSize="cover"
        px={["6%", "10%"]}
        pt="34"
        pb={["150px", "66px"]}
        mt="150px"
      >
        <Text
          as={"span"}
          textTransform={"capitalize"}
          fontFamily="body"
          fontWeight={"200"}
          fontSize="25px"
          color="#fff"
        >
          Looking For More Information ?
        </Text>

        <Flex
          justifyContent={"space-between"}
          pt="45px"
          flexDir={["column", "column", "row", "row", "row"]}
        >
          <Box w={["100%", "40%"]}>
            <Text
              as={"span"}
              textTransform={"capitalize"}
              fontFamily="body"
              fontWeight={"500"}
              fontSize="22px"
              color="#ffffff"
            >
              Contact us
            </Text>
            <HStack spacing={"17px"} mt="20px">
              <Image src="/phone-icon.png" />

              <Text
                fontFamily="body"
                fontWeight={"600"}
                fontSize="18px"
                color="#ffffff"
              >
                07023938420
              </Text>
            </HStack>
            <HStack spacing={"17px"} mt="20px">
              <Image src="/email-icon.png" />

              <Text
                fontFamily="body"
                fontWeight={"600"}
                fontSize="18px"
                color="#ffffff"
              >
                Support@letmein.ng
              </Text>
            </HStack>

          </Box>

          <Box w={["100%", "50%"]}>
            {Show && (
              <Text
                mt={"-40px"}
                mb="10px"
                color="#fff"
                fontFamily="body"
                fontWeight={"700"}
                fontSize="18px"
              >
                Message Sent successfully
              </Text>
            )}
            <Flex
              justifyContent="space-between"
              flexDir={["column", "column", "column", "row", "row"]}
            >
              <Input
                id="name"
                onChange={handleChange}
                mt={["32px", "0px"]}
                placeholder="Name"
                w={["100%", "100%", "100%", "45%", "45%"]}
                rounded={"0"}
                bg="#fff"
                fontFamily="body"
                fontWeight={"400"}
                fontSize="14px"
                _focus={{ border: "0" }}
                color={"#C9C9C9"}
              />

              <Input
                id="email"
                onChange={handleChange}
                placeholder="Email"
                mt={["47px", "47px", "32px", "0px", "0px"]}
                w={["100%", "100%", "100%", "45%", "45%"]}
                rounded={"0"}
                bg="#fff"
                fontFamily="body"
                fontWeight={"400"}
                fontSize="14px"
                _focus={{ border: "0" }}
                color={"#C9C9C9"}
              />
            </Flex>
            <Textarea
              id="message"
              onChange={handleChange}
              placeholder="Message"
              mt={"47px"}
              rounded={"0"}
              bg="#fff"
              fontFamily="body"
              fontWeight={"400"}
              fontSize="14px"
              _focus={{ border: "0" }}
              color={"#C9C9C9"}
            />

            <Flex justifyContent={"flex-end"}>
              <Button
                onClick={SendMessage}
                disabled={
                  Payload.name !== "" &&
                    Payload.email !== "" &&
                    Payload.message !== ""
                    ? false
                    : true
                }
                mt="32px"
                rounded={"0"}
                bg="#fff"
                border={"1px solid #C9C9C9"}
                color="#E02828"
                fontFamily="body"
                fontWeight={"900"}
                fontSize="18px"
                lineHeight={"21px"}
                _hover={{
                  bg: "linear-gradient(269.11deg, #50FCDA 19.49%, #12CDA8 87.44%)",
                  color: "#000000",
                }}
                transition="1.3 ease-out"
                w="158px"
              >
                Send
              </Button>
            </Flex>
          </Box>
        </Flex>

        {/* mainFooter */}
        <Image src="/logo.svg" />

        <Flex flexWrap={"wrap"} justifyContent={"space-between"} color="#fff" mt="24px">

          <Box w={["100%", "100%", "100%", "35%", "35%"]}>

            <Text fontSize={"14px"} lineHeight={"16.8px"}> <Box as="span" fontWeight={"700"}>LETMEIN -</Box>is an access control software that enables it customers to manage access to thier living space.
              It achieves this by creating a network of three application. </Text>
            <Text fontSize={"14px"} lineHeight={"16.8px"}> <Box as="span" fontWeight={"700"}>Estate Manager / Admin application -</Box>this verifies the identity of everyone in the network and manages the entire
              application while it is also enabled to perform functions of the Resident application.</Text>
            <Text fontSize={"14px"} lineHeight={"16.8px"}> <Box as="span" fontWeight={"700"}>Resident / User Application -</Box> It enables it users to generate digital
              identification and also generate unique codes for their visiting guests.</Text>
            <Text fontSize={"14px"} lineHeight={"16.8px"}> <Box as="span" fontWeight={"700"}>Security Application -</Box>it enables the verification of digital identification
              and unique codes when ever guests or residents need to be given access to a residential estate.</Text>
          </Box>
          <Box w={["100%", "100%", "100%", "13%", "13%"]} cursor={"pointer"}>
            <Stack spacing={"24px"}>
              <Text fontWeight={"800"} fontSize={"18px"}>Product</Text>

              <Text fontWeight={"400"} fontSize={"15px"}>Features</Text>
              <Text fontWeight={"400"} fontSize={"15px"}>Benefits</Text>
            </Stack>

          </Box>
          <Box w={["100%", "100%", "100%", "13%", "13%"]} cursor={"pointer"}>
            <Stack spacing={"24px"}>
              <Text fontWeight={"800"} fontSize={"18px"}>Legal</Text>

              <Text fontWeight={"400"} onClick={() => nav("/privacy")} fontSize={"15px"}>Terms of use</Text>
              <Text fontWeight={"400"} onClick={() => nav("/privacy")} fontSize={"15px"}>Privacy Policy</Text>
            </Stack>
          </Box>
          <Box w={["100%", "100%", "100%", "13%", "13%"]} cursor={"pointer"}>
            <Stack spacing={"24px"}>
              <Text fontWeight={"800"} fontSize={"18px"}>Resources</Text>

              <Text fontWeight={"400"} fontSize={"15px"}>FAQs</Text>
            </Stack>

          </Box>
        
        </Flex>

        <HStack mt="24px" cursor={"pointer"}>
          <Image src="/linkedin.svg" />
          <Image src="/twitter.svg" />
          <Image src="/instagram.svg" />
        </HStack>

        <Text textAlign={"center"} fontWeight={"400"} color={"#fff"} mt={"22px"} fontSize={"15px"}> &#9400; 2023 Letmein. All Rights Reserved.</Text>
      </Box>

    </Box>
  );
}
