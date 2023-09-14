import axios from "axios";

interface ApiHelper {
  method: string;
  url: string;
  data: any;
}
export const apiHelper = ({ method, url, data }: ApiHelper): Promise<any> => {
  return new Promise((resolve, reject) => {
    const options = {
      method: method,
      url: `http://localhost:4000/${url}`,
      data,
      headers: {
        authorization: `Bearer ${process.env.REACT_APP_EDEN_AI_API_KEY}`,
      },
    };

    console.log(
      "🚀 ~ file: axios.helper.ts:21 ~ returnnewPromise ~ options:",
      options
    );
    axios
      .request(options)
      .then((response: any) => {
        console.log("response.data", response.data);
        resolve(response.data); // Resolve the promise with the response data
      })
      .catch((error: unknown) => {
        console.error(error);
        reject(error); // Reject the promise with the error
      });
  });
};
