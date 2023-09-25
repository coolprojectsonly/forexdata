import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getData = createAsyncThunk("/getdata/post", async () => {
  const options = {
    method: "GET",
    url: "https://alpha-vantage.p.rapidapi.com/query",
    params: {
      interval: "5min",
      function: "TIME_SERIES_INTRADAY",
      symbol: "MSFT",
      datatype: "json",
      output_size: "compact",
    },
    headers: {
      "X-RapidAPI-Key": "c1fd179e92mshf677d828559a3aep1a9fb9jsn19dac2ef030b",
      "X-RapidAPI-Host": "alpha-vantage.p.rapidapi.com",
    },
  };

  const response = await axios.request(options);
  return response.data;
});
