import { useEffect, useState } from "react";
import Badge from "react-bootstrap/esm/Badge";
import Card from "react-bootstrap/esm/Card";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import ListGroup from "react-bootstrap/esm/ListGroup";
import Row from "react-bootstrap/esm/Row";

interface User {
    "id": 10,
    "name": "Clementina DuBuque",
    "username": "Moriah.Stanton",
    "email": "Rey.Padberg@karina.biz",
    "address": {
        "street": "Kattie Turnpike",
        "suite": "Suite 198",
        "city": "Lebsackbury",
        "zipcode": "31428-2261",
        "geo": {
            "lat": "-38.2386",
            "lng": "57.2232"
        }
    },
    "phone": "024-648-3804",
    "website": "ambrose.net",
    "company": {
        "name": "Hoeger LLC",
        "catchPhrase": "Centralized empowering task-force",
        "bs": "target end-to-end models"
    },
    "distance": number,
  }
  
  export function DefaultExample() {
    const [data, setData] = useState<User[]>([]);
  
    const [range, setRange] = useState<number>(1);
  
    useEffect(() => {
      // fetch data
      const dataFetch = async () => {
        const data = await (
          await fetch(
            'https://jsonplaceholder.typicode.com/users',
          )
        ).json();
        // set state when the data received
        // add error boundry
        const newGeoDistance = data.map((user: User) => {
          const distance = calculateDistance(32.087025901931476, 34.79448882239155, Number(user.address.geo.lat), Number(user.address.geo.lng));
          return {
            ...user,
            distance,
          };
        });
        // Sort by distance asc
        newGeoDistance.sort((a: User, b: User) => a.distance - b.distance);
        setData(newGeoDistance);
      };
      dataFetch();
    }, []);
    return (
      <Container >
        <Row>
          <Col>
            <h2>Users</h2>
            <input 
            type="range"
            name="range-number-of-record" 
            id="range-number-of-record" 
            max={101} 
            min={0} 
            step={1}
            value={range} 
            onChange={(e) => {
              setRange(parseInt(e.target.value, 10));
            }} />
          </Col>
        </Row>
        <Row>
        {data.map((i) => <Col style={{marginTop: '20px'}}>
             <KitchenSinkExample 
            city={i.address.city} 
            email={i.email} 
            name={i.name} 
            phone={i.phone} 
           />
          </Col>)}
        <div className='h-10'></div>
        </Row>
    </Container>
    );
  }
  
  interface KitchenSinkExampleProps {
    name: string;
    email: string;
    city: string;
    phone: string;
  }
  
  
  function KitchenSinkExample(props: KitchenSinkExampleProps) {
    const imgs = [
      "https://res.cloudinary.com/united-app/image/upload/v1638879014/avatars/face3_cbnzio.png",
      "https://res.cloudinary.com/united-app/image/upload/v1638879014/avatars/face2_f8i1fn.png",
      "https://res.cloudinary.com/united-app/image/upload/v1638879014/avatars/face4_dx3nu6.png",
      "https://res.cloudinary.com/united-app/image/upload/v1638879014/avatars/face5_faljpu.png",
      "https://res.cloudinary.com/united-app/image/upload/v1638879015/avatars/face1_rhjego.png",
      "https://res.cloudinary.com/united-app/image/upload/v1638879014/avatars/character7_u3r1ec.png",
      "https://res.cloudinary.com/united-app/image/upload/v1638879014/avatars/character6_bnnhx1.png",
      "https://res.cloudinary.com/united-app/image/upload/v1638879014/avatars/character3_lpd4gi.png",
      "https://res.cloudinary.com/united-app/image/upload/v1638879014/avatars/character4_vk2ven.png",
      "https://res.cloudinary.com/united-app/image/upload/v1638879014/avatars/character2_iwlus2.png",
    ]
    const random = Math.floor(Math.random() * 10);
    return (
      <Card >
        <Card.Img 
        variant="top"
        height={120} 
        style={{objectFit: 'none'}} 
        src={imgs.at(random)} />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>{props.name}</ListGroup.Item>
          <ListGroup.Item className='flex'>
            <div className='flex gap-2 items-center'>
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="#000" viewBox="0 0 256 256"><path d="M230.14,25.86a20,20,0,0,0-19.57-5.11l-.22.07L18.44,79a20,20,0,0,0-3,37.28l84.32,40,40,84.32a19.81,19.81,0,0,0,18,11.44c.57,0,1.15,0,1.73-.07A19.82,19.82,0,0,0,177,237.56L235.18,45.65a1.42,1.42,0,0,0,.07-.22A20,20,0,0,0,230.14,25.86ZM157,220.92l-33.72-71.19,45.25-45.25a12,12,0,0,0-17-17l-45.25,45.25L35.08,99,210,46Z"></path></svg>
              <p className='m-0'>{props.email}</p>
            </div>
          </ListGroup.Item>
          <ListGroup.Item>
            <div className='flex gap-2 items-center'>
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="#000" viewBox="0 0 256 256"><path d="M180,156a16,16,0,1,1-16-16A16,16,0,0,1,180,156ZM92,140a16,16,0,1,0,16,16A16,16,0,0,0,92,140Zm152,28v24a20,20,0,0,1-20,20H32a20,20,0,0,1-20-20V169.13A117.35,117.35,0,0,1,45.72,86.69L23.51,64.49a12,12,0,0,1,17-17L64.3,71.33A114.35,114.35,0,0,1,127.59,52H128a115.15,115.15,0,0,1,63.89,19.14l23.62-23.63a12,12,0,0,1,17,17l-22,22A115.18,115.18,0,0,1,244,168Zm-24,0a92,92,0,0,0-92.33-92C77.12,76.18,36,118,36,169.13V188H220Z"></path></svg>
              <p className='m-0'>{props.phone}</p>
            </div>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    );
  }

  

function MyUl(props: {data: User[]}) {
  return <Col>
  <ListGroup as="ol" numbered>
  {props.data.map((user) => {
    return <ListGroup.Item
        key={user.id}
        as="li"
        className="d-flex justify-content-between align-items-start"
      >
    <div className="ms-2 me-auto">
      <div className="fw-bold">{user.name}</div>
      <p>Email: {user.email}</p>
      <p>City: {user.address.city}</p>
    </div>
    <Badge bg="primary" pill>
      {user.distance.toFixed(4)}(km)
    </Badge>
  </ListGroup.Item>
  })}
</ListGroup> 
</Col>
}

function customHash(input: string): string {
  let hash = '';
  const possibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < input.length; i++) {
      const charCode = input.charCodeAt(i);
      const randomIndex = Math.floor((charCode * Math.random()) % possibleChars.length);
      hash += possibleChars.charAt(randomIndex);
  }

  return hash;
}

function toRadians(degrees: number): number {
  return degrees * Math.PI / 180;
}

function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const earthRadiusKm = 6371;

  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);

  lat1 = toRadians(lat1);
  lat2 = toRadians(lat2);

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
  return earthRadiusKm * c;
}

// Example usage
