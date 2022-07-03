import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import Loader from '../Component/Loader';
import { Link } from 'react-router-dom';
import { getAblity, getPokemon, setSearch, gethabitat, getLocation, getSearchByAbility,setStatus, getSearchByLocation, getSearchHabitat, getGroup, getSearchByGroup, getSearchByName, emptySearchdata, STATUSES } from '../Store/Pokeman';
import { useDispatch, useSelector } from 'react-redux';

export default function Home() {
  const [allPokemons, setAllPokemons] = useState([])
  const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=10')
  const [name, setName] = useState("")
  // const [searchPok, setSearchPok] = useState([])
  // const [openLoader, setopenLoader] = useState(true)
  const [error, seterror] = useState(false)
  const dispatch = useDispatch()
  const { data, ability, habitat, location, searchData, group, status } = useSelector(state => state.pokeman)
  async function getAllPokemons() {
    try {
      const res = await axios.get(loadMore)
      const data = await res.data
      setLoadMore(data.next)
      function createPokemonObject(results) {
        results.forEach(async (pokemon) => {
          axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
            .then((res) => {
              setAllPokemons(currentList => [...currentList, res.data])
              // setopenLoader(false)
            }).catch((err) => {
              console.log(err)
            }
            )
        })
      }
      createPokemonObject(data.results)
    } catch (error) {
      // setopenLoader(false)
    }
  }
  useEffect(() => {
    dispatch(getAblity())
    dispatch(gethabitat())
    dispatch(getLocation())
    dispatch(getGroup())
    getAllPokemons()

  }, [])

  const handleSearch = () => {
    if (name === "") {
      dispatch(emptySearchdata([]))
      dispatch(setStatus(STATUSES.IDLE));

    } else {
      dispatch(setSearch(name))
      dispatch(getSearchByName())
    }
  }

  const handle = () => {
    dispatch(setSearch("bulbasaur"))
    dispatch(getPokemon())
  }
  const handleChange = (e) => {
    let name = e.target.value
    if(name.length>0){
      dispatch(setSearch(name))
      dispatch(getSearchByAbility())
    }
  }

  const handleLocation = (e) => {
    let name = e.target.value
    if(name.length>0){
      dispatch(setSearch(name))
      dispatch(getSearchByLocation())
    }
  } 
  const handleHabitat = (e) => {
    let name = e.target.value
    if(name.length>0){
      dispatch(setSearch(name))
      dispatch(getSearchHabitat())
    }
  } 
  const handleGroup = (e) => {
    let name = e.target.value
    if(name.length>0){
      dispatch(setSearch(name))
      dispatch(getSearchByGroup())
    }
  } 
   
  return (
    <> {status === STATUSES.LOADING ? <Loader /> :
      <div className='row'>
        <div className='col'>
          <div className="app-contaner">
          <Link to="/bookmark" className="link" >BookMark</Link>
            <h1>Pokemon Evolution</h1>
            <input type="text" className='input' onChange={(e) => { setName(e.target.value) }} value={name} /> 
            {status === STATUSES.ERROR ? <span style={{color:"red"}}>no exact match found</span> : null}
            <button className='search' onClick={(e)=>{handleSearch(e)}}>Search</button>
            <div>
           <select  className='filter'  onChange={handleChange}>
           <option value="">Ability</option>
             {ability ? ability.map(data=> <> 
                    <option value={"ability/"+data.name}>{data.name}</option>
                    </>
                ) : <Loader /> 
                }
            </select>
            <select  className='filter' onChange={handleHabitat}>
           <option value="">Habitat</option>
             {habitat ? habitat.map(data=> <> 
                    <option value={data.name}>{data.name}</option>
                    </>
                ) : <Loader /> 
                }
            </select>
            <select  className='filter' onChange={handleLocation}>
           <option value="">Location</option>
             {location ? location.map(location=> <> 
                    <option value={location.name}>{location.name}</option>
                    </>
                ) : <Loader /> 
                }
            </select>
            <select  className='filter' onChange={handleGroup}>
           <option value="">Group</option>
             {group ? group.map(data=> <> 
                    <option value={data.name}>{data.name}</option>
                    </>
                ) : <Loader /> 
                }
            </select>
            </div>
  
            {status === STATUSES.IDLE ?           
              <div className="pokemon-container">
                <div className="all-container">

                  {searchData.length > 0 ? searchData.map(pokemonStats =>
                    <>
                      <Link to={`/details/${pokemonStats.id}`} style={{ textDecoration: "none", color: "black" }}>
                        <div key={pokemonStats.id} className="thumb-container">
                          <div className="number"><small></small></div>
                          <img src={pokemonStats.sprites.other.dream_world.front_default} alt={pokemonStats.name} />
                          <div className="detail-wrapper">
                            <h3>{pokemonStats.name}</h3>
                            <small>Type: {pokemonStats.types[0].type.name}</small>
                          </div>

                        </div>
                        </Link>
                      
                    </>
                  ) : allPokemons.map(pokemonStats =>
                    <>
                      <Link to={`/details/${pokemonStats.id}`} style={{ textDecoration: "none", color: "black" }}>
                        <div key={pokemonStats.id} className="thumb-container">
                          <div className="number"><small></small></div>
                          <img src={pokemonStats.sprites.other.dream_world.front_default} alt={pokemonStats.name} />
                          <div className="detail-wrapper">
                            <h3>{pokemonStats.name}</h3>
                            <small>Type: {pokemonStats.types[0].type.name}</small>
                          </div>
                          <div className='row'>
                          </div>
                        </div>
                      </Link>

                    </>
                  )
                  }

                </div>
                <button className="load-more" onClick={getAllPokemons}>Load more</button>
              </div>
            : null}
          </div></div>
      </div>

    }
    </>
  )
}
