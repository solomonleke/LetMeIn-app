import React from "react";
import { HStack, Box, Text, Flex } from "@chakra-ui/react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";

const ReusablePaginationControls = ({
  currentPage,
  startIndex,
  endIndex,
  totalItems,
  handlePreviousPage,
  handleNextPage,
  LastPage,
  PreviousPage
}) => (
    <Flex justifyContent={"flex-end"} mt={"32px"}>

  <HStack Box color="#242424" fontSize={{ base: "12px" }}>
    {currentPage > 1 && (
      <Box bg="#fff" p="2" fontSize="14" onClick={PreviousPage} cursor="pointer">
        <AiOutlineDoubleLeft color="#242424" />
      </Box>
    )}

    {currentPage > 1 && (
      <Box bg="#fff" p="2" fontSize="14" onClick={handlePreviousPage} cursor="pointer">
        <MdKeyboardArrowLeft color="#242424" />
      </Box>
    )}

    <Text>
      {startIndex + 1} - {endIndex} of {totalItems}
    </Text>

    <Box bg="#fff" p="2" onClick={handleNextPage} fontSize="14" cursor="pointer">
      <MdKeyboardArrowRight color="#242424" />
    </Box>


    <Box bg="#fff" p="2" fontSize="14" onClick={LastPage} cursor="pointer">
        <AiOutlineDoubleRight color="#242424" />
      </Box>
  </HStack>
    </Flex>
);

export default ReusablePaginationControls;
