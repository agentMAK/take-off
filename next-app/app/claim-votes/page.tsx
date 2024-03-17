"use client";

import {
  Box,
  Text,
  Flex,
  Button,
  useToast,
  Link,
  Image,
} from "@chakra-ui/react";
import { createClient } from "@supabase/supabase-js";
import { useWeb3 } from "@/app/context/useWeb3";
import { useCallback, useEffect, useState } from "react";
import { supabase } from "../utils/supabase/client";
import { IDKitWidget, ISuccessResult, VerificationLevel } from "@worldcoin/idkit";
import { VerifyReply } from "@/pages/api/verify";

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

  const handleProof = async (result: ISuccessResult) => {
    console.log("Proof received from IDKit:\n", JSON.stringify(result)); // Log the proof from IDKit to the console for visibility
    const reqBody = {
      merkle_root: result.merkle_root,
      nullifier_hash: result.nullifier_hash,
      proof: result.proof,
      verification_level: result.verification_level,
      action: process.env.NEXT_PUBLIC_WLD_ACTION,
      signal: "",
    };
    console.log(
      "Sending proof to backend for verification:\n",
      JSON.stringify(reqBody)
    ); // Log the proof being sent to our backend for visibility
    const res: Response = await fetch("/api/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    });
    const data: VerifyReply = await res.json();
    console.log("verify");
    if (res.status == 200) {
      console.log("Successful response from backend:\n", data); // Log the response from our backend for visibility
    } else {
      throw new Error(
        `Error code ${res.status} (${data.code}): ${data.detail}` ??
          "Unknown error."
      ); // Throw an error if verification fails
    }
  };

  const onSuccess = () => {
    console.log("Success");
    giveVotes(address)
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
          <Flex gap={"50px"} flexDirection={"column"}>
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

              <IDKitWidget
                app_id="app_staging_001c10e1b5a0b9d5088279095f2722be"
                action="award-vote"
                verification_level={VerificationLevel.Device}
                handleVerify={handleProof}
                onSuccess={onSuccess}
              >
                {({ open }) => (
                  <Button onClick={open}>
                    Verify with World ID
                  </Button>
                )}
              </IDKitWidget>
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
