import { useEffect, useState } from "react";
import { useProductStore } from "../store/product.js";
import ProductCard from "../components/ProductCard";
import { Container, SimpleGrid, Text, VStack, Center } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner.jsx";

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      await fetchProducts();
      setIsLoading(false);
    };
    loadProducts();
  }, [fetchProducts]);

  return (
    <Container maxW="container.xl">
      <VStack>
        <Text
          fontWeight={"bold"}
          textAlign={"center"}
          fontSize={"30"}
          bgGradient={"linear(to-l, cyan.400, blue.500)"}
          bgClip={"text"}
          mb={"5"}
        >
          Current Products 💫
        </Text>

        {isLoading ? (
          <Center w="full" h="400px">
            <Spinner isLoading={isLoading} />
          </Center>
        ) : (
          <>
            <SimpleGrid
              columns={{
                base: 1,
                md: 2,
                lg: 3,
              }}
              spacing={"8"}
              w="full"
            >
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </SimpleGrid>

            {products.length === 0 && (
              <Text
                fontSize={"xl"}
                fontWeight={"bold"}
                textAlign={"center"}
                color={"gray.500"}
              >
                No products found😿
                <Link to="/create">
                  <Text
                    as={"span"}
                    _hover={{
                      textDecoration: "underline",
                    }}
                    color="blue.500"
                  >
                    Create a product
                  </Text>
                </Link>
              </Text>
            )}
          </>
        )}
      </VStack>
    </Container>
  );
};
export default HomePage;
