export const IS_DEVELOPMENT = process.env.NODE_ENV === "development";
export const SERVER_BASE_URL = IS_DEVELOPMENT ? "http://localhost:8080/api/v1/client" : "/api/v1/client";
export const CREATE_CLIENT_URL = `${SERVER_BASE_URL}/create`;
export const LIST_CLIENTS = `${SERVER_BASE_URL}/list`;
export const SHOW_CLIENT = `${SERVER_BASE_URL}/get/:id`;
export const DELETE_CLIENT = `${SERVER_BASE_URL}/get/:id`;

//navigation
export const BASE_PATH = "/";
export const CUSTOMERS_PATH = "/customers";
export const CREATE_CUSTOMER_PATH = "/customers/create";
export const SHOW_CUSTOMER_PATH = "/customers/:id";


