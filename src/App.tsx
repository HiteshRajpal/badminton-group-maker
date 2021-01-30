import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [listOfNames, setListOfNames] = React.useState<string[]>([])
  const [currentName, setCurrentName] = React.useState<string>('')
  const [showDuplicateError, setShowDuplicateError] = React.useState(false)
  const [groups, setGroups] = React.useState<string[]>([])
  const imgSrcValue ="https://cdn3.iconfinder.com/data/icons/ui-icons-5/16/cross-small-01-512.png"
  const handleClickEvent = (event: React.FormEvent) => {
    event.preventDefault()
    console.log(event)
    console.log(listOfNames.indexOf(currentName))
    insertNameIntoList()
  }

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault()
    setCurrentName(event.currentTarget.value)
  }

  window.onbeforeunload = function() {
    return "Are you really sure?\nI don't know why anyone would want to leave my beautiful website!";
  };


  const createGroupEvent = (event: React.MouseEvent<HTMLInputElement>) => {
    setGroups(createMatches(listOfNames))
  }

  const insertNameIntoList = () => {
    if (listOfNames.indexOf(currentName) == -1) { // This condition is case - insensitive , some extra logic would be required to do so.
      setListOfNames(listOfNames?.concat([currentName]))
      setCurrentName('')
      if (showDuplicateError) {
        setShowDuplicateError(false)
      }
    } else {
      // show trying with same name
      setShowDuplicateError(true)
    }
  }

  const createMatches = (names: string[]) => {
    let n = names.length
    let result = names.slice()
    while(n) {
      let temp,i;

      i = Math.floor(Math.random() * n--)
      temp = result[n]
      result[n] = result[i]
      result[i] = temp

    }

    return result
    
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {

      insertNameIntoList()
    }
  }

  const removeFromList =  (event: React.MouseEvent<HTMLButtonElement>, i: number) => {
    
    var array = [...listOfNames]; // make a separate copy of the array
     if (i !== -1) {
    array.splice(i, 1);
    setListOfNames( array);
    setGroups(createMatches(array))
    }
  }

  return (
    <div>
      <h1>Welcome to Badminton Group Maker App</h1>
      <p> Enter the list of people who would like to play today!!!</p>
      <label>Enter the Name:
        </label>
      <input type="text" placeholder="Names" onKeyDown={handleKeyDown} onChange={handleChange} value={currentName} />
      <input type="button" onClick={handleClickEvent} value="Add to List" />
      {showDuplicateError && (<p style={{ color: 'red' }}>Please Enter a different name</p>)}
      <ol>
        {listOfNames?.map((name, i) => {
          return <li key={i}> {name}  <button style={{display: "inline-block"}} onClick={(e) => removeFromList(e,i)} >
          <img src={imgSrcValue}  width={10} height={10}/> </button></li>
        })}
      </ol>
      <input type="button" onClick={createGroupEvent} value="Create Groups" />

      <ol >
        {groups.map((team, i) => {
          return <li key={i}>{team} 
          </li> 

        })}
      </ol>
    </div>
  );
}

export default App;
