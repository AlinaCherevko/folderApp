import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store.js";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <StrictMode>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </StrictMode>
    </PersistGate>
  </Provider>
);
