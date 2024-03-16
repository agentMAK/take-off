"use client"

import { Box, Button, Flex, Link, Text, Image } from "@chakra-ui/react";
import { createClient } from "@supabase/supabase-js";
import { useCallback, useEffect, useState } from "react";
import { supabase } from "../utils/supabase/client";

export const Header = () => {

  const address =  "0xtttt"

  const [votes, setVotes] = useState(0);
  const [isLoadingVotes, setIsLoadingVotes] = useState(false); // State to track loading status

  const getVotes = useCallback(
    async (address: string) => {
      setIsLoadingVotes(true); // Start loading
      const { data, error } = await supabase
        .from("voters")
        .select("votes")
        .eq("address", address);
      if (data && data.length > 0) {
        setVotes(data[0].votes);
      }
      setIsLoadingVotes(false); // End loading
    },
    []
  );

  useEffect(() => {
    if (address) {
      getVotes(address);
    }
  }, [getVotes, address]);
  return (
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
        <Button colorScheme="teal" variant="outline" isLoading={isLoadingVotes}>
          <Text>{votes} Votes</Text>
        </Button>
      </Link>
    </Flex>
  );
};
