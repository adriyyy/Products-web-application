import {
  Box,
  Heading,
  HStack,
  Image,
  Text,
  Button,
  Icon,
  useColorModeValue,
  useToast,
  Modal,
  ModalOverlay,
  VStack,
  Input,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { IoMdCreate } from "react-icons/io";
import { AiFillDelete } from "react-icons/ai";
import { useProductStore } from "../store/product";
import { useState } from "react";

const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const textColor = useColorModeValue("gray.600", "gray.300");
  const { deleteProduct, updateProduct } = useProductStore();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const toast = useToast();

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        isClosable: true,
        duration: 5000,
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        isClosable: true,
        duration: 5000,
      });
    }
  };

  const handleUpdateProduct = async (pid, updatedProduct) => {
    const { success, message } = await updateProduct(pid, updatedProduct);
    onClose();
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        isClosable: true,
        duration: 5000,
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        isClosable: true,
        duration: 5000,
      });
    }
  };

  return (
    <Box
      overflow={"hidden"}
      rounded={"lg"}
      shadow={"lg"}
      _hover={{
        transform: "translateY(-5px)",
        shadow: "xl",
      }}
      transition={"all 0.3s"}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={"48"}
        w={"full"}
        objectFit={"cover"}
      />

      <Box p={"8"}>
        <Heading as={"h3"} size={"lg"} mb={"2"}>
          {product.name}
        </Heading>
        <Text fontWeight={"bold"} mb={"4"} fontSize={"xl"} color={textColor}>
          ${product.price}
        </Text>
        <HStack spacing="2">
          <Button colorScheme="blue" onClick={onOpen}>
            <Icon as={IoMdCreate} />
          </Button>
          <Button
            colorScheme="red"
            onClick={() => handleDeleteProduct(product._id)}
          >
            <Icon as={AiFillDelete} />
          </Button>
        </HStack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Product Name"
                name="name"
                value={updatedProduct.name}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    name: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Product Price"
                name="price"
                value={updatedProduct.price}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    price: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Image URL"
                name="image"
                value={updatedProduct.image}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    image: e.target.value,
                  })
                }
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              mr={"3"}
              colorScheme="blue"
              onClick={() => handleUpdateProduct(product._id, updatedProduct)}
            >
              Update
            </Button>
            <Button onClick={onClose} variant="ghost">
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;
