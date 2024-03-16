"use client";

import { Box, Text, Flex, Button, useToast, Link, Image } from "@chakra-ui/react";
import { createClient } from "@supabase/supabase-js";
import { useWeb3 } from "@/app/context/useWeb3";
import { useCallback, useEffect, useState } from "react";
import { supabase } from "../utils/supabase/client";

export default function Home() {
  // const {
  //   address,
  //   getUserAddress,
  //   sendCUSD,
  //   mintMinipayNFT,
  //   getNFTs,
  //   signTransaction,
  // } = useWeb3();

  const address = "0xtttt";

  const toast = useToast();

  const [votes, setVotes] = useState(0);

  const getVotes = useCallback(async (address: string) => {
    const { data, error } = await supabase
      .from("voters")
      .select("votes")
      .eq("address", address);
    if (data && data.length > 0) {
      setVotes(data[0].votes);
    }
  }, []);

  useEffect(() => {
    if (address) {
      getVotes(address);
    }
  }, [address, getVotes]);

  const giveVotes = async (address: string) => {
    const { data, error } = await supabase.rpc("increment_votes", {
      _address: address,
    });
    if (!error) {
      toast({
        title: "Vote Added",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
    await getVotes(address);
  };

  return (
    <>
      <Flex
        width={"100%"}
        borderBottom={"1px solid #C3CFD9"}
        height={"80px"}
        justifyContent={"space-between"}
        alignItems={"center"}
        paddingX={"10px"}
      >
        <Link href={"/"}>
          <Image
            src={"/images/logo_purple.png"}
            alt={"take off"}
            height={"40px"}
          />
        </Link>
        <Link href={"/claim-votes"}>
          <Button colorScheme="teal" variant="outline">
            <Text>{votes} Votes</Text>
          </Button>
        </Link>
      </Flex>
      <Box padding={"10px"}>
        <Flex
          alignItems={"center"}
          flexDirection={"column"}
          mt={"100px"}
          gap={"100px"}
        >
          <Flex gap={"50px"}>
            <Flex
              flexDirection={"column"}
              maxWidth={"300px"}
              justifyContent={"center"}
              gap={"10px"}
              textAlign={"center"}
              width={"100%"}
            >
              <Text>Claim 10 Votes</Text>
              <Button onClick={() => address && giveVotes(address)}>
                Stake 10 cUSD
              </Button>
            </Flex>
            <Flex
              flexDirection={"column"}
              maxWidth={"300px"}
              justifyContent={"center"}
              gap={"10px"}
              textAlign={"center"}
              width={"100%"}
            >
              <Text>Claim 10 Votes</Text>

              <Button onClick={() => address && giveVotes(address)} isDisabled>
                Connect Worldcoin
              </Button>
            </Flex>
          </Flex>
          <Flex gap={"50px"}>
            <Flex flexDirection={"column"} alignItems={"center"}>
              <Text>Total Votes Available</Text>
              <Text>{votes}</Text>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
