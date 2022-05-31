import { Avatar } from "@chakra-ui/avatar";
import { Box, Text } from "@chakra-ui/layout";
import { ChatState } from "../../Context/ChatProvider";

const searchdataListItem = ({ handleFunction }) => {
  const { searchdata } = ChatState();
  console.log(searchdata);
  for (let i=0;i<searchdata.length;i++)
  {
    console.log(searchdata[i]);
  }
  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      bg="#E8E8E8"
      _hover={{
        background: "#38B2AC",
        color: "white",
      }}
      w="100%"
      d="flex"
      alignItems="center"
      color="black"
      px={3}
      py={2}
      mb={2}
      borderRadius="lg"
    >
      <Avatar
        mr={2}
        size="sm"
        cursor="pointer"
        name={searchdata[0].name}
        src={searchdata[0].pic}
      />
      <Box>
        <Text>{searchdata[0].name}</Text>
        <Text fontSize="xs">
          <b>Email : </b>
          {searchdata[0].email}
        </Text>
      </Box>
    </Box>
  );
};

export default searchdataListItem;
