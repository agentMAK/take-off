"use client";

import {
  Box,
  Text,
  Flex,
  Button,
  Avatar,
  useToast,
  Link,
  Image,
} from "@chakra-ui/react";
import campaignData from "../../context/campaign.json";
import { useCallback, useEffect, useState } from "react";
import { useWeb3 } from "@/app/context/useWeb3";
import { supabase } from "@/app/utils/supabase/client";

export default function Home() {
  const ethLondonCampaign = campaignData.campaigns.find(
    (campaign) => campaign.name === "ETHLondon"
  );

  type VoteCountsType = Record<string, number | undefined>;

  const [voteCounts, setVoteCounts] = useState<VoteCountsType>({});
  const [votes, setVotes] = useState(0);

  const address = "0xtttt";

  const toast = useToast();

  const addVote = async (
    applicant_address: string,
    campaign: string,
    name: string
  ) => {
    let { data, error } = await supabase
      .from("votes")
      .insert({ applicant_address: applicant_address, campaign: campaign });

    if (!error) {
      ({ data, error } = await supabase.rpc("vote", {
        _address: address,
      }));
    }

    if (!error) {
      toast({
        title: "Vote Added",
        description: `You successfully voted for ${name}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      await getVotes(address);
      const updatedCount = await countVotes(applicant_address, campaign);

      setVoteCounts((prevCounts) => ({
        ...prevCounts,
        [applicant_address]: updatedCount,
      }));
    } else {
      toast({
        title: "Vote Failed",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const countVotes = useCallback(async (address: string, campaign: string) => {
    const { data, error, count } = await supabase
      .from("votes")
      .select("*", { count: "exact" })
      .eq("applicant_address", address)
      .eq("campaign", campaign);

    if (!error && count !== null) {
      return count;
    }
  }, []);

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

  useEffect(() => {
    const fetchVoteCounts = async () => {
      if (!ethLondonCampaign) return;
      const counts: VoteCountsType = {};
      for (const applicant of ethLondonCampaign.applicants) {
        const count = await countVotes(applicant.address, "ethlondon");
        counts[applicant.address] = count;
      }
      setVoteCounts(counts);
    };

    fetchVoteCounts();
  }, [countVotes, ethLondonCampaign]);

  // const {
  //   address,
  //   getUserAddress,
  //   sendCUSD,
  //   mintMinipayNFT,
  //   getNFTs,
  //   signTransaction,
  // } = useWeb3();

  // const [cUSDLoading, setCUSDLoading] = useState(false);

  // async function signMessage() {
  //   setCUSDLoading(true);
  //   try {
  //     await signTransaction();
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setCUSDLoading(false);
  //   }
  // }
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
        <Box borderBottom={"1px solid #C3CFD9"}>
          <Box paddingY={"10px"}>
            <Flex width={"100%"} justifyContent={"space-between"} mb={"20px"}>
              <Text fontSize={"30px"}>ETHGlobal London</Text>
              <Button>Apply</Button>
            </Flex>
            <Text>
              ETHGlobal London is a premier event for developers, entrepreneurs,
              and enthusiasts in the Ethereum ecosystem, focusing on innovation,
              networking, and collaboration in blockchain technology.
            </Text>
          </Box>
          <Flex paddingY={"10px"}>
            <Flex flexDirection={"column"} width={"100%"} alignItems={"center"}>
              <Text>3</Text>
              <Text>Candidates</Text>
            </Flex>
            <Flex flexDirection={"column"} width={"100%"} alignItems={"center"}>
              <Text>0</Text>
              <Text>Voters</Text>
            </Flex>
            <Flex flexDirection={"column"} width={"100%"} alignItems={"center"}>
              <Text>10</Text>
              <Text>Winners</Text>
            </Flex>
            <Flex flexDirection={"column"} width={"100%"} alignItems={"center"}>
              <Text>$5k</Text>
              <Text>Prize Pool</Text>
            </Flex>
          </Flex>
        </Box>
        <Flex
          width={"100%"}
          paddingY={"20px"}
          gap={"20px"}
          flexDirection={"column"}
        >
          {ethLondonCampaign &&
            ethLondonCampaign.applicants.map((applicant, index) => (
              <Flex
                key={index}
                justifyContent={"space-between"}
                width={"100%"}
                alignItems={"center"}
              >
                <Flex gap={"10px"}>
                  <Avatar boxSize={"30px"} />
                  <Text>{applicant.name}</Text>
                </Flex>
                <Flex gap={"10px"} alignItems={"center"}>
                  <Button>View</Button>
                  <Button
                    onClick={() =>
                      addVote(applicant.address, "ethlondon", applicant.name)
                    }
                    isDisabled={votes === 0}
                  >
                    Vote
                  </Button>
                  <Text width={"20px"} textAlign={"right"}>
                    {voteCounts[applicant.address] ?? 0}
                  </Text>
                </Flex>
              </Flex>
            ))}
        </Flex>
      </Box>
    </>
  );
}
