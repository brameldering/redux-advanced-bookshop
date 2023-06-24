// ================================================
// = Custom hook to be used for HTTP GET requests =
// ================================================
import { useState, useCallback } from "react";

const useHttpGet = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    console.log("in sendRequest");
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(requestConfig.url);
      if (!response.ok) {
        throw new Error("Request failed!");
      }
      const data = await response.json();

      // await new Promise((r) => setTimeout(r, 500));

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

export default useHttpGet;
