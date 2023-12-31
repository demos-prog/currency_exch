import { useQuery } from "@tanstack/react-query";
import { useEffect, useState, useRef, lazy, Suspense } from "react";
import './null_styles.css';

import Loader from "./components/Loader";
import Select_item from "./components/Select_item";
const Lazy_news = lazy(() => import('./components/News'));

import './App.css'

const api_key = 'fca_live_ZffNbHxQRIlWHfBcbqyL6CaJvW6HFFIj1XALQGkt';

function App() {
  const [base_currency, setBase_currency] = useState<string>('USD');
  const [target_currency, setTarget_currency] = useState<string>('RUB');
  const [currencies_list, setCurrencies_list] = useState({ data: null });
  const [amount, setAmount] = useState<number>(1);

  const input_field = useRef<HTMLInputElement>(null);

  function handle_input() {
    if (input_field.current) {
      const value: number = +input_field.current.value
      if (value >= 0) setAmount(value);
    }
  }

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
      fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=${api_key}&currencies=${target_currency}&base_currency=${base_currency}`).then(
        (res) => res.json(),
      ),
  })

  if (isError) return 'An error has occurred:';

  return (
    <div id='wrapper'>
      {isLoading ? <Loader />
        :
        <div id='content'>
          <span className="item">
            <input type="number" value={amount} ref={input_field} onChange={handle_input} />
            <Select_item
              setState={setBase_currency}
              initial_value={base_currency}
              currencies_list={currencies_list}
            />
          </span>
          <span>
            x <b>{(Object.values(data?.data)[0] as number).toFixed(2)}</b> =
          </span>
          <span className="item">
            <span id="result">{(amount * (Object.values(data?.data)[0] as number)).toFixed(2)}</span>
            <Select_item
              setState={setTarget_currency}
              initial_value={target_currency}
              currencies_list={currencies_list}
            />
          </span>
        </div>
      }

      <Suspense fallback={<Loader />}>
        <Lazy_news />
      </Suspense>
    </div>
  )
}

export default App
