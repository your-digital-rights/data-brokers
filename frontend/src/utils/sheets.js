import fetch from "universal-fetch";
import {API_DOMAIN_URL} from "./domain";

var data = null;

export default async function fetchDataBrokers() {
  const url = API_DOMAIN_URL + `api/databrokers`;

  if (data == null) {
    data = fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        throw new Error(`HTTP error ${response.status} from ${url}`);
      })
      .then((json) => {
        return json;
      });
  }

  return data;
}
