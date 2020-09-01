import React, {useState, useEffect} from 'react';
import * as d3 from 'd3'
import Select from 'react-select';
import styled from 'styled-components';
import './App.css';
import Table from './components/Table.js';

import Map from './components/Map.js';
import usGeoData from './annotatedData.geojson';
import SearchBar from './components/SearchBar';

import { fuzzySearch } from './utilities';

const StyledSelect = styled(Select)`
  margin: 10px auto;
  width: 20vw;
`
const options = [
  {
    value: [0, 37],
    label: 'all'
  },
  {
    value: [0,9],
    label: '0-9'
  },
  {
    value: [10,19],
    label: '10-19'
  },
  {
    value: [20,28],
    label: '20-28'
  },
  {
    value: [29, 37],
    label: '29-37'
  },
]

function App() {
  const [geoData, setGeoData] = useState([])
  const [ogData, setOGData] = useState(null)
  const [query, changeQuery] = useState('')
  const [active, setActive] = useState(null)
  const [selectedOption, setSelectedOption] = useState({
    value: [0, 37],
    label: 'all'
  })
  
  useEffect(() => {
    d3.json(usGeoData).then(res => {
      setGeoData(res.features)
      setOGData(res)
    })
  }, [])

  useEffect(() => {
    const [low, high] = selectedOption.value
    let ogFeatures = ogData ? ogData.features.filter(d => {
      let total = d.properties.total || 0
      return (total >= low && total <= high)
    }) : []
    
    const searchResults = fuzzySearch({ query, data: ogFeatures, selectedOption })
    setGeoData(searchResults)
  }, [query, selectedOption, ogData])

  if (!ogData) return null
  
  return (
    <div className="App">
      <SearchBar query={query} changeQuery={changeQuery} />
      <label>filter by total crashes</label>
      <StyledSelect
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options} />
      {geoData.length ? 
        (<>
          <Map
            active={active}
            setActive={setActive}
            geoData={geoData}
            ogData={ogData} />
          <Table
            active={active}
            setActive={setActive}
            data={geoData} />
        </>
        ) :
        <h3>
          No results with that criteria
        </h3>
            }
              
    </div>
  );
}

export default App;
