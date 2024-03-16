import { Box, Text, Flex, Button, Avatar } from "@chakra-ui/react";
import campaignData from "../../context/campaign.json";

export default function Home() {
  const ethLondonCampaign = campaignData.campaigns.find(
    (campaign) => campaign.name === "ETHLondon"
  );
  return (
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
            <Text>43</Text>
            <Text>Candidates</Text>
          </Flex>
          <Flex flexDirection={"column"} width={"100%"} alignItems={"center"}>
            <Text>43</Text>
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
      <Flex width={"100%"} paddingY={"20px"} gap={"20px"} flexDirection={'column'}>
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
                <Button>Vote</Button>
                <Text>10</Text>
              </Flex>
            </Flex>
          ))}
      </Flex>
    </Box>
  );
}
