const fetch = require("universal-fetch");
const url = require('url');

const SHEET_ID = "1vcImZXpP5OCJ_M0Eyjqv8je1fOZxD8IULDOAd04z5Zw";
const API_KEY = "AIzaSyACYZ4LvYEq0Wm9gmz_2bJyHAH6lv6yeb4";

let data = fetchDataBrokers();

const EXCLUDE_LIST = [
  "Opt-Out Method",
  "Opt Out URL",
  "Data Broker Comments",
  "Source URL",
  "Company Email Provider",
];

const HEALTH_FIELD_NAME = 'Health';

function compare(a,b) {
  if (a.domain < b.domain)
    return -1;
  if (a.domain > b.domain)
    return 1;
  return 0;
};

function generateIndexFromHeaders(headerRow) {
  var FIELDS = {};
  for (var i = 0; i < headerRow.length; i++) {
      FIELDS[i] = headerRow[i];
  };
  return FIELDS;
};

function getHealthFieldIndex(headerRow) {
  for (var i = 0; i < headerRow.length; i++) {
      if (headerRow[i] === HEALTH_FIELD_NAME) {
        return i;
      }
  };  
}


async function fetchDataBrokers() {
  let data = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Master%20List%20Latest!A:BQ?key=${API_KEY}`
  );
  data = await data.json();
  var index = generateIndexFromHeaders(data['values'][0]);
  var index_health = getHealthFieldIndex(data['values'][0]);
  var results = [];
  for (var i = 0; i < data['values'].length; i++) {
    var row = {}
    if (i == 0 || (data['values'][i][index_health] && data['values'][i][index_health].length > 0 )) {
      continue;
    }
    for (var j = 0; j < data['values'][i].length; j++) {
      if (!EXCLUDE_LIST.includes(index[j])) {
        row[index[j]] = data['values'][i][j];
      }
    };
    results.push(row);
  };
  return {"License": "GNU General Public License v3.0", "Data brokers": results};
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
