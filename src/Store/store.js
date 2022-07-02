import { configureStore, isAsyncThunkAction } from '@reduxjs/toolkit'

import pokemanReducer from './Pokeman'

const store = configureStore({
    reducer: {
        pokeman: pokemanReducer,
       
    }
})

export default store