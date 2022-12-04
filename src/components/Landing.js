import React from 'react'
import { BrowserRouter as Router, Link as RRLink, Routes, Route } from "react-router-dom"

import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, Button, Center, Container, Flex, Heading, Image, Link, SimpleGrid, Stack, Text, Spacer } from '@chakra-ui/react'

import image from '../assets/rimage.jpg';

const Landing = () => {

    const highlights = [
        {
            icon: '🏡 ',
            title: 'Tokenized Real Estate',
            description:
                "Real world properties are represented in a decentralized manner in the form of tokens. Each token is unique and can be bought and sold in a transparent manner. ",
        },
        {
            icon: '💳 ',
            title: 'Additional sources of funding',
            description:
                "Tokenization opens up quality real estate to more investors and at smaller investment amounts. Investors are able diversify their property investments geographically from anywhere across the world.",
        },
        {
            icon: '🤖 ',
            title: 'Improved efficiency through automation',
            description:
                "Smart contracts can automate compliance with securities regulations, tailor digital assets directly according to investor demands as well as increase the speed of creating, issuing, and exchanging assets.",
        },
        {
            icon: '🔍 ',
            title: 'Improved transparency and access to records',
            description:
                "Blockchain technology enables transaction and property ownership records to be more accessible. This helps in facilitating market transactions and increasing investor confidence.",
        },
    ]

    return (
        <div>

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
                                Come own a brick in the estate
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
                                Tokenized real estate opportunites
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
                                Start on a path to building wealth.
                            </Text>
                        </Stack>
                    </Box>

                    <Box >
                        <Image src={image} size="100%" rounded="1rem" shadow="2xl" objectFit='cover' htmlWidth='600px' htmlHeight='700px' />
                    </Box>
                </Flex>

                <Box bg="gray.100" borderRadius='12px'>

                    <Container maxW="container.md" centerContent py={[8, 28]}>
                        <SimpleGrid spacingX={10} spacingY={20} minChildWidth="300px">
                            {highlights.map(({ title, description, icon }) => (
                                <Box p={4} rounded="md" >
                                    <Text fontSize="4xl">{icon}</Text>

                                    <Text fontWeight={500}>{title}</Text>

                                    <Text color="gray.700" mt={4}>
                                        {description}
                                    </Text>
                                </Box>
                            ))}
                        </SimpleGrid>
                    </Container>
                </Box>

                <Box alignItems='center' mt='48px' pb='64px' >
                    <Center>
                        <Heading size='lg'>Frequently Asked Questions</Heading>
                    </Center>
                </Box>

                <Flex >
                    <Box w='70px' h='10' bg='green.500' />
                    <Spacer />
                    <Accordion w='994px'>
                        <AccordionItem>
                            <h2>
                                <AccordionButton>
                                    <Box flex='1' textAlign='left' fontWeight='bold'>
                                        What is digital asset tokenization?
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={8}>
                                Tokenization describes the process of transforming traditional equity holdings into digital shares. These blockchain based digital "tokens" allow investors to view detailed information about their holdings, and make it possible to buy, sell, and transfer private assets online.
                            </AccordionPanel>
                        </AccordionItem>
                        <AccordionItem>
                            <h2>
                                <AccordionButton>
                                    <Box flex='1' textAlign='left' fontWeight='bold'>
                                        What are the costs associated with tokenization?
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={8}>
                                Cost of tokenization varies based on asset size and requirements. Tokenization is a small cost compared to the fees associated with a typical capital raise or real estate transaction. As such, tokenization is designed to be a very small addition to your asset's total cost of ownership.
                            </AccordionPanel>
                        </AccordionItem>


                        <AccordionItem>
                            <h2>
                                <AccordionButton>
                                    <Box flex='1' textAlign='left' fontWeight='bold'>
                                        Who verifies the integrity of digital deals and assets?
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={8}>
                                As with a traditional offering, this is the investor's responsibility. The Issuer must provide necessary documentation for asset due diligence. The addition of a digital asset tokenization does not change the investor requirements.
                            </AccordionPanel>
                        </AccordionItem>
                        <AccordionItem>
                            <h2>
                                <AccordionButton>
                                    <Box flex='1' textAlign='left' fontWeight='bold'>
                                        Who will be able to buy my tokenized real estate?
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={8}>
                                Only investors that are accredited and approved by the platform will be able to invest in tokenized real estate. BitEstate integrates KYC (know your customer), AML (anti-money laundering), and Accreditation services so all potential investors are properly verified. This process is done to ensure the online investment practice is regulation complaint.
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                    <Spacer />
                    <Box w='70px' h='10' bg='green.500' />
                </Flex>

                <Box bg="gray.200" mt={12}>

                    <Container maxW="container.lg" mt='90px'>
                        <Flex py={6}>
                            <Box>


                                <Text>Made by Eniayo Odubawo </Text>
                                <Link target='_blank' href='https://github.com/enilenz/' color='green'>Check my Github.</Link>
                            </Box>

                        </Flex>
                    </Container>
                </Box>


            </Box>
        </div>
    )
}

export default Landing