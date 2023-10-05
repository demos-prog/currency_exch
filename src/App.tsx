import { useQuery } from "@tanstack/react-query";

import './null_styles.css'
import './App.css'

const api_key = '1f9f2c7d8a44d434f6dcd5b4abaffaf6';

function App() {

  const { isLoading, error, data } = useQuery({
    queryKey: ['symbols'],
    queryFn: () =>
      fetch(`https://api.exchangeratesapi.io/v1/latest?access_key=${api_key}&symbols=USD,AUD,CAD,PLN,MXN`).then(
        (res) => res.json(),
      ),
  })

  if (isLoading) return 'Loading...'
  if (error) return 'An error has occurred: ' + error
  console.log(data);

  return (
    <>

    </>
  )
}

export default App
