import { useEffect, useState } from 'react'
import './App.css'
import AddUser from './ components/AddUser';
import { deleteUser, getAllUsers } from './utils/fetchUsers';

interface Geo {
  lat: string;
  lng: string;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

type Users = User[];

function App() {
  const [users, setUsers] = useState<Users>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  useEffect(() => {
    setLoading(true);    
    getAllUsers()
    .then((users) => setUsers(users))
    .catch((err) => setError(err.message))
    .finally(() => setLoading(false));
  }, []);

  const onDelete = (id: number) => {
    const originalUsers = [...users];
    setUsers(users.filter((user) => user.id !== id));
    deleteUser(id)
    .catch((err) => {
      setUsers(originalUsers);
      setError(err.message)
    })
    .finally(() => setLoading(false));
  };
  return (
    <>
    <nav className='bg-sky-800 text-white p-2'>
      <ul>
        <li className='text-3xl'><a href="/">UsersApp</a></li>
      </ul>
    </nav>
    {!loading && <div className='grid gap-10 '><div><ul className='grid gap-5 mx-auto max-w-5xl'>
      <li className={`
      text-4xl font-bold py-5 text-sky-950
      `}>Users Of My app</li>
      {error && <li className='text-xs text-rose-600 font-bold py-2'>{error}</li>}
      {users.length > 0 && users.map((user) => {
        return <li key={user.id} className='flex justify-between items-start p-4 rounded-md border-b bg-white border-sky-300/60'>
          <div className='grid gap-2'>
            <h3 className='text-2xl text-sky-900 '>{user.name}</h3>
            <p className='text-xs text-sky-900 '>{user.email}</p>
          </div>
          <div className='flex gap-2'>
              <AddUser 
                key={user.id}
                users={users}
                setUsers={setUsers}
                setError={setError}
                setLoading={setLoading}
                id={user.id}
                name={user.name}
                username={user.username}
                email={user.email}
                buttonText='Update User'
                addOrUpdate='update'
                onDelete={onDelete}
              />
              </div>
        </li>
      })}
    </ul></div>
    <AddUser
      users={users}
      setUsers={setUsers}
      setError={setError}
      setLoading={setLoading}
      addOrUpdate='add'
    />
  </div>}
    
    {
    loading && <div className='grid gap-4 m-auto max-w-5xl bg-white rounded-lg animate-pulse'>
    <div className={`
      w-1/3 py-5
      `}>
        <h1 className="w-50 h-4 bg-gray-300 rounded-lg"></h1>
      </div>
      <div className='w-1/4 py-5'>
        <p className='w-35 h-2 bg-gray-300 rounded-lg'></p>
      </div>
      <div className='w-1/4 py-5'>
        <p className='w-35 h-2 bg-gray-300 rounded-lg'></p>
      </div>
      <div className='w-1/4 py-5'>
        <p className='w-35 h-2 bg-gray-300 rounded-lg'></p>
      </div>
      <div className='w-1/4 py-5'>
        <p className='w-35 h-2 bg-gray-300 rounded-lg'></p>
      </div>
      <div className='w-1/4 py-5'>
        <p className='w-35 h-2 bg-gray-300 rounded-lg'></p>
      </div>
    </div>
    }
    <footer className='h-44'></footer>
    </>
  )
}

export default App









