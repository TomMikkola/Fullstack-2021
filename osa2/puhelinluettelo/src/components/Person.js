import Services from '../services/puhelinluettelo'

const Person = ({persons, setPersons, notificationMessage, setNotificationMessage}) =>{

    return(
      persons.map( person => {
        return(
          <div key={person.name}>{person.name} {person.number} <button onClick={ () => clickDeletePerson(person, persons, setPersons, person.id, notificationMessage, setNotificationMessage)} >delete</button></div>
        )
      })
    )
}

const clickDeletePerson = (person, persons, setPersons, id, notificationMessage, setNotificationMessage) => {

    if( window.confirm(`Delete ${person.name}?`) ){
      Services
      .deletePerson(id)
      .then( () => {
        setPersons( persons.filter( person => person.id !== id ? person : null) )
        setNotificationMessage({...notificationMessage, message: `Deleted ${person.name}`, task: 'delete'})
        setTimeout( () => {
          setNotificationMessage({message: '', task: ''})
        }, 3000)
      })
      .catch( () => {
        setNotificationMessage({...notificationMessage, message: `Information of ${person.name} has already been removed from the server`, task: 'error' })
        setTimeout( () => {
          setNotificationMessage({message: '', task: ''})
        }, 3000)
      })
    }
}

export default Person