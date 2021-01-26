import './App.css';
import CSVReader from 'react-csv-reader';
import './styles.css';
import axios from 'axios';
import { useState } from 'react';
import Fields from './components/Fields';
const BASE_URL = 'http://localhost:3001';

function App() {
  const [fields, setField] = useState({});
  const [profiles, setProfile] = useState([]);

  function handleForce(data) {
    setField(
      Object.keys(data[0]).reduce((cur, val) => {
        cur[val] = false;
        return cur;
      }, {})
    );
    setProfile(data);
  }

  async function handleGetProfile() {
    const res = await axios.get(`${BASE_URL}/profile`);
    console.log(res);
  }

  function handleChooseKey(val) {
    const obj = {};
    obj[val] = true;
    setField((prev) => ({
      ...prev,
      ...obj,
    }));
  }

  async function handleSubmit() {
    const getField = Object.entries(fields)
      .filter((i) => i[1] === true)
      .map((i) => i[0]);
    try {
      await axios.post(`${BASE_URL}/profile/csv`, {
        profiles: profiles.map((profile) => {
          return getField.reduce((cur, val) => {
            cur[val] = profile[val];
            return cur;
          }, {});
        }),
      });
      console.log('OK');
    } catch (e) {
      console.log(e);
    }
  }

  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: function (header) {
      return header.toLowerCase().replace(/\W/g, '_');
    },
  };

  return (
    <div className="container">
      <CSVReader
        cssClass="react-csv-input"
        label="Select CSV with secret Death Star statistics"
        onFileLoaded={handleForce}
        parserOptions={papaparseOptions}
      />
      <Fields fields={fields} handleChooseKey={handleChooseKey}></Fields>
      <button onClick={handleSubmit}>Upload Profile</button>
      <button onClick={handleGetProfile}>Get Profile</button>
    </div>
  );
}

export default App;
