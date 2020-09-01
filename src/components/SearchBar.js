import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  margin: 5px auto 15px;
`
const SearchInput = styled.input`
  border: 1px solid gray;
  border-radius: 2px;
  padding: 3px 8px;
  margin: 25px 5px 0;
  width: 50%;
  height: 35px;
`
const MarginFreeText = styled.p`
  margin: 10px 0 0;
`

const SearchBar = ({query, changeQuery}) => (
    <Container>
      <MarginFreeText>
        Search for Neighborhood
      </MarginFreeText>
      <SearchInput
        type="text"
        value={query}
        onChange={e => changeQuery(e.target.value)}
      />
    </Container>
  )

export default SearchBar

