import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SnackbarProvider } from "notistack";
import App from "./App";
import NavBar from "./components/NavBar";
import "./index.css";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <SnackbarProvider maxSnack={3}>
            <NavBar />
            <App />
        </SnackbarProvider>
    </StrictMode>
);
