import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    movies: [],
    movieBasket: [],
    status: 'idle',
    error: null,
    totalQuantity: 0,
    totalPrice: 0
}

const MOVIE_API_URL = 'https://api.themoviedb.org/3/movie/popular?api_key=b695e0359e7de9f18d330a080ed7428e'

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
    try {
        const res = await fetch(MOVIE_API_URL)
        const data = await res.json()

        return data.results
    }
    catch (err) {
        console.error(err)
    }
})

const movieSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        addNewMovie: (state, action) => {
            const find = state.movieBasket.findIndex(findIndex => findIndex.id === action.payload.id)
            if (find >= 0) {
                state.movieBasket[find].quantity += 1
            } else {
                const newItem = { ...action.payload, quantity: 1, price: Math.floor(Math.random() * 102) }
                state.movieBasket.push(newItem)
            }
        },
        deleteMovie: (state, action) => {
            state.movieBasket = state.movieBasket.filter(filterItem => filterItem.id !== action.payload.id)
        },
        calculateTotal: (state) => {
            let { totalPrice, totalQuantity } = state.movieBasket.reduce(
                (totalMovieAcc, currentMovieValue) => {
                    const { price, quantity } = currentMovieValue;

                    const totalValue = price * quantity
                    totalMovieAcc.totalQuantity += quantity
                    totalMovieAcc.totalPrice += totalValue

                    return totalMovieAcc
                },
                {
                    totalQuantity: 0,
                    totalPrice: 0
                }
            )
            state.totalQuantity = totalQuantity
            state.totalPrice = totalPrice.toFixed(2)
        },
        increaseMovieItem: (state, action) => {
            state.movieBasket = state.movieBasket.map((item) => {

                if (item.id === action.payload.id) {
                    return { ...item, quantity: item.quantity + 1 }
                }

                return item
            })
        },
        decreaseItem: (state, action) => {
            state.movieBasket = state.movieBasket.map(item => {
                if (item.id === action.payload.id) {
                    return { ...item, quantity: item.quantity - 1 }
                }

                return item
            })
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovies.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.status = 'fulfilled'
                state.movies.push(action.payload)
            })
            .addCase(fetchMovies.rejected, (state) => {
                state.status = 'rejected'
                state.error = err
            })
    }
})

export const selectAllMovies = state => state.movies.movies
export const selectAllMovies2 = state => state.movies.movies.flat()
export const getMovieStatus = state => state.movies.status
export const getMovieError = state => state.movies.error
export const selectAllNewMovies = state => state.movies.movieBasket

export const { addNewMovie, deleteMovie, calculateTotal, increaseMovieItem, decreaseItem } = movieSlice.actions

export default movieSlice.reducer