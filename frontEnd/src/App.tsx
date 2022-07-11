import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {BASE_PATH, CREATE_CUSTOMER_PATH, CUSTOMERS_PATH, SHOW_CUSTOMER_PATH} from "./Constants";
import Customers from "./layouts/Customers";
import CreateCustomers from "./layouts/CreateCustomers";
import ShowCustomers from "./layouts/ShowCustomer";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={BASE_PATH} element={ <Customers/>}/>
                <Route path={CUSTOMERS_PATH} element={ <Customers/>}/>
                <Route path={CREATE_CUSTOMER_PATH} element={<CreateCustomers/>}/>
                <Route path={SHOW_CUSTOMER_PATH} element={ <ShowCustomers/>}/>
                </Routes>
        </BrowserRouter>
    );
}

export default App;
