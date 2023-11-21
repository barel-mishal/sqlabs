import { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import Container from 'react-bootstrap/esm/Container';
import { Card as PokemonCard } from 'pokemon-tcg-sdk-typescript/dist/sdk';
import './pokemonCard.css'
import Card from 'react-bootstrap/esm/Card';
import ListGroup from 'react-bootstrap/esm/ListGroup';
import CenteredButton from './CenteredButton';

// Enum for application events
enum AppEvents {
  Initialize,
  FetchPokemons,
  DisplayPokemon,
  DisplayError,
  DisplayLoading,
}

interface FetchResponse {
  data: PokemonCard[];
  page: 1;
  pageSize: 250;
  count: 250;
  totalCount: 17174;
}

function DisplayPokemons() {
  // State to manage Pokémons, loading status, and errors
  const [pokemons, setPokemons] = useState<PokemonCard[]>([]);
  const [appEvent, setAppEvent] = useState<AppEvents>(AppEvents.Initialize);
  const [errorMsg, setErrorMsg] = useState('');
  useEffect(() => {
    const local = localStorage.getItem('pokemons');
    if (local !== null) {
      setPokemons(JSON.parse(local));
      setAppEvent(AppEvents.DisplayPokemon);
      return;
    }
  }, [pokemons]);
  // Function to fetch pokemons
  const fetchPokemon = async () => {
    const local = localStorage.getItem('pokemons');
    if (local !== null) {
      setPokemons(JSON.parse(local));
      setAppEvent(AppEvents.DisplayPokemon);
      return;
    }
    try {
      setAppEvent(AppEvents.DisplayLoading);
      setErrorMsg('');  
      const response = await fetch('https://api.pokemontcg.io/v2/cards');

      if (response.ok) {
        setAppEvent(AppEvents.FetchPokemons);
        const data: FetchResponse = await response.json();
        setPokemons(data.data);
        setAppEvent(AppEvents.DisplayPokemon);

        localStorage.setItem('pokemons', JSON.stringify(data.data));
      } else {
        // Handle HTTP errors
        setAppEvent(AppEvents.DisplayError);
        setErrorMsg(`Failed to fetch Pokémon data: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      // Handle network errors or issues with fetch
      setAppEvent(AppEvents.DisplayError);
      setErrorMsg('Network error occurred while fetching Pokémon data');
    } finally {
      setAppEvent(AppEvents.DisplayPokemon);
    }
  };

  return (
    <>
        {appEvent === AppEvents.Initialize 
        ? <Container className='h-screen items-center flex justify-content'>
          <CenteredButton onClick={fetchPokemon}>Fetch Pokemon</CenteredButton>
        </Container> : 
        appEvent === AppEvents.DisplayLoading
        ? <p>Loading...</p> : 
        appEvent === AppEvents.DisplayPokemon
        ? <Pokemons pokemons={pokemons}/> :
        appEvent === AppEvents.DisplayError
        ? <p>Error: {errorMsg}</p> : <p>Unknown error occurred</p>}
    </>
  );
}

export default DisplayPokemons;

export const Pokemons = (props: {pokemons: PokemonCard[]}) => {
  const [showImg, setShowImg] = useState(true);

  return <div>
    <div><button onClick={() => setShowImg(() => !showImg)}>Show Image Card</button></div>
    <div className='pokemons'>
    {
      props.pokemons.map(pokemon => {
        return <>
        <Card style={{ }}>
              <Card.Img hidden={showImg} variant="top" src={pokemon.images.small} />
              <Card.Body>
                <Card.Title style={{display: 'flex', justifyContent: 'space-between'}}><span>{pokemon.name}</span><span>{pokemon.hp}<span>hp</span></span></Card.Title>
                {pokemon.flavorText && <Card.Text>
                  {pokemon.flavorText}
                </Card.Text>}
              </Card.Body>
              <ListGroup className="list-group-flush">
                {pokemon.abilities && <ListGroup.Item style={{display: 'flex', gap: 4}}>{pokemon.abilities?.map(ability => <span key={ability.name}>{ability.name}</span>)}</ListGroup.Item>}
                {pokemon.attacks && <ListGroup.Item style={{display: 'flex', gap: 4}}>{pokemon.attacks?.map(attack => <span key={attack.name}>{attack.name}</span>)}</ListGroup.Item>}
                <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
              </ListGroup>
              <Card.Body>
                <div className='pokemon-basic-details'>
                  <p>{pokemon.id}</p>
                  <p>{pokemon.supertype}</p>
                  <p>{pokemon.subtypes.join(', ')}</p>
                </div>

                <div className='pokemon-attributes'>
                  <p>{pokemon.hp}</p>
                  <p>{pokemon?.types?.join(', ')}</p>
                </div>

                <div className='pokemon-evolution-details'>
                  <p>{pokemon.evolvesFrom}</p>
                  <p>{pokemon.evolvesTo?.join(', ')}</p>
                </div>

                <div className='pokemon-abilities-attacks'>
                  <p>{pokemon.abilities?.map(ability => <span key={ability.name}>{ability.name}</span>)}</p>
                  <p>{pokemon.attacks?.map(attack => <span key={attack.name}>{attack.name}</span>)}</p>
                </div>

                <div className='pokemon-set-information'>
                  <p>{pokemon.set.name}</p>
                  <p>{pokemon.set.releaseDate}</p>
                </div>

                <div className='pokemon-additional-info'>
                  <p>{pokemon.artist}</p>
                  <p>{pokemon.rarity}</p>
                </div>

                <div className='pokemon-legalities-pricing'>
                  {Object.entries(pokemon.legalities).map(([key, value]) => <p><span key={key}>{`${key}: ${value}`}</span></p>)}
                </div>
              </Card.Body>
            </Card>
     
          </>
    })
    }
  </div></div>
}

