import './App.css';
import { useEffect, useState } from 'react';

// Utility fn to return a random item from an array.
const getRandomItemInArray = (arr) => {
  const item = Math.floor(Math.random() * arr.length);
  return arr[item];
}

// Render the App
const App = () => {
  const [person, setPerson] = useState('Big Earl'); 
  const [quote, setQuote] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    const getQuoteData = async () => {
      // Static assets go in the public folder
      await fetch('quotes.json')
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => {
          console.error('Ruh roh', error);
        });
    }

    getQuoteData();
  }, []);

  // Return a random quote from our selected person.
  const getQuote = () => {
    // Selected person.
    const p = data.filter(item => item.name === person)[0];
    
    // Selected quote.
    const q = getRandomItemInArray(p.quotes);

    if (q === quote) {
      return getQuote();
    }

    setQuote(q);
  }

  // Handles changing the select element.
  const handleSelectChange = (event) => {
    setPerson(event.target.value);
  }

  // Load a quote when the person is set.
  useEffect(() => {
    if (data.length) {
      getQuote();
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [person, data]);

  if (!data.length) return <div>Loading...</div>

  return (
    <div className="App">
      <h1>Primal Tears Quote Generator</h1>
      <div>{quote}</div>
      <select defaultValue={data[0]} onChange={(e) => handleSelectChange(e)}>
        {data.map((item, index) => {
          return <option key={index} value={item.name}>{item.name}</option>
        })}
      </select>
      <button onClick={() => getQuote()}>Get a Quote</button>
    </div>
  );
}

export default App;
