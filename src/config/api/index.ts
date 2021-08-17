import axios from "axios";
const apiClient = axios.create();

// do any axios configuration here, if we ever need it

const { get, post, put, delete: destroy } = apiClient;
export { get, post, put, destroy };