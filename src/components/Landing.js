import React from 'react'
import { BrowserRouter as Router, Link as RRLink, Routes, Route } from "react-router-dom"

import { AspectRatio, Box, Button, ButtonGroup, Center, Container, Flex, Heading, HStack, Image, Link, VStack, SimpleGrid, Stack, Tabs, TabList, Tab, TabPanel, TabPanels, Text, Spacer } from '@chakra-ui/react'

import image from '../assets/rimage.jpg';

const Landing = () => {

    const highlights = [
        {
          icon: '✨',
          title: 'No-code',
          description:
            "We are No-Code friendly. There is no coding required to get started. Launchman connects with Airtable and lets you generate a new page per row. It's just that easy!",
        },
        {
          icon: '🎉',
          title: 'Make Google happy',
          description:
            "We render all our pages server-side; when Google's robots come to index your site, the page does not have to wait for JS to be fetched. This helps you get ranked higher.",
        },
        {
          icon: '😃',
          title: 'Rapid experimenting',
          description:
            "You don't have to wait hours to update your hard-coded landing pages. Figure out what resonates with your customers the most and update the copy in seconds",
        },
        {
          icon: '🔌',
          title: 'Rapid experimenting',
          description:
            "You don't have to wait hours to update your hard-coded landing pages. Figure out what resonates with your customers the most and update the copy in seconds",
        },
      ]

    return (
        <div>
            {/* <Box bg='#FFFFFF' color='#38A169' maxW='994px' margin='auto' borderRadius='12px' textAlign='center'  > */}

            <Box mt='54px'>

                <Flex
                    align="center"
                    justify="space-around"
                    direction="row"
                    wrap="no-wrap"
                    minH="70vh"
                    px={8}
                    mb={16}
                >
                    <Box>

                        <Stack
                            spacing={4}
                            w="80%"
                            align="flex-start"
                        >
                            <Heading
                                as="h1"
                                size="xl"
                                fontWeight="bold"
                                color="primary.800"
                                textAlign={["center", "center", "left", "left"]}
                            >
                                Own a brick in the estate baby come over
                            </Heading>
                            <Heading
                                as="h2"
                                size="md"
                                color="primary.800"
                                opacity="0.8"
                                fontWeight="normal"
                                lineHeight={1.5}
                                textAlign={["center", "center", "left", "left"]}
                            >
                                Buy now sell later or some other bs
                            </Heading>
                            <Link as={RRLink} to="/estates">
                                <Button
                                    colorScheme="green"
                                    borderRadius="8px"
                                    py="4"
                                    px="4"
                                    lineHeight="1"
                                    size="md"
                                >
                                    Head over to the place →
                                </Button>
                            </Link>
                            <Text
                                fontSize="xs"
                                mt={2}
                                textAlign="center"
                                color="primary.800"
                                opacity="0.6"
                            >
                                No credit card required.
                            </Text>
                        </Stack>
                    </Box>

                    {/* boxSize='200px' */}
                    <Box >
                        <Image src={image} size="100%" rounded="1rem" shadow="2xl" objectFit='cover' htmlWidth='600px' htmlHeight='700px' />
                    </Box>
                </Flex>

                <Box bg="gray.50">

                    <Container maxW="container.md" centerContent py={[8, 28]}>
                        <SimpleGrid spacingX={10} spacingY={20} minChildWidth="300px">
                            {highlights.map(({ title, description, icon }) => (
                                <Box p={4} rounded="md" >
                                    <Text fontSize="4xl">{icon}</Text>

                                    <Text fontWeight={500}>{title}</Text>

                                    <Text color="gray.500" mt={4}>
                                        {description}
                                    </Text>
                                </Box>
                            ))}
                        </SimpleGrid>
                    </Container>
                </Box>
            </Box>
        </div>
    )
}

export default Landing