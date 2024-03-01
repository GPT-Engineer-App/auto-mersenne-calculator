import React, { useState, useEffect } from "react";
import { VStack, Text, Box, Spinner } from "@chakra-ui/react";

const isMersennePrime = (n) => {
  let s = 4;
  for (let i = 0; i < n - 2; i++) {
    s = (s * s - 2) % Math.pow(2, n);
  }
  return s === 0;
};

const getNextMersennePrime = (start) => {
  let p = start;
  while (!isMersennePrime(p)) {
    p++;
  }
  return p;
};

const Index = () => {
  const [currentPrime, setCurrentPrime] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  useEffect(() => {
    const findMersennePrimes = async () => {
      let start = 3;
      setIsCalculating(true);

      while (true) {
        const nextPrime = await getNextMersennePrime(start);
        setCurrentPrime(2 ** nextPrime - 1);
        start = nextPrime + 1;
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Delay to simulate the ongoing process
      }
    };

    findMersennePrimes();
  }, []);

  return (
    <VStack spacing={4} padding={8}>
      <Text fontSize="xl" fontWeight="bold">
        Mersenne Prime Generator
      </Text>
      <Box>
        {isCalculating ? (
          <>
            <Spinner size="xl" label="Calculating..." />
            <Text mt={2}>Calculating next Mersenne Prime...</Text>
          </>
        ) : (
          <Text>No current calculation in progress</Text>
        )}
      </Box>
      {currentPrime && <Text>Latest Mersenne Prime: {currentPrime}</Text>}
    </VStack>
  );
};

export default Index;
