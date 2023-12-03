import { useState } from "react";
import { User } from "../App";
import generateRandomID from "../utils/generateRandomID";
import { addUser, updateUser } from "../utils/fetchUsers";

export type AddUserProps = {
    users: User[];
    setUsers: (users: User[]) => void;
    setError: (error: string) => void;
    setLoading: (loading: boolean) => void;
    id: number;
    name: string;
    username: string;
    email: string;
    buttonText: string;
    addOrUpdate: 'update';
    onDelete: (id: number) => void;
  } | {
    addOrUpdate: 'add';
    users: User[];
    setUsers: (users: User[]) => void;
    setError: (error: string) => void;
    setLoading: (loading: boolean) => void;
    id?: number;
    name?: string;
    username?: string;
    email?: string;
    buttonText?: string;
  }

export const AddUser = (props: AddUserProps) => {
    const [name, setName] = useState(props.name ?? '');
    const [username, setUsername] = useState(props.username ?? '');
    const [email, setEmail] = useState(props.email ?? '');
    const add = () => {
      const originalUsers = [...props.users];
      const newUser = {
        id: props.id ?? generateRandomID(10),
        name,
        username,
        email,
      } as unknown as User;
      switch (props.addOrUpdate) {
        case 'add':
          props.setUsers([...props.users, newUser]);  
          addUser(newUser).then((user) => {
            props.setUsers([...props.users, user]);
            setName('');
            setUsername('');
            setEmail('');
          })
          .catch((err) => {
            props.setUsers(originalUsers);
            props.setError(err.message)
          }).finally(() => props.setLoading(false));
          break;
        case 'update':
          props.setUsers(props.users.map((user) => user.id === props.id ? newUser : user));
          updateUser(newUser).then(() => {
            props.setUsers(props.users.map((user) => user.id === props.id ? newUser : user));
          }).catch((err) => {
            props.setUsers(originalUsers);
            props.setError(err.message)
          }).finally(() => props.setLoading(false)) 
          break;
      }    
    }
    return <div className="grid gap-5 m-auto max-w-5xl grid-cols-2">
      <div className="">
        <label htmlFor="real-name">Name</label>
        <input  onChange={(e) => setName(e.currentTarget.value)} type="text" name="real-name" id="real-name" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={name} />
      </div>
  
      <div className="">
        <label htmlFor="email">Email</label>
        <input onChange={(e) => setEmail(e.currentTarget.value)} type="text" name="email" id="email" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={email} placeholder="email@domain.com" />
      </div>
  
      <div className="">
        <label htmlFor="user-name">User Name</label>
        <input onChange={(e) => setUsername(e.currentTarget.value)} type="text" name="user-name" id="user-name" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={username} placeholder="" />
      </div>
  
      <div className="col-span-2 flex gap-2">
        <div className="inline-flex items-end">
          <button onClick={add} className={`
          rounded-md border border-sky-800 px-4 py-2 text-sky-800 bg-sky-50
          hover:text-sky-500 hover:border-sky-500 focus-visible:animate-pulse
        `}>{props.buttonText ?? 'Add User'}</button>
        </div>
        {props.addOrUpdate === 'update' && (
        <button className={`
          rounded-md border border-rose-800 px-4 py-2 text-rose-800 bg-rose-50
          hover:text-rose-500 hover:border-rose-500 focus-visible:animate-pulse
        `} onClick={() => props.onDelete(props.id)}>Delete</button>)}
      </div>
  
    </div>
  }

export default AddUser;