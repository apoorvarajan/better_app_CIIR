import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import store from "./store/";

import Home from "./container/homeClient";
import Results from "./container/resultsClient";

const App = () => {
    return (
        <Provider store={store}>
          <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/results" element={<Results />}/>
          </Routes>
          </BrowserRouter>
        </Provider>
    );
};


export default App;
