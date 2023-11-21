import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';



function App() {

  return (
    <>
        <Counter />
    </>
  );
}

export default App;

export const Counter = () => {
  const [count, setCount] = useState(0);
  const increment = () => setCount(() => count+1);
  const decrement = () => setCount(() => count-1);
  useEffect(() => {
    // max 20 min 0
    if(count > 20) {
      setCount(20)
    }
    if (count < 0) {
      setCount(0)
    }
  }, [count])
  return <div className='counter'>
    <div className='screen-of-counter big'><h2>{count}</h2></div>
    <button className='red' disabled={count <= 0} onClick={decrement}>-1</button>
    <button className='green' disabled={count >= 20} onClick={increment}>+1</button>
    <div className='screen-of-counter small'><p>Counter: {count}</p></div>
  </div>
}

