import { store } from "../store";

export default function fetchStocks() {
  const key = import.meta.env.VITE_API_KEY;
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=${key}`;

  fetch(url)
    .then((response) => {
      if (response.status !== 200) {
        console.error("Something weent wrong", response.status);
        return;
      }

      response.json().then((data) => {
        store.commit("LOAD_DATASET", data);
      });
    })
    .catch((err) => {
      console.error(err.message);
    });
}
