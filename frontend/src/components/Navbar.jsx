import {
  Container,
  Text,
  HStack,
  Button,
  Flex,
  useColorMode,
  Icon,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { IoMdMoon } from "react-icons/io";
import { MdWbSunny } from "react-icons/md";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW="1140px" px={2} mb={10}>
      <Flex
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
        h={16}
      >
        <Text
          fontSize={{
            base: "22",
            sm: "28",
          }}
          textTransform={"uppercase"}
          fontWeight={"bold"}
          bgGradient={"linear(to-r,  cyan.400, blue.500)"}
          bgClip={"text"}
        >
          <Link to="/">Product Store 🛒</Link>
        </Text>

        <HStack spacing={4}>
          <Link to="/create">
            <Button>
              <FiEdit fontSize={20} />
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode == "light" ? (
              <Icon as={IoMdMoon} />
            ) : (
              <Icon as={MdWbSunny} />
            )}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
