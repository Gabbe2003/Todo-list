import React, { useReducer, useState, Dispatch } from 'react'
import "./style.css"
 
type TodoProps = {
  todo: {
      id: number,
      name: string,
      complete: boolean,
  },
  dispatch: Dispatch<any>,
}
 
const NewTodo: React.FC<TodoProps> = ({todo, dispatch}) => {
const [isEditing,setIsEditing] = useState (false)
const [editName,setEditName] = useState (todo.name)
const [boolToggle,setBoolToggle] = useState (false); 

const handelEnter = () => {
  if(editName.trim() !== '') {
    dispatch({type: ACTIONS.EDIT_TODO, payload: {id: todo.id, newName: editName}})
  }
  setIsEditing(false)
}

const handleKeyPress = (e: React.KeyboardEvent) => {
  if (e.key === 'Enter') {
    handelEnter();
  }
}
return (
  <div className='todos'>
    {isEditing ? (
      <input 
        type='text'
        value={editName}
        onChange={(e) => setEditName(e.target.value)}
        onBlur={handelEnter}
        onKeyPress={handleKeyPress}
        autoFocus
      />
    ) : (
      <span 
        className={boolToggle ? 'toggle' : ''}
        style={{ color: todo.complete ? '#AAA' : '#000'}}
        onClick={() => setIsEditing(true)}
      >
        {todo.name}
      </span>
    )}
    <div className='buttons'>
      <button 
        onClick={() => {
          dispatch({ type: ACTIONS.TOGGLE_TODO, payload: {id: todo.id}});
          setBoolToggle(!boolToggle);
        }} 
        className='btn'
      >
        Toggle
      </button>
      <button 
        onClick={() => dispatch({ type: ACTIONS.DELETE_TODO, payload: {id: todo.id}})} 
        className='btn'
      >
        Delete
      </button>
    </div>
  </div>
);

}

export const ACTIONS = {
    ADD_TODO: 'add-todo',
    TOGGLE_TODO: 'toggle-todo',
    DELETE_TODO: 'delete-todo',
    EDIT_TODO: 'edit-todo',
}
 
// Define types for your state and actions
type Todo = {
  id: number;
  name: string;
  complete: boolean;
}
 
type State = Todo[];
 
type Action =
  | { type: 'add-todo'; payload: { name: string } }
  | { type: 'toggle-todo'; payload: { id: number } }
  | { type: 'delete-todo'; payload: { id: number } }
  | { type: 'edit-todo'; payload: { id: number; newName: string } };
 
const newTodo = (name: string): Todo => ({ id: Date.now(), name, complete: false })
 
// Define your reducer using the new Action and State types
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'add-todo':
      return [...state, newTodo(action.payload.name)]
    case 'toggle-todo':
      return state.map(todo => todo.id === action.payload.id ? { ...todo, complete: !todo.complete } : todo)
    case 'delete-todo':
      return state.filter(todo => todo.id !== action.payload.id)
    case 'edit-todo':
      return state.map(todo => todo.id === action.payload.id ? { ...todo, name: action.payload.newName } : todo)
    default:
      return state
  }
}
 
// Define your component
const TodoList: React.FC = () => {
  const [todos, dispatch] = useReducer(reducer, [])
  const [name, setName] = useState('')
 
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (name.trim() === '') {
      alert('Input cannot be empty')
      return
    }
    dispatch({type: 'add-todo', payload: { name }}); 
    setName(''); 
  }
 
  return (
    <>
    <div className='container w-75'>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <input type='text' value={name} onChange={e => setName(e.target.value)} required />
          <label>
            <span style={{transitionDelay: '0ms'}}>W</span>
            <span style={{transitionDelay: '50ms'}}>r</span>
            <span style={{transitionDelay: '100ms'}}>i</span>
            <span style={{transitionDelay: '150ms'}}>t</span>
            <span style={{transitionDelay: '200ms'}}>e</span>
            <span style={{transitionDelay: '250ms'}}></span>
            <span style={{transitionDelay: '300ms'}}>s</span>
            <span style={{transitionDelay: '350ms'}}>o</span>
            <span style={{transitionDelay: '400ms'}}>m</span>
            <span style={{transitionDelay: '450ms'}}>e</span>
            <span style={{transitionDelay: '500ms'}}>t</span>
            <span style={{transitionDelay: '550ms'}}>h</span>
            <span style={{transitionDelay: '600ms'}}>i</span>
            <span style={{transitionDelay: '650ms'}}>n</span>
            <span style={{transitionDelay: '700ms'}}>g</span>
          </label>
        </div>
      </form>
      <div>
        {todos.map(todo => 
        { return <NewTodo key={todo.id} todo={todo} dispatch={dispatch} />})}
      </div>
    </div>
     
    </>
  )
}
 
export default TodoList


// When someone press on the edit he should be able to press enter(better user experience); 