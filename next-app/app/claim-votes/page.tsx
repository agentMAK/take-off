import { Box, Text, Flex, Button } from "@chakra-ui/react";

export default function Home() {
  return (
    <Box padding={"10px"}>
      <Flex
        alignItems={"center"}
        flexDirection={"column"}
        mt={"100px"}
        gap={"100px"}
      >
        <Flex gap={'50px'}>
          <Flex
            flexDirection={"column"}
            maxWidth={"300px"}
            justifyContent={"center"}
            gap={"10px"}
            textAlign={"center"}
            width={'100%'}
          >
            <Text>Celo</Text>
            <Text fontSize={"30px"} fontWeight={'medium'}>0</Text>
            <Text>Votes</Text>
            <Button>Stake 10 cUSD</Button>
          </Flex>
          <Flex
            flexDirection={"column"}
            maxWidth={"300px"}
            justifyContent={"center"}
            gap={"10px"}
            textAlign={"center"}
            width={'100%'}
          >
            <Text>WorldCoin</Text>
            <Text fontSize={"30px"} fontWeight={'medium'}>0</Text>
            <Text>Votes</Text>
            <Button>Connect Worldcoin</Button>
          </Flex>
        </Flex>
        <Flex gap={"50px"}>
          <Flex flexDirection={"column"} alignItems={"center"}>
            <Text>Total Votes Available</Text>
            <Text>0</Text>
          </Flex>
          <Flex
            flexDirection={"column"}
            alignItems={"center"}
            textAlign={"center"}
          >
            <Text>Total Votes Used</Text>
            <Text>0</Text>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
