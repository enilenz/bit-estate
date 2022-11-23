import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link as RRLink, Routes, Route } from "react-router-dom"

import { Box, Button, ButtonGroup, Center, Flex, Heading, HStack, Image, Link, VStack, Tabs, TabList, Tab, TabPanel, TabPanels, Text, Spacer } from '@chakra-ui/react'

import Estates from './components/Estates';
import Landing from './components/Landing';
import Tokens from './components/Tokens';

function App() {

  return (
    <Router>
      <div className="App">

        <Box bg='#FFFFFF' color='#38A169' p='6px' pt='12px'  borderWidth='1px' borderRadius='sm' pb='6px'>
          <Flex minWidth='max-content' alignItems='center' gap='2'>

            <Box p='2' pl='8px'>
              <Link as={RRLink} to="/">
                <Heading   fontWeight='600' fontSize='24px'>Bit Estate</Heading>
              </Link>

            </Box>
            <Spacer />

            <Box pr='8px'>
              <HStack spacing='8'>
                <Link as={RRLink} to="/estates">
                  <Text fontSize='md' >Estates</Text>
                </Link>
                <Link as={RRLink} to="/tokens">
                  <Text fontSize='md'>Tokens</Text>
                </Link>

                <Button size='md' colorScheme='green' mt='24px'>
                  Connect Wallet
                </Button>


              </HStack>
            </Box>


          </Flex>
        </Box>


        <Routes>

          <Route ex path="/" element={<Landing />}></Route>
          <Route ex path="/estates" element={<Estates />}></Route>
          <Route ex path="/tokens" element={<Tokens />}></Route>

        </Routes>

      </div>
    </Router>
  );
}

export default App;
