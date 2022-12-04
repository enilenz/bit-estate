import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link as RRLink, Routes, Route } from "react-router-dom"
import { ethers } from "ethers";
import { BigNumber } from 'ethers';

import { Box, Button, Flex, Heading, HStack, Link, Text, Spacer} from '@chakra-ui/react'

import Estates from './components/Estates';
import Landing from './components/Landing';
import Tokens from './components/Tokens';

import abi from './contract.abi.json';

function App() {

  const [currentAccount, setCurrentAccount] = useState('');
  const [accountBalance, setAccountBalance] = useState(0);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [propertyOne, setPropOne] = useState(0)
  const [propertyTwo, setPropTwo] = useState(0)
  const [propertyThree, setPropThree] = useState(0)
  const [propertyFour, setPropFour] = useState(0)
  const [Successful, setSuccessful] = useState(false)

  const [signer, setSigner] = useState();

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask -> https://metamask.io/");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      setIsWalletConnected(true);

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setSigner(provider.getSigner());

      const balance = await provider.getBalance(currentAccount);
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

  async function buyToken(tokenAmount, id) {
    if (typeof window.ethereum !== "undefined") {
      const contractAddress = "0xF5eEe3334bF53668D09d7FA4c5Aed3a63863eC65";

      const contract = new ethers.Contract(contractAddress, abi, signer);
      let p = 0.1;
      if (tokenAmount == 1) {
        p = 0.1;
      } else if (tokenAmount == 2) {
        p = 0.2;
      } else if (tokenAmount == 3) {
        p = 0.3;
      } else if (tokenAmount == 4) {
        p = 0.4;
      } else if (tokenAmount == 5) {
        p = 0.5;
      } else if (tokenAmount == 6) {
        p = 0.6;
      } else if (tokenAmount == 7) {
        p = 0.7;
      } else if (tokenAmount == 8) {
        p = 0.8;
      } else if (tokenAmount == 9) {
        p = 0.9;
      } else if (tokenAmount == 10) {
        p = 1;
      }

      console.log('hthfyghuitgtgiu ' + id)

      try {
        await contract.buyTokens(9, {
          value: ethers.utils.parseEther(p.toString())
        });

        setSuccessful(true)
 
        window.alert("Tokens bought successfully")

      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Please install MetaMask");
    }
  }


  return (
    <Router>
      <div className="App">

        <Box bg='#FFFFFF' color='#38A169' p='6px' pt='12px' borderWidth='1px' borderRadius='sm' pb='6px'>
          <Flex minWidth='max-content' alignItems='center' gap='2'>

            <Box p='2' pl='8px'>
              <Link as={RRLink} to="/">
                <Heading fontWeight='600' fontSize='24px'>Bit Estate</Heading>
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
                  {isWalletConnected ? ('Account Balance: ' + accountBalance + ' MATIC') : 'Connect Wallet'}
                </Button>

              </HStack>
            </Box>


          </Flex>
        </Box>

        <Routes>

          <Route ex path="/" element={<Landing />}></Route>
          <Route ex path="/estates" element={<Estates buyToken={buyToken} />}></Route>
          <Route ex path="/tokens" element={<Tokens />}></Route>

        </Routes>

      </div>
    </Router>
  );
}

export default App;
