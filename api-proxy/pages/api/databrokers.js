const fetch = require("universal-fetch");
const url = require('url');

const SHEET_ID = "1vcImZXpP5OCJ_M0Eyjqv8je1fOZxD8IULDOAd04z5Zw";
const API_KEY = "AIzaSyACYZ4LvYEq0Wm9gmz_2bJyHAH6lv6yeb4";

const FIELDS = {
  'DOMAIN': 0, 
  'EMAIL': 1, 
  'NAME': 2, 
  'CATEGORIES': 3, 
  'PRIVACY_POLICY': 4, 
  'OPT_OUT_METHOD': 5, 
  'OPT_OUT_URL': 6, 
  'PHONE_NUMBER': 7, 
  'ADDRESS': 8, 
}

let data = fetchDataBrokers();


function compare(a,b) {
  if (a.domain < b.domain)
    return -1;
  if (a.domain > b.domain)
    return 1;
  return 0;
};

async function fetchDataBrokers() {
  let data = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Master%20List%20Latest!A2:AD?key=${API_KEY}`
  );
  data = await data.json();
  data = data['values'].map(db => {
    return {
      domain: db[FIELDS['DOMAIN']].trim(), 
      email: db[FIELDS['EMAIL']] ? db[FIELDS['EMAIL']].trim() : null,
      name: db[FIELDS['NAME']] ? db[FIELDS['NAME']].trim() : null,
      categories: db[FIELDS['CATEGORIES']] ? db[FIELDS['CATEGORIES']].trim() : null,
      privacy_policy: db[FIELDS['PRIVACY_POLICY']] ? db[FIELDS['PRIVACY_POLICY']].trim() : null, 
      opt_out_url: db[FIELDS['OPT_OUT_URL']] ? db[FIELDS['OPT_OUT_URL']].trim() : null,
      phone_number: db[FIELDS['PHONE_NUMBER']] ? db[FIELDS['PHONE_NUMBER']].trim() : null, 
      address: db[FIELDS['ADDRESS']] ? db[FIELDS['ADDRESS']].trim() : null, 
    };
  });
  return data.sort(compare);
};

setInterval(() => {
  data = fetchDataBrokers();
}, 60 * 60 * 1000); 

export default async (req, res) => {
  const query = url.parse(req.url,true).query;
  if (query.flush == "02874523") {
    console.log("Flushing the cache.");
    data = fetchDataBrokers();
  }
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  let response = await data;
  res.json(response);
};
