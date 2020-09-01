import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  margin: 25px;
`
const HeadersContainer = styled.div`
  display: flex;
  border-left: 1px solid gray;
  border-right: 1px solid gray;
  border-top: 4px solid gray;
  border-bottom: 3px solid gray;

`
const Cell = styled.div`
  border: ${props => props.header ? '1px' : '1px'} solid gray;
  padding: 5px;
  flex: ${props => props.initial ? 2 : 1};
`
const CellContainer = styled.div`
  display: flex;
  border-left: 1px solid gray;
  border-right: 1px solid gray;
  ${({active}) => active && 'background-color: skyblue'};
`

const CellText = styled.p`
  margin: 3px;
  font-size: ${({ header }) => header ? '20px' : '12px'};
  font-weight: ${({ header }) => header ? '600' : 'auto'};
  
`
const TableContainer = styled.div`
  max-height: 300px;
  overflow: auto;
`


const MapRows = ({ row, header }) => {
  return row.map((r, i) => (
    <Cell key={`c-row${i}`} initial={i === 0} header={header}>
      <CellText header={header}>
        {r}
      </CellText>
    </Cell>
  ))
}

const Table = ({ data, active, setActive }) => {
  
  const formattedData = data.map(({ properties }) => [
    properties.name,
    properties['2010'],
      properties['2011'],
      properties['2012'],
      properties['2013'],
    properties['2014'],
    properties.total
  ])
  
  return (
    <Container>
      {active && (
        <CellContainer active>
          <MapRows row={[
            active.properties.name,
            active.properties['2010'],
            active.properties['2011'],
            active.properties['2012'],
            active.properties['2013'],
            active.properties['2014'],
            active.properties.total
          ]} />
        </CellContainer>
      )
        }
      <HeadersContainer>
        <MapRows header row={['Name', 2010, 2011, 2012, 2013, 2014, 'Total']}/>
      </HeadersContainer>
      <TableContainer>
      {
        formattedData.map((row, i) => (
          <CellContainer key={`c-cont${i}`}>
            <MapRows row={row} />
          </CellContainer>
        ))
      }
      </TableContainer>
    </Container>
  )
}

export default Table