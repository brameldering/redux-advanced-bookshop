import { useState, useCallback } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    console.log("in sendRequest");
    setIsLoading(true);
    setError(null);
    try {
      //await new Promise((r) => setTimeout(r, 1000));

      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });
      // await new Promise((r) => setTimeout(r, 1000));
      if (!response.ok) {
        throw new Error("Request failed!");
      }

      // await new Promise((r) => setTimeout(r, 1000));
      const data = await response.json();
      //await new Promise((r) => setTimeout(r, 1000));
      applyData(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
