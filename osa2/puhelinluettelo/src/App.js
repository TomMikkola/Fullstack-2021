import React, {useEffect, useState} from 'react';
import Services from './services/puhelinluettelo'
import Notification from './components/Notification';
import Filter from './components/Filter';
import Form from './components/Form';
import Person from './components/Person';
import Header from './components/Header'

function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState({message: '', task: ''})

  useEffect( () => {
    Services
      .getAll()
      .then( response => {
        setPersons( response )
      })
  }, [])

  const addNewName = (event) => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber
    }

    const personFound = persons.find( person => person.name.toLocaleLowerCase() === newName.toLocaleLowerCase() )

    if( personFound ){
        
      if( window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`) ){
                
        Services
          .updatePerson(personFound.id, newPerson)
          .then( response => {
            const updatedPersons = persons.map( person => person.id !== personFound.id ? person : response )
            setPersons(updatedPersons)
            setNotificationMessage({...notificationMessage, message: `Updated ${newName}`, task: 'update'})
            setTimeout( () => {
              setNotificationMessage({message: '', task: ''})
            }, 3000)
          } )
          .catch( () => {
            setNotificationMessage({...notificationMessage, message: `Something went wrong updating ${newName} information. Please try again`, task: 'error' })
            setTimeout( () => {
              setNotificationMessage({message: '', task: ''})
            }, 3000)
          })
      }
    } else {
      
      Services
        .createPerson( newPerson )
        .then( response => {
          setPersons( persons.concat(response) )
          setNotificationMessage({...notificationMessage, message: `Added ${newName}`, task: 'add'})
          setTimeout( () => {
            setNotificationMessage({message: '', task: ''})
          }, 3000)
        })
        .catch( () => {
          setNotificationMessage({...notificationMessage, message: `Something went wrong creating ${newName}. Please try again.`, task: 'error' })
          setTimeout( () => {
            setNotificationMessage({message: '', task: ''})
          }, 3000)
        })
    }

    setNewName('')
    setNewNumber('')
  }

  const updateNameInput = (event) => {
    setNewName(event.target.value)
  }

  const updateNumberInput = (event) => {
    setNewNumber(event.target.value)
  }

  const filterPersons = (event) => {
    let search = event.target.value.toLocaleLowerCase()
    setFilter(search)
  }

  return (
    <div>
      <Header text='Phonebook' />
      <Notification props={notificationMessage} />
      <Filter filterPersons={filterPersons}/>
      
      <Header text='Add a new' />
      <Form addNewName={addNewName} newName={newName} updateNameInput={updateNameInput} newNumber={newNumber} updateNumberInput={updateNumberInput} />
      
      <Header text='Numbers' />
      <Person persons={ persons.filter(person => person.name.toLocaleLowerCase().includes(filter)) } setPersons={setPersons} notificationMessage={notificationMessage} setNotificationMessage={setNotificationMessage} />
    </div>
  );
}

export default App;