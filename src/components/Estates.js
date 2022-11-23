import React from 'react'

import {AspectRatio, Box, Button, ButtonGroup, Center, Flex, Heading, HStack, Image, Link, VStack, Tabs, TabList, Tab, TabPanel, TabPanels, Text, Spacer } from '@chakra-ui/react'

const Estates = () => {
    return (
        <div>
            <Box>
                <AspectRatio maxW='400px' ratio={5 / 3}>
                    <Image src='https://bit.ly/naruto-sage' alt='naruto' objectFit='cover' />
                </AspectRatio>
            </Box>
        </div>
    )
}

export default Estates