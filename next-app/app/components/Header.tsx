import { Box, Button, Flex, Link, Text, Image } from "@chakra-ui/react";

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
      <Link href={'/'}><Image src={'/images/logo_purple.png'} alt={'take off'} height={'40px'} /></Link>
      <Link href={"/claim-votes"}>
        <Button colorScheme="teal" variant="outline">
          <Text>0 Votes</Text>
        </Button>
      </Link>
    </Flex>
  );
};
