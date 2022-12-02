import React from 'react'

import { AspectRatio, Box, Button, ButtonGroup, Card, CardHeader, CardBody, CardFooter, Center, Container, Divider, Flex, Heading, HStack, Image, Link, VStack, Stack, Tabs, TabList, Tab, TabPanel, TabPanels, Text, SimpleGrid, Spacer } from '@chakra-ui/react'

import image6 from '../assets/prop6.jpg';
import image7 from '../assets/prop7.jpg';
import image8 from '../assets/prop8.jpg';
import image9 from '../assets/prop9.jpg';

const Estates = () => {

    const estates = [
        {

        }
    ]

    return (
        <div>
            <Box>
                <Box borderRadius='12px'>
                    {/* spacingX={10} spacingY={20} minChildWidth="300px" */}
                    <Container maxW="container.lg" centerContent py={[8, 18]} >
                        <SimpleGrid spacingX={10} spacingY={10} minChildWidth="450px" columns={2} row={2}>
                            {/* {highlights.map(({ title, description, icon }) => (
                                <Box p={4} rounded="md" >
                                    <Text fontSize="4xl">{icon}</Text>

                                    <Text fontWeight={500}>{title}</Text>

                                    <Text color="gray.500" mt={4}>
                                        {description}
                                    </Text>
                                </Box>
                            ))} */}

                            <Card shadow="2xl"  >
                                <CardBody >
                                    <Image
                                        src={image6}
                                        alt='Green double couch with wooden legs'
                                        borderRadius='lg' size="100%" rounded="1rem" objectFit='cover' htmlWidth='600px' htmlHeight='700px'
                                    />
                                    <Stack mt='6' spacing='3'>
                                        <Heading size='md'>Golden Experience Apartments</Heading>
                                        <Text
                                            fontSize="md"  color="primary.800" opacity="0.8">
                                            Lekki Phase 1, Lekki, Lagos
                                        </Text>
                                        <Text color='green.600' fontSize='md' fontWeight={500}>
                                            Legal Documents: <Link color='black' ml='3px' href='https://ipfs.io/ipfs/QmYxnP59ccW4iseBzHK1VohjzFR65rGSy6h4HtFKJ66xA7' target='_blank'>http://bit.ly/3EIvKL</Link>
                                        </Text>
                                        <Text>
                                            This sofa is perfect for modern tropical spaces, baroque inspired
                                            spaces, earthy toned spaces and for people who love a chic design with a
                                            sprinkle of vintage design.
                                        </Text>
                                       
                                        <Text color='green.600' fontSize='2xl'>
                                            ROI : 8%
                                        </Text>
                                        <HStack >
                                            <Text fontWeight={500}>Token Quantity: 4000</Text>
                                            <Spacer></Spacer>
                                            <Text fontWeight={500}>Token Price: 2 MATIC</Text>
                                        </HStack>
                                    </Stack>
                                </CardBody>
                                <Divider />
                                <CardFooter>
                                    <ButtonGroup spacing='2'>
                                        <Button variant='solid' colorScheme='green'>
                                            Buy now
                                        </Button>
                                        <Button variant='ghost' colorScheme='green'>
                                            Add to cart
                                        </Button>
                                    </ButtonGroup>
                                </CardFooter>
                            </Card>

                            <Card shadow="2xl" >
                                <CardBody>
                                    <Image
                                        src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                                        alt='Green double couch with wooden legs'
                                        borderRadius='lg'
                                    />
                                    <Stack mt='6' spacing='3'>
                                        <Heading size='md'>Living room Sofa</Heading>
                                        <Text>
                                            This sofa is perfect for modern tropical spaces, baroque inspired
                                            spaces, earthy toned spaces and for people who love a chic design with a
                                            sprinkle of vintage design.
                                        </Text>
                                        <Text color='blue.600' fontSize='2xl'>
                                            $450
                                        </Text>
                                    </Stack>
                                </CardBody>
                                <Divider />
                                <CardFooter>
                                    <ButtonGroup spacing='2'>
                                        <Button variant='solid' colorScheme='blue'>
                                            Buy now
                                        </Button>
                                        <Button variant='ghost' colorScheme='blue'>
                                            Add to cart
                                        </Button>
                                    </ButtonGroup>
                                </CardFooter>
                            </Card>

                            <Card shadow="2xl">
                                <CardBody>
                                    <Image
                                        src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                                        alt='Green double couch with wooden legs'
                                        borderRadius='lg'
                                    />
                                    <Stack mt='6' spacing='3'>
                                        <Heading size='md'>Living room Sofa</Heading>
                                        <Text>
                                            This sofa is perfect for modern tropical spaces, baroque inspired
                                            spaces, earthy toned spaces and for people who love a chic design with a
                                            sprinkle of vintage design.
                                        </Text>
                                        <Text color='blue.600' fontSize='2xl'>
                                            $450
                                        </Text>
                                    </Stack>
                                </CardBody>
                                <Divider />
                                <CardFooter>
                                    <ButtonGroup spacing='2'>
                                        <Button variant='solid' colorScheme='blue'>
                                            Buy now
                                        </Button>
                                        <Button variant='ghost' colorScheme='blue'>
                                            Add to cart
                                        </Button>
                                    </ButtonGroup>
                                </CardFooter>
                            </Card>

                            <Card shadow="2xl">
                                <CardBody>
                                    <Image
                                        src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                                        alt='Green double couch with wooden legs'
                                        borderRadius='lg'
                                    />
                                    <Stack mt='6' spacing='3'>
                                        <Heading size='md'>Living room Sofa</Heading>
                                        <Text>
                                            This sofa is perfect for modern tropical spaces, baroque inspired
                                            spaces, earthy toned spaces and for people who love a chic design with a
                                            sprinkle of vintage design.
                                        </Text>
                                        <Text color='blue.600' fontSize='2xl'>
                                            $450
                                        </Text>
                                    </Stack>
                                </CardBody>
                                <Divider />
                                <CardFooter>
                                    <ButtonGroup spacing='2'>
                                        <Button variant='solid' colorScheme='blue'>
                                            Buy now
                                        </Button>
                                        <Button variant='ghost' colorScheme='blue'>
                                            Add to cart
                                        </Button>
                                    </ButtonGroup>
                                </CardFooter>
                            </Card>
                        </SimpleGrid>
                    </Container>
                </Box>
            </Box>
        </div>
    )
}

export default Estates