const Form = (props) => {
    const {addNewName, newName, updateNameInput, newNumber, updateNumberInput} = props
  
    return(
      <form onSubmit={addNewName}>
          <div> Name: <input value={newName} onChange={updateNameInput}/> </div>
          <div> Number: <input value={newNumber} onChange={updateNumberInput}/> </div>
          <div> <button type="submit">Add</button> </div>
      </form>
    )
}

export default Form