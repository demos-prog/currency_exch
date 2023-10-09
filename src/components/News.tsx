import React, { useEffect, useState } from 'react';

const api_token = '6523f88c3396f5.01422456';


// async function get_data() {
//   return (await fetch(`https://eodhd.com/api/news?api_token=${api_token}&s=AAPL.US&offset=0&limit=10`)).json();
// }

const News: React.FC = () => {
  const [data, setData] = useState()

  useEffect(() => {
    // get_data().then((data) => {
    //   setData(data);
    //   window.localStorage.setItem("data", JSON.stringify(data))
    // })

    // setData(JSON.parse(window.localStorage.getItem('data') || 'null'));

  }, [])



  console.log(data);


  return (
    <div>News</div>
  );
};

export default News;