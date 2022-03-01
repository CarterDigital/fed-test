import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [cardData, setCardData] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

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
  const fetchData = async () => {
    const res = await fetch(
      'http://prototype.dev.carter.digital/fed-test/items.json'
    );
    const data = await res.json();
    setCardData(data);
    return data;
  };
  console.log(cardData.items);
  return <div className='App'>hi</div>;
}

export default App;
