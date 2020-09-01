import {orderBy} from 'lodash'

export const fuzzySearch = ({
  query = '',
  data = [],
  matchingThreshold = 2,
  incorrectThreshold = 2,
}) => {
  if (!query.length || !data.length) return data

  const scoredData = data.reduce((acc, curr) => {
    let matchingNumber = 0
    let incorrectNumber = 0
    
    let currentName = curr.properties.name.toLowerCase()
    const originalName = curr.properties.name.toLowerCase()
    query = query.toLowerCase()
    
    if (query.length > 2 && originalName.includes(query)) {
      acc.push({ ...curr, score: query.length * 10 })
      return acc
    }
    for (let i = 0; i < query.length; i++) {
      const checkableName = currentName.length > 3 ? currentName.substring(0, 3) : currentName
      const matchingIndex = checkableName.indexOf(query[i])

      if (matchingIndex !== -1) {
        if (matchingIndex !== 0) incorrectNumber += 1
        if (originalName.includes(query.substring(0, 4))) {
          matchingNumber += 2
        } else {
          matchingNumber += 1
        }
        currentName = currentName.substring(matchingIndex + 1)
      } else {
        incorrectNumber += 1
      }
    }
    const validations = (matchingNumber >= matchingThreshold && incorrectNumber <= incorrectThreshold)
    if (matchingNumber >= matchingThreshold + 2 || validations) {
      acc.push({ ...curr, score: matchingNumber })
      return acc
    }
    return acc
  }, [])

  return orderBy(scoredData, ['score'], 'desc')
}

