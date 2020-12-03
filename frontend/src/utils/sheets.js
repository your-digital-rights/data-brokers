import fetch from "universal-fetch";
var data = null;

export default async function fetchData() {
  if (data == null) {
  	data = await fetch(`https://api.data-brokers.org/api/databrokers`);
  	data = await data.json();
  }
  return data;
}
