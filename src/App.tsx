import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import './null_styles.css'
import './App.css'
import Select_item from "./components/Select_item";

const api_key = 'fca_live_ZffNbHxQRIlWHfBcbqyL6CaJvW6HFFIj1XALQGkt';

function App() {
  const [base_currency, setBase_currency] = useState<string>('RUB');
  const [target_currency, setTarget_currency] = useState<string>('USD');
  const [currencies_list, setCurrencies_list] = useState({ data: null });

  async function get_currencies_list() {
    return (await fetch(`https://api.freecurrencyapi.com/v1/currencies?apikey=${api_key}&currencies=`)).json();
  }

  useEffect(() => {
    get_currencies_list().then(res => {
      setCurrencies_list(res.data);
    })
  }, [])

  const { isLoading, isError, data } = useQuery({
    queryKey: [base_currency, target_currency],
    queryFn: () =>
      fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=${api_key}&currencies=${base_currency}&base_currency=${target_currency}`).then(
        (res) => res.json(),
      ),
  })

  if (isLoading) return 'Loading...';
  if (isError) return 'An error has occurred:';

  console.log(Object.values(data.data)[0]);

  return (
    <>
      <Select_item
        setState={setBase_currency}
        initial_value={base_currency}
        currencies_list={currencies_list}
      />
      <Select_item
        setState={setTarget_currency}
        initial_value={target_currency}
        currencies_list={currencies_list}
      />
    </>
  )
}

export default App
