import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { FormConfirmProvider } from "ui-form-confirm";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <FormConfirmProvider>
            <App />
        </FormConfirmProvider>
    </React.StrictMode>
);
