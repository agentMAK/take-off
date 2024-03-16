import { Flex, Text } from "@chakra-ui/react";

export const Header = () => {
  return (
    <Flex
      width={"100%"}
      borderBottom={"1px solid #C3CFD9"}
      height={"80px"}
      justifyContent={"space-between"}
      alignItems={"center"}
      paddingX={"10px"}
    >
      <Text>Take Off</Text>
      <Text>10 Votes</Text>
    </Flex>
  );
};
