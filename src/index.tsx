import React, {createContext} from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { CssBaseline } from "@mui/material";
import RootStore from './store/rootStore';

const store = new RootStore();
export const storeContext = createContext(store);

ReactDOM.render(
    <storeContext.Provider value={store}>
        <CssBaseline />
        <App />
    </storeContext.Provider>,
    document.getElementById("root")
);
