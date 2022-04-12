import { border, Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";

import { Button2 } from "../styles/components";

export default function Staking() {
  const [balance, setBalance] = useState<number>(420.69);
  const [userLocks, setUserLocks] = useState<any>();
  const [selectedTier, setSelectedTier] = useState<number>(0);
  const [selectedAmount, setSelectedAmount] = useState<number>(0);

  useEffect(() => {
    console.log('selectedAmount', selectedAmount)
  }, [selectedAmount])

  const handleTierSelect = (tier) => {
    setSelectedTier(tier);
  };

  const handleAmount = (event) => {
    setSelectedAmount(event.target.value);
  };

  const handleAmountToMax = () => {
    setSelectedAmount(balance);
  };

  return (
    <div  className="application-view">
      <Heading
        fontSize="15.5px"
        fontWeight="bold"
        as={"h1"}
        mt="5px"
        textAlign="center"
      >
        Staking
      </Heading>

      <br></br>

      <Flex
        fontWeight="semibold"
        mt="25px"
        w="100%"
        h="20px"
        alignContent="center"
      >
        <Flex ml="20px">
          <p>Amount: </p>
          <input
            value={selectedAmount}
            onChange={(event) => handleAmount(event)}
            onBlur={(event) => handleAmount(event)}
            type="number"
            min={0}
            style={{ color: 'black', marginRight: '5px', padding: '2px'}}
          />
          <Button2 onClick={handleAmountToMax}>MAX</Button2>
        </Flex>
        <Flex mr="20px" ml="auto">
          <Text mb="15px" fontSize="15.5px" fontFamily="monospace">
            Lock Term:{" "}
          </Text>
          <Box mr="20px" fontFamily="monospace" fontSize="12.5px">
            <button
              style={{
                padding: "1px 6px",
                backgroundColor: selectedTier == 0 ? "white" : "gray",
                color: selectedTier == 0 ? "black" : "white",
                border: "2px",
                borderColor: "gray",
              }}
              onClick={() => handleTierSelect(0)}
            >
              0
            </button>
            <button
              style={{
                padding: "1px 6px",
                backgroundColor: selectedTier == 1 ? "white" : "gray",
                color: selectedTier == 1 ? "black" : "white",
                border: "2px",
                borderColor: "gray",
              }}
              onClick={() => handleTierSelect(1)}
              className={selectedTier == 1 ? "toggledButton" : "button2"}
            >
              3
            </button>
            <button
              style={{
                padding: "1px 6px",
                backgroundColor: selectedTier == 2 ? "white" : "gray",
                color: selectedTier == 2 ? "black" : "white",
                border: "2px",
                borderColor: "gray",
              }}
              onClick={() => handleTierSelect(2)}
              className={selectedTier == 2 ? "toggledButton" : "button2"}
            >
              6
            </button>
            <button
              style={{
                padding: "1px 6px",
                backgroundColor: selectedTier == 3 ? "white" : "gray",
                color: selectedTier == 3 ? "black" : "white",
                border: "2px",
                borderColor: "gray",
              }}
              onClick={() => handleTierSelect(3)}
              className={selectedTier == 3 ? "toggledButton" : "button2"}
            >
              9
            </button>
            <button
              style={{
                padding: "1px 6px",
                backgroundColor: selectedTier == 4 ? "white" : "gray",
                color: selectedTier == 4 ? "black" : "white",
                border: "2px",
                borderColor: "gray",
              }}
              onClick={() => handleTierSelect(4)}
              className={selectedTier == 4 ? "toggledButton" : "button2"}
            >
              12
            </button>
            <p>months</p>
            <a>?</a>
          </Box>
          <Button2 onClick={() => console.log(selectedTier, selectedAmount)}>
            CREATE
          </Button2>
        </Flex>
      </Flex>
      <Box
        fontWeight="semibold"
        mt="5px"
        h="20px"
        alignContent="center"
        fontFamily="monospace"
        fontSize="12.5px"
      >
        <Flex ml="20px" textAlign="center">
          <Text>
            Wallet Balance: {balance} <b>STRAD</b>
          </Text>
        </Flex>
      </Box>

      <br></br>
      <br></br>
      <Box fontFamily="monospace" fontWeight="semibold">
        <Text textAlign="center" fontSize="15.5px" fontWeight="bold" mt="5px">
          HISTORY
        </Text>
        <div>
          <Text textAlign="center" fontSize="12.5px" mb="15px">
            You have no past or present deposits.
          </Text>
          {/* TODO: want to put a table in here that displays all the user's locks, past and present */}
        </div>
      </Box>
    </div>
  );
}
