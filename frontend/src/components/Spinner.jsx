import { ClipLoader } from "react-spinners";
import { useColorModeValue, Center } from "@chakra-ui/react";

const Spinner = ({ isLoading, size = 100 }) => {
  const color = useColorModeValue("gray.500", "blue.500");

  return (
    <Center h="100vh">
      <ClipLoader loading={isLoading} color={color} size={size} />
    </Center>
  );
};

export default Spinner;
