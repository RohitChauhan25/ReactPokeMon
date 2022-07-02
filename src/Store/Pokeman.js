import {  createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

export const STATUSES = Object.freeze({
  IDLE: 'idle',
  ERROR: 'error',
  LOADING: 'loading',
});

const pokemonSlice = createSlice({
    name: "Pokeman",
    initialState:{
        searchData:[],
        group:[],
        ability:[], 
        habitat:[],
        location:[],
        search:"",
        status: STATUSES.IDLE,
    },
    reducers:{
        setStatus(state, action) {
            state.status = action.payload;
        },
        setSearch(state, action){
          state.search = action.payload
        },
        setPokemandata(state, action){
            state.data = action.payload
        },
        setAbility(state, action){
          state.ability = action.payload
        },
        sethabitat(state, action){
        state.habitat = action.payload
        },
        setLocation(state, action){
        state.location = action.payload
        },
        setData(state, action){
        state.searchData.push(action.payload)
       },
       emptySearchdata(state, action){
           state.searchData = []
       },
       setGroup(state, action){
        state.group = action.payload
    }
     }
}) 

export const { setSearch, setPokemandata, setAbility, sethabitat, setLocation, setData , emptySearchdata, setGroup, setStatus} = pokemonSlice.actions;
export default pokemonSlice.reducer;

export function getPokemon() {
    return async function getchPokemanThunk(dispatch, getState) {
        dispatch(setStatus(STATUSES.LOADING));

      const {pokeman }= getState()
                axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeman.search}`)
                  .then((res) => {
                    dispatch(setPokemandata(res.data));
                    console.log(res.data)
                    dispatch(setStatus(STATUSES.IDLE));
                  }).catch((err) => {
                    dispatch(setStatus(STATUSES.ERROR));
                    console.log(err)
                  })
            }
}
export function getAblity() {
  return async function getAblityThunk(dispatch, getState) {
    dispatch(setStatus(STATUSES.LOADING));
              axios.get(`https://pokeapi.co/api/v2/ability`)
                .then((res) => {
                  dispatch(setAbility(res.data.results));
                  console.log(res.data)
                  dispatch(setStatus(STATUSES.IDLE));
                }).catch((err) => {
                  dispatch(setStatus(STATUSES.ERROR));
                  console.log(err)
                })
          }
}

export function gethabitat() {
  return async function gethabitatThunk(dispatch, getState) {
    dispatch(setStatus(STATUSES.LOADING));
              axios.get(`https://pokeapi.co/api/v2/pokemon-habitat`)
                .then((res) => {
                  dispatch(sethabitat(res.data.results));
                  console.log(res.data)
                  dispatch(setStatus(STATUSES.IDLE));
                }).catch((err) => {
                  dispatch(setStatus(STATUSES.ERROR));
                  console.log(err)
                })
          }
}
export function getGroup() {
  return async function getGroupThunk(dispatch, getState) {
    dispatch(setStatus(STATUSES.LOADING));
              axios.get(`https://pokeapi.co/api/v2/egg-group`)
                .then((res) => {
                  dispatch(setGroup(res.data.results));
                  console.log(res.data)
                  dispatch(setStatus(STATUSES.IDLE));
                }).catch((err) => {
                  dispatch(setStatus(STATUSES.ERROR));
                  console.log(err)
                })
          }
}

export function getLocation() {
  return async function getLocationThunk(dispatch, getState) {
    dispatch(setStatus(STATUSES.LOADING));
              axios.get(`https://pokeapi.co/api/v2/location`)
                .then((res) => {
                  dispatch(setLocation(res.data.results));
                  console.log(res.data)
                  dispatch(setStatus(STATUSES.IDLE));
                }).catch((err) => {
                  dispatch(setStatus(STATUSES.ERROR));
                  console.log(err)
                })
          }
}

export function getSearchByAbility() {
  return async function getSearchPokemanThunk(dispatch, getState) {
    dispatch(setStatus(STATUSES.LOADING));
    dispatch(emptySearchdata([]))
    const {pokeman }= getState()
              axios.get(`https://pokeapi.co/api/v2/${pokeman.search}`)
                .then((res) => {
                  let data = res.data.pokemon
                  var searcdata = []
                    data.forEach(data=>{
                         axios.get(data.pokemon.url)
                        .then((res)=>{
                          let data =  res.data;
                          dispatch(setData(data))
                          dispatch(setStatus(STATUSES.IDLE));
                        })
                        .catch((err)=>{
                          console.log(err)
                        })
                  })
                }).catch((err) => {
                  dispatch(setStatus(STATUSES.ERROR));
                  console.log(err)
                })
          }
}
export function getSearchByLocation() {
  return async function getSearchByLocationThunk(dispatch, getState) {
    dispatch(setStatus(STATUSES.LOADING));
    dispatch(emptySearchdata([]))
    const {pokeman }= getState()
              axios.get(`https://pokeapi.co/api/v2/location-area/${pokeman.search}-area`)
                .then((res) => {
                  let data = res.data.pokemon_encounters
                    data.forEach(data=>{
                         axios.get(data.pokemon.url)
                        .then((res)=>{
                          let data =  res.data;
                          console.log(res.data)
                          dispatch(setData(data))
                          dispatch(setStatus(STATUSES.IDLE));
                        })
                        .catch((err)=>{
                          dispatch(setStatus(STATUSES.ERROR));
                          console.log(err)
                        })
                  })
                }).catch((err) => {
                  dispatch(setStatus(STATUSES.ERROR));
                  console.log(err)
                })
          }
}
export function getSearchHabitat() {
  return async function getSearchHabitatThunk(dispatch, getState) {
    dispatch(setStatus(STATUSES.LOADING));
    dispatch(emptySearchdata([]))
    const {pokeman }= getState()
              axios.get(`https://pokeapi.co/api/v2/pokemon-habitat/${pokeman.search}`)
                .then((res) => {
                  let data = res.data.pokemon_species
                  console.log(res.data)
                    data.forEach(data=>{
                      axios.get(`https://pokeapi.co/api/v2/pokemon/${data.name}`)
                        .then((res)=>{
                          let data =  res.data;
                          console.log(res.data)
                          dispatch(setData(data))
                          dispatch(setStatus(STATUSES.IDLE));
                        })
                        .catch((err)=>{
                          dispatch(setStatus(STATUSES.ERROR));
                          console.log(err)
                        })
                  })
                }).catch((err) => {
                  dispatch(setStatus(STATUSES.ERROR));
                  console.log(err)
                })
          }
}
export function getSearchByGroup() {
  return async function getSearchByGroupThunk(dispatch, getState) {
    dispatch(setStatus(STATUSES.LOADING));
    dispatch(emptySearchdata([]))
    const {pokeman }= getState()
              axios.get(`https://pokeapi.co/api/v2/egg-group/${pokeman.search}`)
                .then((res) => {
                  let data = res.data.pokemon_species
                  console.log(res.data)
                    data.forEach(data=>{
                      axios.get(`https://pokeapi.co/api/v2/pokemon/${data.name}`)
                        .then((res)=>{
                          let data =  res.data;
                          console.log(res.data)
                          dispatch(setData(data))
                          dispatch(setStatus(STATUSES.IDLE));
                        })
                        .catch((err)=>{
                          dispatch(setStatus(STATUSES.ERROR));
                          console.log(err)
                        })
                  })
                }).catch((err) => {
                  dispatch(setStatus(STATUSES.ERROR));
                  console.log(err)
                })
          }
}

export function getSearchByName() {
  return async function getSearchByNameThunk(dispatch, getState) {
    dispatch(setStatus(STATUSES.LOADING));
    dispatch(emptySearchdata([]))
    const {pokeman }= getState()
              axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeman.search}`)
                .then((res) => {
                  let data = res.data
                  dispatch(setData(data))
                  dispatch(setStatus(STATUSES.IDLE));                      
                }).catch((err) => {
                  dispatch(setStatus(STATUSES.ERROR));
                  console.log(err)
                })
          }
}

