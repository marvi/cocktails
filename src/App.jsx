import { useEffect, useState } from 'react';
import './App.css';
import Accordion from './components/Accordion';
//import { accordionData } from './data';

function App() {
  const url = 'https://api.airtable.com/v0/appL9IBwLCb8NUTEG/Table%201';
  const authToken = 'Bearer patMTxpaVnIU8MFUA.0b950a3b06555ae413187512f0e8b7fca57b25b96b42e09e558991c272e58f04';

  const [recipes, setRecipes] = useState({});

  useEffect(() => {
    fetch(url, {
      headers: {
       'Authorization': authToken
     }
   })
     .then((res) => res.json())
     .then((data) => {
       setRecipes(data.records);
     })
     .catch((error) => {
       console.log(error);
     });
 }, []);

  return (
      <div>
        {recipes.length > 0 ? (
      <Accordion accordionData={recipes} />
    ) : (
      <p>Fetching Data...</p>
    )}
      </div>
  )
}

export default App
