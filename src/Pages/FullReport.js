import { Text } from '@chakra-ui/react';
import React from 'react';
import MainLayout from '../Layouts/Index';
import Seo from '../Utils/Seo';

export default function FullReport() {
  return (
    <MainLayout>
      <Seo title="Full report" description='Letmein Full Report' />

      <Text mx={["6%","10%"]} textAlign={"center"} fontFamily="body" fontSize={"55px"} fontWeight="600" color={"black"} mt="35vh">This Page is Under Construction and not available at the moment</Text>
    </MainLayout>
  );
}
