import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewMovie, fetchMovies, getMovieError, getMovieStatus, selectAllMovies } from "../features/movieSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";

const Home = () => {

    const dispatch = useDispatch();

    const movieList = useSelector(selectAllMovies)
    const status = useSelector(getMovieStatus)
    const err = useSelector(getMovieError)

    useEffect(() => {
        dispatch(fetchMovies())
    }, [dispatch])

    if (status === 'pending') {
        return <span className="text-blue-600 text-4xl flex items-center justify-center h-full">Loading..</span>
    }

    if (status === 'rejected') {
        return <span className="text-red-600 font-bold text-4xl">ERROR{err}</span>
    }

    const handleAddCard = (item) => {
        dispatch(addNewMovie(item))

        toast.success('Product successfully added!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    return (
        <>
            <section>

                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    closeOnClick
                    pauseOnHover
                    theme="dark"
                />
                <ToastContainer />


                <h2 className="text-2xl font-medium text-slate-800 pt-6 pl-6">Popular Films: </h2>

                <div className="py-14 px-10 grid grid-cols-4 gap-8 justify-items-center">
                    {movieList[0]?.map(item => (
                        <div key={item.id} className="flex flex-col justify-center items-center bg-slate-700 w-64 p-4 h-full cursor-pointer hover:scale-105 transition-all duration-700 group">
                            <img src={`https://image.tmdb.org/t/p/w200/${item.poster_path}`} alt="" />
                            <h2 className="text-white font-medium pt-1">{item.original_title}</h2>

                            <button className="add-to-basket-btn hidden absolute bottom-4 right-4 text-white py-2 px-4 bg-red-500 hover:bg-red-600 rounded-md group-hover:block"
                                onClick={() => handleAddCard(item)}>
                                Add to Basket
                            </button>

                            <button className="add-to-favorites-btn hidden absolute top-4 right-4 text-white py-2 px-4 bg-yellow-500 hover:bg-yellow-600 rounded-md group-hover:block">
                                Add to Favorites
                            </button>
                        </div>
                    ))}
                </div>
            </section>

        </>
    )
};

export default Home;
