import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Input,
  SimpleGrid,
  Skeleton,
  Spinner,
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
      payload: { data: "https://testapi.letmein.ng" },
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
    }, 12000);
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

        <Flex
          mt={["32px", "71px"]}
          justifyContent={"space-between"}
          flexDir={[
            "column-reverse",
            "column-reverse",
            "column-reverse",
            "row",
            "row",
          ]}
          alignItems="flex-start"
        >
          <Box w={["100%", "100%", "100%", "50%"]}>
            <Text
              mt={["0", "20px"]}
              fontSize={["40px", "50px", "60px", "45px", "70px"]}
              fontFamily="body"
              fontWeight={"800"}
              lineHeight={[
                "62.03px",
                "62.03px",
                "72.03px",
                "67.03px",
                "82.03px",
              ]}
              bg="linear-gradient(107.46deg, rgba(255, 255, 255, 0.0117) 6.95%, rgba(255, 255, 255, 0.0299) 95.17%)"
              boxShadow={"2px 4px 4px -1px rgba(0, 0, 0, 0.11)"}
              rounded="8px"
              pl="20px"
              pr="10px"
              pt="5px"
              pb="10px"
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
              w="300px"
              rounded={"5px"}
              _hover={{
                bg: "linear-gradient(269.11deg, #50FCDA 19.49%, #12CDA8 87.44%)",
              }}
              bg="#ffffff"
              transition={"1.3s ease"}
              mt="69px"
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
              src="/iphone1.png"
              w={["100%", "70%", "70%", "90%", "70%"]}
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
                w={["100%", "100%", "100%", "35%"]}
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
                  <Image w="186.3px" src="/left-iphone.png" />

                  <Box>
                    <Text
                      fontFamily="body"
                      fontWeight={"700"}
                      fontSize="12px"
                      color="#B7B7B7"
                      textAlign={"center"}
                      pb="10px"
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
              >
                <Box pos={"relative"} mt="90px">
                  <Box
                    display={["none", "none", "none", "flex"]}
                    pos="absolute"
                    left={["-110%", "-110%", "-110%", "-24%", "-100%"]}
                    top="35%"
                    borderBottom="1px dashed #A4A4A4"
                    w={["110%", "110%", "110%", "25%", "110%"]}
                  >
                    {" "}
                  </Box>
                  <Box zIndex={5}>
                    <Image w="250px" src="/red-glow.jpg" />
                  </Box>

                  <Box
                    display={["none", "none", "none", "flex"]}
                    pos="absolute"
                    borderBottom="1px dashed #A4A4A4"
                    right={["-110%", "-110%", "-110%", "-16%", "-100%"]}
                    top="35%"
                    w={["110%", "110%", "110%", "18%", "110%"]}
                  >
                    {" "}
                  </Box>
                </Box>
              </Flex>

              <Flex
                w={["100%", "100%", "100%", "35%"]}
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

                  <Image w="186.3px" src="/right-iphone.png" ml="16px" />
                  <Box>
                    <Text
                      fontFamily="body"
                      fontWeight={"700"}
                      fontSize="12px"
                      color="#B7B7B7"
                      textAlign={"center"}
                      pb="10px"
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
        bg="url(/product-bg.png)"
        w="100%"
        px={["6%", "10%"]}
        pt="34px"
        bgRepeat={"none"}
        bgSize="cover"
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

        <SimpleGrid
          columns={["1", "2", "2", "3", "4"]}
          spacing={["30px", "60px", "70px", "60px", "70px"]}
          mt="48px"
          pb
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

        <SimpleGrid
          columns={[1, 1, 1, 2, 3]}
          mt="40px"
          spacingX={"30px"}
          display={["block", "block", "block", "flex", "none"]}
        >
          <Flex
            justifyContent={[
              "center",
              "center",
              "center",
              "flex-start",
              "flex-start",
            ]}
          >
            <Flex
              onClick={comingSoon}
              w={["400px", "400px", "400px", "300px", "400px"]}
              bg="#404040"
              h={["200px", "253px"]}
              justifyContent={"center"}
              alignItems="center"
              cursor={"pointer"}
            >
              <Box>
                <Image src="/btn.png" w="100px" />

                {Coming && (
                  <Text
                    color="#fff"
                    mt="4px"
                    fontFamily={"body"}
                    fontSize="14px"
                  >
                    Coming Soon
                  </Text>
                )}
              </Box>
            </Flex>
          </Flex>

          <Flex justifyContent={["center", "center", "center", "flex-start"]}>
            <Box pos={"relative"}>
              <Image src="/laptop-phone.png" w="400px" />
              <Image
                src="/iphone2.png"
                w={["50px", "55px", "59px", "45px", "70px"]}
                pos={"absolute"}
                right={["25px", "30px", "25px", "20px", "20px"]}
                top={["88px", "87px", "105px", "69px", "87px"]}
              />
            </Box>
          </Flex>

          <Flex justifyContent={["center", "center", "center", "flex-start"]}>
            <Button
              w="158px"
              onClick={getStarted}
              mb={["32px", "32px", "32px", "0"]}
              _hover={{
                bg: "linear-gradient(269.11deg, #50FCDA 19.49%, #12CDA8 87.44%)",
              }}
              boxShadow="2px 4px 6px 4px rgba(81, 252, 219, 0.32)"
              rounded="5px"
              fontSize={["18px", "20px", "20px", "20px"]}
              fontFamily="body"
              fontWeight={"800"}
              bg="linear-gradient(269.11deg, #50FCDA 19.49%, #12CDA8 87.44%)"
              mt="89px"
              color="#000000"
              py="14px"
              px="37px"
            >
              Get Started{" "}
            </Button>
          </Flex>
        </SimpleGrid>

        <Flex
          justifyContent={"space-between"}
          mt="40px"
          display={["none", "none", "none", "none", "flex"]}
        >
          <Flex
            justifyContent={[
              "center",
              "center",
              "center",
              "flex-start",
              "flex-start",
            ]}
          >
            <Flex
              onClick={comingSoon}
              w={["400px", "400px", "400px", "300px", "400px"]}
              bg="#404040"
              h={["200px", "253px"]}
              justifyContent={"center"}
              alignItems="center"
              cursor={"pointer"}
            >
              <Box>
                <Image src="/btn.png" w="100px" />

                {Coming && (
                  <Text
                    color="#fff"
                    mt="4px"
                    fontFamily={"body"}
                    fontSize="14px"
                  >
                    Coming Soon
                  </Text>
                )}
              </Box>
            </Flex>
          </Flex>

          <Flex justifyContent={["center", "center", "center", "flex-start"]}>
            <Box pos={"relative"}>
              <Image src="/laptop-phone.png" w="400px" />
              <Image
                src="/iphone2.png"
                w={["45px", "45px", "45px", "45px", "70px"]}
                pos={"absolute"}
                right={["20px", "20px", "20px", "20px", "20px"]}
                top={["85px", "87px", "87px", "87px", "87px"]}
              />
            </Box>
          </Flex>

          <Flex justifyContent={["center", "center", "center", "flex-start"]}>
            <Button
              w="158px"
              onClick={getStarted}
              mb={["32px", "32px", "32px", "0"]}
              _hover={{
                bg: "linear-gradient(269.11deg, #50FCDA 19.49%, #12CDA8 87.44%)",
              }}
              boxShadow="2px 4px 6px 4px rgba(81, 252, 219, 0.32)"
              rounded="5px"
              fontSize={["18px", "20px", "20px", "20px"]}
              fontFamily="body"
              fontWeight={"800"}
              bg="linear-gradient(269.11deg, #50FCDA 19.49%, #12CDA8 87.44%)"
              mt="89px"
              color="#000000"
              py="14px"
              px="37px"
            >
              Get Started{" "}
            </Button>
          </Flex>
        </Flex>
      </Box>
      {
        // Team section start here
      }
      <Box
        display="none"
        id="our-team"
        bg="url(/product-bg.png)"
        bgRepeat={"none"}
        bgSize="cover"
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
        // Footer starts here
      }
      <Box
        id="contact-us"
        bg="url(/footer_bg.png)"
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
          fontWeight={"500"}
          fontSize="27px"
          color="#ffffff"
        >
          Contact us
        </Text>
        <Flex
          justifyContent={"space-between"}
          pt="45px"
          flexDir={["column", "column", "row", "row", "row"]}
        >
          <Box w={["100%", "40%"]}>
            <HStack spacing={"17px"}>
              <Image src="/phone-icon.png" />

              <Text
                fontFamily="body"
                fontWeight={"800"}
                fontSize="20px"
                color="#ffffff"
              >
                08068840125
              </Text>
            </HStack>
            <HStack spacing={"17px"} mt="26px">
              <Image src="/email-icon.png" />

              <Text
                fontFamily="body"
                fontWeight={"800"}
                fontSize="20px"
                color="#ffffff"
              >
                Support@letmein.ng
              </Text>
            </HStack>
            <HStack spacing={"17px"} mt="26px">

            <Box><MdOutlinePrivacyTip color={'white'} size={'2.5rem'}/></Box>
              <Link to="/privacy">
                <Text
                  fontFamily="body"
                  fontWeight={"800"}
                  fontSize="20px"
                  color="#ffffff"
                //   pl={'3.5rem'}
                //   mt={'1.5rem'}
                >
                  Our Privacy Policy
                </Text>
              </Link>
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

            <Flex justifyContent={"flex-start"}>
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
      </Box>
    </Box>
  );
}
