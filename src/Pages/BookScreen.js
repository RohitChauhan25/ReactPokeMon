import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function BookScreen() {
    const [pokemon , setPokemon] = useState([])
    const getPokemon = async()=>{
        let data = await JSON.parse(localStorage.getItem("BookMark")) 
        console.log(data)
        setPokemon(data)
    }
     const handleRemove = async (pokeman)=>{
        console.log("object")
        let data = await JSON.parse(localStorage.getItem("BookMark")) 
        console.log(data)
        console.log(pokeman)
        data.forEach(data=>{
            console.log(data.id)
        })
        let newdata = data.filter(data=> data.id != pokeman.id)
        console.log(newdata)
        localStorage.setItem("BookMark", JSON.stringify(newdata))
        getPokemon()
     }
    useEffect(()=>{
        getPokemon()
     
    },[])

  return (
      <div className='row'>
        <div className='col'>
          <div className="app-contaner">
          <Link to="/" className="link" >Home</Link>
            <h1>Book Marked PokeMon </h1>
              <div className="pokemon-container">
                <div className="all-container">
                  {pokemon.length>0 ? pokemon.map(pokemonStats =>
                    <>
                        <div key={pokemonStats.id} className="thumb-container">
                          <div className="number"><small></small></div>
                          <img src={pokemonStats.sprites.other.dream_world.front_default} alt={pokemonStats.name} />
                          <div className="detail-wrapper">
                            <h3>{pokemonStats.name}</h3>
                            <small>Type: {pokemonStats.types[0].type.name}</small>
                          </div>
                          <div className='row'>

                          </div>
                          <button onClick={() => handleRemove(pokemonStats)} className='btn'>Remove </button>
                        </div>
                    </>
                  )
                  : <span style={{color: "red"}}> No item added to bookmark </span>
                  }
                </div>
               
              </div>
        
          </div>
        </div>
      </div>
  )
}
