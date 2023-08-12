import React from "react";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";

import Signup from "./Signup/Signup";

function App() {
  return (
    <ChakraProvider>
      <CSSReset />
      <Signup />
    </ChakraProvider>
  );
}

export default App;
