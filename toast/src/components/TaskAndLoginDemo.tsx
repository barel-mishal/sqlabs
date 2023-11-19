
import Container from 'react-bootstrap/esm/Container';
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/esm/Form';
import Button from 'react-bootstrap/esm/Button';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Card, Stack } from 'react-bootstrap';
import { tryOption } from '../utils/tryOption';

export default function App() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const reduceLogin = {
    emailHandler: (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.currentTarget.value);
    },
    passHandler: (e: React.ChangeEvent<HTMLInputElement>) => {
      setPass(e.currentTarget.value);
    },
    isEmptyFields:() => {
     if (email === '' || pass === '') {
       return true;
     }
     return false;
   },
    notify: () => {
      if (reduceLogin.isEmptyFields()) {
        toast.error('Please fill all fields');
      } else {
        toast.success('Success');
      }
    },
  }

  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<string[]>([]);
  const reduceTasks = {
    removeHandler: (index: number) => {
      const newTasks = tasks.filter((_, i) => i !== index);
      setTasks(newTasks);
    },
    addHandler: () => {
      const newTasks = [...tasks, task];
      setTasks(newTasks);
      setTask('');
    },
  }
  const fechePokemon = async () => {
    const data = await (await fetch('https://api.pokemontcg.io/v2/cards?limit=10')).json();
    console.log(data);
  }
  tryOption(fechePokemon);



  return (
    <>
      <Container>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={email} onChange={reduceLogin.emailHandler}/>
            <Form.Text className="text-muted">
              We'll never share your email with anyone else. {email}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={pass} onChange={reduceLogin.passHandler} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" onClick={reduceLogin.notify}>
            Submit
          </Button>
        </Form>
        <ToastContainer />
      </Container>
      <Container><Stack gap={4}>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>New Task</Form.Label>
            <Form.Control type="text" placeholder="Enter Task" value={task} onChange={(e) => setTask(e.currentTarget.value)}/>
            <Form.Text className="text-muted">
              
            </Form.Text>
          </Form.Group>
          <Button variant="primary" onClick={reduceTasks.addHandler}>
            Submit
          </Button>
        </Form>
        <Stack gap={2}>
          {tasks.length === 0 ? <Card text='dark' bg='info' className='mt-2 text-center'>
            <Card.Text>WOW YOU DO NOT HAVE ANY TASK</Card.Text>
          </Card> : tasks.map((i, index) => {
          return <Card key={`${index}-${i}`} text='light' bg='primary' className="mt-2 rounded p-2 border ">
            <Card.Text className='flex gap-2 items-center'>
              <Button  onClick={() => reduceTasks.removeHandler(index)}>X</Button>
              <span>{i}</span>
            </Card.Text>
          </Card>
          })}
        </Stack>
        </Stack>
      </Container>    
    </>
  )
}
