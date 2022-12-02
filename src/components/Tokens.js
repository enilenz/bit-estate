import React from 'react'
import { BrowserRouter as Router, Link as RRLink, Routes, Route } from "react-router-dom"

import { AspectRatio, Box, Button, ButtonGroup, Card, CardHeader, CardBody, CardFooter, Center, Container, Divider, Flex, Heading, HStack, Image, Link, VStack, Stack, Tabs, TabList, Tab, TabPanel, TabPanels, Text, SimpleGrid, Spacer } from '@chakra-ui/react'
import image from '../assets/bitcoin.png';

const Tokens = () => {
  return (
    <div>
      <Box>

        <Center my='64px'>
          <Flex >
            <Stack>
              <Center >
                <Box>
                  <Image src={image} size="100%" rounded="1rem" objectFit='cover' htmlWidth='200px' htmlHeight='200px' />
                </Box>
              </Center>
              {/* <Heading my='16px'>You do not own any tokens head here for some</Heading> */}
              <Link as={RRLink} to="/estates">
              <Heading my='16px'>You do not own any tokens yet, click me for some 😉</Heading>
              </Link>
            </Stack>
          </Flex>
        </Center>
      </Box>
    </div>
  )
}

export default Tokens