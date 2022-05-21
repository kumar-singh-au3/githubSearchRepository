import { useState, useEffect } from "react";
import axios from "axios";

import CONFIG from "../config";
import { addFavValue } from "../utils";

const BASE_URL = CONFIG.BASE_URL;
const useDebouncedAxios = (dataUrl = "", delay = 0,pageNo=1, perPage=20) => {
  const [data, setData] = useState({});
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async (persistOldData=false) => {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          q: dataUrl,
          in:'name',
          page:pageNo,
          per_page:perPage,
        },
      });
      if(persistOldData){
        setData(oldData=>({...response.data,items:[...oldData.items, ...response.data.items.map(addFavValue)]}));
      }else{
        setData({...response.data, items: response.data.items.map(addFavValue)});
      }
      setFetchError(null);
    } catch (err) {
      setFetchError(err.message);
      setData({});
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let timer;
    if (dataUrl) {
      timer = setTimeout(() => fetchData(), delay);
    } else {
      setData({});
    }
    const cleanUp = () => {
      clearTimeout(timer);
    };

    return cleanUp;
  }, [dataUrl]);

  useEffect(()=>{
    if(pageNo!==1){
        fetchData(true)
    }
  },[pageNo])

  return { data, fetchError, isLoading };
};

export default useDebouncedAxios;
