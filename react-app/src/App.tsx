import { useState } from 'react'
import './App.css'

function Todo(props: { item: string }) {
  return <>
  <p>{props.item}</p>
  </>
}

function App() {
  const [count, setCount] = useState<JSX.Element[]>([]);
  const [todo, setTodo] = useState<string>('');

  return (
    <>
    <div className='controllers'>
      <button onClick={() => {
        const currentTodo = todo.trim()
        setTodo(() => '')
        setCount(() => [...count, <Todo item={currentTodo} key={`listy-${count.length}`} />])
      }}>
      plus
      </button>
      <input type="text" value={todo} onFocus={(e) => e.currentTarget.select()} onInput={(e) => {
        const element = e.currentTarget.value
        setTodo(() => element)
      }} />
    </div>
    <div className='view-todos'>{count.map((i, ind) => {
      return <div className='todo-item' key={`todo-${ind}`}>
        <span>{i}</span>
        <button onClick={() => {
          setCount(() => count.filter((_, index) => index !== ind))
        }}>X</button>
      </div>
    })}</div>
    </>
  )
}

export default App
