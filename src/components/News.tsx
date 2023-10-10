import React, { useEffect, useState } from 'react';
import './News.css';

// const api_token = '6523f88c3396f5.01422456';
// async function get_data() {
//   return (await fetch(`https://eodhd.com/api/news?api_token=${api_token}&s=AAPL.US&offset=0&limit=10`)).json();
// }

type News_type = {
  date: string,
  content: string,
  title: string,
  link: string
}

const News: React.FC = () => {
  const [data, setData] = useState<News_type[]>([]);

  useEffect(() => {
    // get_data().then((data) => {
    //   setData(data);
    //   window.localStorage.setItem("data", JSON.stringify(data))
    // })

    setData(JSON.parse(window.localStorage.getItem('data') || 'null'));

  }, [])



  console.log(data);


  return (
    <div id='news_wrap'>
      {data?.map((item, i) => {
        return (
          <div className='news_item' key={i}>
            <div className='padding_wrap'>
              <div className='news_item_wrap'>
                <p>{item.date.split('T')[0]}</p>
                <h2><a target='blank' href={item.link}>{item.title}</a></h2>
                <p>{item.content}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  );
};

export default News;