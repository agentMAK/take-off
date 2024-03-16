import { Box, Text, Flex, Button } from "@chakra-ui/react";

export default function Home() {
  return (
    <Box padding={"10px"}>
      <Flex alignItems={'center'} flexDirection={'column'}>
      <Flex flexDirection={"column"} maxWidth={'300px'} justifyContent={'center'} gap={'10px'} mt={'75px'} textAlign={'center'}>
        <Text>Celo Votes</Text>
        <Text fontSize={'30px'}>10</Text>
        <Text>Votes</Text>
        <Button>Stake 0 cUSD</Button>
      </Flex>
      <Flex mt={'50px'} gap={'50px'}>
        <Flex flexDirection={'column'} alignItems={'center'}>
          <Text>Total Votes Available</Text>
          <Text>10</Text>
        </Flex>
        <Flex flexDirection={'column'} alignItems={'center'} textAlign={'center'}>
          <Text>Total Votes Used</Text>
          <Text>10</Text>
        </Flex>
      </Flex>
      </Flex>
    </Box>
  );
}
