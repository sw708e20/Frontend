import _axios from "axios";

const axios = _axios.create({
  baseURL: process.env.REACT_APP_DOMAIN,
  headers: {
    "Content-Type": "application/json"
  }
})

export default axios;