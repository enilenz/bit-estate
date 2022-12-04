import React, { useState } from 'react'

import { Box, Button, ButtonGroup, Card, CardBody, CardFooter, Center, Container, Divider, Flex, Heading, HStack, Icon, Image, Link, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Stack, Text, SimpleGrid, Spacer } from '@chakra-ui/react'
import { FaToilet } from "react-icons/fa";
import { FaBath } from "react-icons/fa";
import { BsFillHouseFill } from "react-icons/bs";
import { AiFillCar } from "react-icons/ai";

import image6 from '../assets/prop6.jpg';
import image7 from '../assets/prop7.jpg';
import image8 from '../assets/prop8.jpg';
import image9 from '../assets/prop9.jpg';

const Estates = ({ buyToken }) => {
    const [tokenAmount, setTokenAmount] = useState(1);
    const [isTokenBought, setTokenBought] = useState(false);

    async function finalBuy(id) {

        buyToken(tokenAmount, id);

        setTokenBought(true)

    }


    const estates = [
        {
            'name': 'Golden Experience Apartments',
            'address': 'Lekki Phase 1, Lekki, Lagos',
            'legalDocuments': 'http://bit.ly/3EIvKL',
            'toilets': 4,
            'baths': 6,
            'landSqm': 500,
            'parkingSpaces': 5,
            'roi': 6,
            'tokenQuantity': 4000,
            'tokenPrice': 0.1,
            'image': image6,
            'ipfs': 'https://ipfs.io/ipfs/QmZ1zJbWugFE8hE81pXTbhiBrXezyYZSKCfrMgWjZf4VWN',
            'resellable': true,
            'minimumHoldPeriod': 2,
            'holdPeriod': 5,
            'id': 1
        },
        {
            'name': 'Brown Hill ',
            'address': 'Lekki Phase 1, Lekki, Lagos',
            'legalDocuments': 'http://bit.ly/PE8v7L',
            'toilets': 4,
            'baths': 5,
            'landSqm': 345,
            'parkingSpaces': 4,
            'roi': 10,
            'tokenQuantity': 1000,
            'tokenPrice': 0.1,
            'image': image7,
            'ipfs': 'https://ipfs.io/ipfs/QmSdTxL3iocdyFdErWaKpXtoHJhBF6yMs54MCPzR1qtFed',
            'resellable': true,
            'minimumHoldPeriod': 3,
            'holdPeriod': 5,
            'id': 2
        },
        {
            'name': 'Northern Lights',
            'address': 'Abeokuta, Ogun',
            'legalDocuments': 'http://bit.ly/17IvKB',
            'toilets': 3,
            'baths': 4,
            'landSqm': 447,
            'parkingSpaces': 4,
            'roi': 13,
            'tokenQuantity': 500,
            'tokenPrice': 0.1,
            'image': image8,
            'ipfs': 'https://ipfs.io/ipfs/QmTxLmF8otyVJzNnMLcYDEyTUkoJpb87XFB6bCApJu3E4z',
            'resellable': true,
            'minimumHoldPeriod': 2,
            'holdPeriod': 5,
            'id': 3
        },
        {
            'name': 'Clear Stone Apartments',
            'address': 'Gwarinpa, Abuja',
            'legalDocuments': 'http://bit.ly/4O3vKL',
            'toilets': 5,
            'baths': 6,
            'landSqm': 525,
            'parkingSpaces': 5,
            'roi': 8,
            'tokenQuantity': 2500,
            'tokenPrice': 0.1,
            'image': image9,
            'ipfs': 'https://ipfs.io/ipfs/QmT2h75dGbEKVFyDpeYRQQKBiGn1cHNsm7a4bagswqXGYj',
            'resellable': false,
            'minimumHoldPeriod': 2,
            'holdPeriod': 5,
            'id': 4
        }
    ]

    return (
        <div>
            <Box>
                <Box borderRadius='12px'>
                    <Container maxW="container.lg" centerContent py={[8, 18]} >
                        <SimpleGrid spacingX={10} spacingY={10} minChildWidth="450px" columns={2} row={2}>

                            {estates.map(({ tokenQuantity, tokenPrice, image, id, minimumHoldPeriod, holdPeriod, resellable, name, address, roi, legalDocuments, ipfs, toilets, baths, landSqm, parkingSpaces }) => (
                                <Card shadow="2xl"  >
                                    <CardBody >
                                        <Image
                                            src={image}
                                            alt='Green double couch with wooden legs'
                                            borderRadius='lg' size="100%" rounded="1rem" objectFit='cover' htmlWidth='600px' htmlHeight='700px'
                                        />
                                        <Stack mt='6' spacing='3'>
                                            <Heading size='md'>{name}</Heading>
                                            <Text
                                                fontSize="md" color="primary.800" opacity="0.8">
                                                {address}
                                            </Text>
                                            <Text color='green.600' fontSize='md' fontWeight={500} pb='16px'>
                                                Legal Documents: <Link color='black' ml='3px' href={ipfs} target='_blank'>{legalDocuments}</Link>
                                            </Text>

                                            <Flex >
                                                <Stack>
                                                    <Center >
                                                        <Icon as={FaToilet} />

                                                    </Center>
                                                    <Text>{toilets} Toilets</Text>
                                                </Stack>
                                                <Spacer />
                                                <Stack>
                                                    <Center >
                                                        <Icon as={FaBath} />

                                                    </Center>
                                                    <Text>{baths} Baths</Text>
                                                </Stack>
                                                <Spacer />
                                                <Stack>
                                                    <Center >
                                                        <Icon as={BsFillHouseFill} />

                                                    </Center>
                                                    <Text>{landSqm} sqm </Text>
                                                </Stack>
                                                <Spacer />
                                                <Stack>
                                                    <Center >
                                                        <Icon as={AiFillCar} />

                                                    </Center>
                                                    <Text>{parkingSpaces} Parking Spaces</Text>
                                                </Stack>
                                            </Flex>
                                            <Text>
                                                These houses are perfect for modern tropical spaces, baroque inspired
                                                spaces, earthy toned spaces and for people who love a chic design with a
                                                sprinkle of vintage design.
                                            </Text>

                                            <Text color='green.600' fontSize='2xl'>
                                                ROI : {roi}%
                                            </Text>
                                            <HStack >
                                                <Text fontWeight={500}>Token Quantity: {tokenQuantity}</Text>
                                                <Spacer></Spacer>
                                                <Text fontWeight={500}>Token Price: {tokenPrice} MATIC</Text>
                                            </HStack>
                                            <Text fontSize="md" color="primary.800" opacity="1">Hold period: {holdPeriod} years</Text>
                                            {resellable ?
                                                <Text fontSize="md" color="primary.800" opacity="0.8">Token is resellable after a {minimumHoldPeriod} year minimum hold period</Text> :
                                                <Text fontSize="md" color="primary.800" opacity="0.8">Token is not resellable</Text>
                                            }

                                        </Stack>
                                    </CardBody>
                                    <Divider />
                                    <CardFooter>
                                        <ButtonGroup spacing='2'>
                                            <Button variant='solid' colorScheme='green' onClick={() => finalBuy(id)}>
                                                Buy now
                                            </Button>

                                            <NumberInput keepWithinRange={true} defaultValue={1} min={1} max={10} onChange={(valueString) => setTokenAmount(valueString)}>
                                                <NumberInputField />
                                                <NumberInputStepper>
                                                    <NumberIncrementStepper />
                                                    <NumberDecrementStepper />
                                                </NumberInputStepper>
                                            </NumberInput>

                                        </ButtonGroup>

                                    </CardFooter>
                                </Card>
                            ))}

                        </SimpleGrid>
                    </Container>
                </Box>
            </Box>
        </div>
    )
}

export default Estates