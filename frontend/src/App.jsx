import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import CreatePage from "./pages/CreatePage";
import HomePage from "./pages/Homepage";
import MainLayout from "./layouts/MainLayout";
import { Box, useColorModeValue } from "@chakra-ui/react";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
      </Route>
    </>
  )
);

const App = () => {
  return (
    <Box minH="100vH" bg={useColorModeValue("gray.200", "gray.900")}>
      <RouterProvider router={router} />
    </Box>
  );
};

export default App;
