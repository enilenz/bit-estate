import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link as RRLink, Routes, Route } from "react-router-dom"
import { ethers } from "ethers";

import { Box, Button, ButtonGroup, Center, Flex, Heading, HStack, Image, Link, VStack, Tabs, TabList, Tab, TabPanel, TabPanels, Text, Spacer } from '@chakra-ui/react'

import Estates from './components/Estates';
import Landing from './components/Landing';
import Tokens from './components/Tokens';

function App() {

  const [currentAccount, setCurrentAccount] = useState('');
  const [accountBalance, setAccountBalance] = useState(0);
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const [signer, setSigner] = useState();

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);


  // const connectWallet = async () => {
  //   try {
  //     const { ethereum } = window;

  //     if (!ethereum) {
  //       alert("Get MetaMask -> https://metamask.io/");
  //       return;
  //     }
 
  //     const accounts = await ethereum.request({ method: "eth_requestAccounts" });
  //     setCurrentAccount(accounts[0]);
  //     setIsWalletConnected(true);

  //     const provider = new ethers.providers.Web3Provider(window.ethereum);
  //     setSigner(provider.getSigner());

  //    } catch (error) {
  //     console.log(error)
  //   }
  // };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask -> https://metamask.io/");
        return;
      }

      // Fancy method to request access to account.
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      setIsWalletConnected(true);
    
      // Boom! This should print out public address once we authorize Metamask.
      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setSigner(provider.getSigner());

      const balance = await provider.getBalance(currentAccount);
      //ethers.utils.formatEther(balance);
      const formatBalance = await ethers.utils.formatEther(balance);
      setAccountBalance(formatBalance);
      
    } catch (error) {
      console.log(error)
    }
    
  }

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log('Make sure you have metamask!');
      return;
    } else {
      console.log('We have the ethereum object', ethereum);
    }

    const accounts = await ethereum.request({ method: 'eth_accounts' });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log('Found an authorized account:', account);
      setCurrentAccount(account);
    } else {
      console.log('No authorized account found');
    }
  };

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

                <Button size='md' colorScheme='green' mt='24px' onClick={connectWallet}>
                  {isWalletConnected ?  ('Account Balance: '+ accountBalance + ' MATIC') : 'Connect Wallet'}
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
