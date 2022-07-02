import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Routes, Route, useParams, Link } from 'react-router-dom';
import Loader from '../Component/Loader';

export default function Details() {
  const [pokemon, setPokmon] = useState([])
  const { id } = useParams()
  const [openLoader, setopenLoader] = useState(true)
  async function fetchpokeMon() {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((res) => {
        setPokmon(res.data)
        setopenLoader(false)
      }).catch((err) => {
        console.log(err)
      }
      )
  }
  const handleAdd = (pokemon)=>{
        var data = JSON.parse(localStorage.getItem("BookMark")) 
        if(data)
        {
          let newdata = data.filter(data=> data.id != pokemon.id)
          localStorage.setItem("BookMark", JSON.stringify(data ? [...newdata, pokemon] : [pokemon]))
        }
        else {
          localStorage.setItem("BookMark", JSON.stringify(data ? [...data, pokemon] : [pokemon]))

        }
      }    

  useEffect(() => {
    fetchpokeMon()
  }, [])

  return (
    <>
       <Link to="/" className="link" >Back</Link>
       <Link to="/bookmark" className="link2">BookMark</Link>
      {openLoader ? <Loader /> :
        <div className='parent'>
          <div class='child'>
            <img src={pokemon.sprites.other.dream_world.front_default} alt="" className='img' />
            <button onClick={() => handleAdd(pokemon)} className="btn">Add To BookMark</button>
          </div>
          <div class='child'>
            <h3>Name:{pokemon.name}</h3>
            <h3>Species: {pokemon.species.name}</h3>
            <h3>Height: {pokemon.height}cm</h3>
            <h3>Weight: {pokemon.weight}00g</h3>
            <h3>Type: {pokemon.types.map(ptype => `${ptype.type.name} `)}</h3>
            <h3>HP: {pokemon.stats[0].base_stat}</h3>
            <h3>Attacks: {pokemon.stats[1].base_stat}</h3>
            <h3>Defense: {pokemon.stats[2].base_stat}</h3>
            <h3>Speed: {pokemon.stats[5].base_stat}</h3>
          </div>
        </div>

      }

    </>
  )
}
