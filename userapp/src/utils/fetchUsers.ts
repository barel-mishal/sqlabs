import { User } from "../App";


export const getAllUsers = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users?_limit=2');
    if (!res.ok) return; // TODO: handle error
    const users = await res.json();
    return users;
  }

  
  export const deleteUser = async (id: number) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: 'DELETE'
    });
    if (!res.ok) throw new Error('User could not be deleted');
    const deletedUser = await res.json();
    return deletedUser;
  }
  
  export const addUser = async (user: User) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!res.ok) throw new Error('User could not be added');
    const addedUser = await res.json();
    return addedUser;
  }
  
  export const updateUser = async (user: User) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${user.id}`, {
      method: 'PUT',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!res.ok) throw new Error('User could not be updated');
    const updatedUser = await res.json();
    return updatedUser;
  }