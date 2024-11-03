import { ClipLoader } from "react-spinners";
import { useColorModeValue } from "@chakra-ui/react";

const Spinner = ({ isLoading, size = 100 }) => {
  const spinnerColor = useColorModeValue("#4299E1", "#4FD1C5");

  return <ClipLoader loading={isLoading} color={spinnerColor} size={size} />;
};

export default Spinner;
