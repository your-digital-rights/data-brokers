import fetch from "universal-fetch";
import {API_DOMAIN_URL} from "./domain";

var data = null;

export default async function fetchData() {
console.log(API_DOMAIN_URL + `api/databrokers`);
  if (data == null) {
  	data = await fetch(API_DOMAIN_URL + `api/databrokers`);
  	data = await data.json();
  }
  return data;
}
