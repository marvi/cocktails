import { useEffect, useState } from 'react';
import './App.css';
import Accordion from './components/Accordion';
import Filters from './components/Filters';

function App() {
  const baseUrl = "https://api.airtable.com/v0/appL9IBwLCb8NUTEG/Cocktails?sort%5B0%5D%5Bfield%5D=Namn&sort%5B0%5D%5Bdirection%5D=asc";
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
      formula += encodeURIComponent(`AND(FIND('${tagFilter}', {Taggar}), {Bassprit} = '${baseSpiritFilter}')`);
    }
    else {
      formula = "";
    }
    console.log('Formula: ' + formula);
    return formula;
  }

  useEffect(() => {
    const url = baseUrl + generateFilter();
    console.log(url);
    fetch(url, {
      headers: {
       'Authorization': authToken
     }
   })
     .then((res) => res.json())
     .then((data) => {
       setRecipes(data['records']);
     })
     .catch((error) => {
       console.log(error);
     });
 }, [baseSpiritFilter, tagFilter]);

  return (

      <div>
          <h1>Cocktails</h1>
          <Filters tagFilter={tagFilter}
                   setTagFilter={setTagFilter}
                   baseSpiritFilter={baseSpiritFilter}
                   setBaseSpiritFilter={setBaseSpiritFilter} />
        {recipes.length > 0 ? (
      <Accordion accordionData={recipes} />
    ) : (
            <div className="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
    )}
      </div>
  )
}

export default App
