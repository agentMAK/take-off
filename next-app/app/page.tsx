"use client";

import { Box, Flex, Link, Progress, Text } from "@chakra-ui/react";
import { Header } from "./components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <Box>
        <Flex
          flexDirection={"column"}
          mt={"50px"}
          gap={"20px"}
          width={"fit-content"}
          marginX={"auto"}
        >
          <Link
            href={"/campaign/ethglobal-london"}
            _hover={{ textDecoration: "none" }}
          >
            <Flex
              width={"100%"}
              gap={"10px"}
              _hover={{ bgColor: "gray.200" }}
              cursor={"pointer"}
              padding={"10px"}
            >
              <Box boxSize="100px" bgColor={"blue"} flexShrink={0} />

              <Flex
                flexDirection={"column"}
                gap={"10px"}
                justifyContent={"space-between"}
                width={"100%"}
              >
                <Text>Scholarship for ETHGlobal London</Text>
                <Progress colorScheme="green" size="sm" value={20} />
                <Flex justifyContent={"space-between"}>
                  <Text>Open</Text>
                  <Text>$15,000</Text>
                </Flex>
              </Flex>
            </Flex>
          </Link>

          <Flex
            width={"100%"}
            gap={"10px"}
            _hover={{ bgColor: "gray.200" }}
            cursor={"pointer"}
            padding={"10px"}
          >
            <Box boxSize="100px" bgColor={"blue"} flexShrink={0} />

            <Flex
              flexDirection={"column"}
              gap={"10px"}
              justifyContent={"space-between"}
              width={"100%"}
            >
              <Text>Scholarship for ETHGlobal Lisbon</Text>
              <Progress colorScheme="gray" size="sm" value={0} />
              <Flex justifyContent={"space-between"}>
                <Text>Coming Soon</Text>
                <Text>$5,000</Text>
              </Flex>
            </Flex>
          </Flex>

          <Flex
            width={"100%"}
            gap={"10px"}
            _hover={{ bgColor: "gray.200" }}
            cursor={"pointer"}
            padding={"10px"}
          >
            <Box boxSize="100px" bgColor={"blue"} flexShrink={0} />

            <Flex
              flexDirection={"column"}
              gap={"10px"}
              justifyContent={"space-between"}
              width={"100%"}
            >
              <Text>Scholarship for ETHGlobal New York</Text>
              <Progress colorScheme="gray" size="sm" value={100} />
              <Flex justifyContent={"space-between"}>
                <Text>Expired</Text>
                <Text>$10,000</Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
