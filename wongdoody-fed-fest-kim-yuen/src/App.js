import './App.css';
import React, { useState, useEffect } from 'react';
import Card from './Card';

function App() {
  const [cardData, setCardData] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  //this useEffect hook will run as soon as we load our app
  useEffect(() => {
    const getCard = async () => {
      try {
        const dataFromServer = await fetchData();
        setCardData(dataFromServer);
        setLoading(false);
      } catch (e) {
        setError(e);
        console.error(e);
      }
    };
    getCard();
  });
  //use fetch api to hit the json file and then put that data into our cards
  const fetchData = async () => {
    const res = await fetch(
      'http://prototype.dev.carter.digital/fed-test/items.json'
    );
    const data = await res.json();
    setCardData(data);
    return data;
  };
  console.log(cardData.items);
  return (
    <div className='App'>
      {cardData && cardData?.items?.map((card) => <Card card={card} />)}
    </div>
  );
}

export default App;
