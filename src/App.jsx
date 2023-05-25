import { useEffect, useState } from 'react';
import './App.css';
import Accordion from './components/Accordion';
import Filters from './components/Filters';
//import { accordionData } from './data';

function App() {
  const baseUrl = "https://api.airtable.com/v0/appL9IBwLCb8NUTEG/Cocktails?sort%5B0%5D%5Bfield%5D=Namn&sort%5B0%5D%5Bdirection%5D=asc";
  //const url = 'https://api.airtable.com/v0/appL9IBwLCb8NUTEG/Cocktails';
  const authToken = 'Bearer patMTxpaVnIU8MFUA.0b950a3b06555ae413187512f0e8b7fca57b25b96b42e09e558991c272e58f04';

  const [recipes, setRecipes] = useState([]);
  const [baseSpiritFilter, setBaseSpiritFilter] = useState('');
  const [tagFilter, setTagFilter] = useState('');

  const generateFilter = () => {
    let formula = "&filterByFormula=";
    if(tagFilter && !baseSpiritFilter) {
      formula += encodeURIComponent(`FIND('${tagFilter}', {Taggar})`);
    }
    else if(!tagFilter && baseSpiritFilter) {
      formula += encodeURIComponent(`{Bassprit} = '${baseSpiritFilter}'`);
    }
    else if(tagFilter && baseSpiritFilter) {
      console.log("tagFilter: " + tagFilter + "  baseSpiritFilter: " + baseSpiritFilter);
      formula += encodeURIComponent(`AND(FIND('${tagFilter}', {Taggar}), {Bassprit} = '${baseSpiritFilter}')`);
    }
    else {
      formula = "";
    }
    console.log(formula);
    return formula;
  }

  useEffect(() => {
    fetch(baseUrl + generateFilter(), {
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
        <h1>Cocktails</h1>
        <Filters baseSpiritFilter={baseSpiritFilter} setBaseSpiritFilter={setBaseSpiritFilter} />
        {recipes.length > 0 ? (
      <Accordion accordionData={recipes} />
    ) : (
      <p>Hämtar data... </p>
    )}
      </div>
  )
}

export default App
