import { Center, Heading } from '@chakra-ui/react';
import React from 'react';


export const AppTitleBanner = () => {
  return (
    <Center>
    <Heading color="blue.600" fontWeight={"semibold"} fontSize={"4xl"} mb={3} mt={3}>
      React Advanced
    </Heading>
  </Center>
  );
};
