import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { calculateTotal, decreaseItem, deleteMovie, increaseMovieItem, selectAllNewMovies } from "../features/movieSlice";

import { BsPlus, BsDash, BsTrash, BsHeart } from "react-icons/bs";


const Shop = () => {

    const dispatch = useDispatch()
    const newMovies = useSelector(selectAllNewMovies)

    const { totalQuantity, totalPrice, movieBasket } = useSelector(state => state.movies)

    useEffect(() => {
        dispatch(calculateTotal())
    }, [movieBasket])


    return (
        <>
            <section className="shop-section py-14 px-10 grid grid-cols-12 gap-8">

                <div className="col-span-8 p-4 bg-slate-500 relative">
                    <h3 className="text-xl pb-3 text-white">Product Quantity</h3>
                    <div className="border-b border-gray-300 w-full left-0 absolute"></div>

                    <div className="flex flex-col gap-8 py-10 px-6">
                        {newMovies.map(newItem => (
                            <div key={newItem.id} className="bg-white flex rounded-md p-5">
                                <img src={`https://image.tmdb.org/t/p/w200/${newItem.poster_path}`} alt="" />

                                <div className="px-5">

                                    <div className="flex items-center justify-between">
                                        <h6 className="text-xl font-medium">{newItem.original_title}</h6>

                                        <div className="flex items-center">
                                            <span className="text-xl pr-6">{newItem.price}&#36;</span>
                                            <button className="text-xl">
                                                <BsHeart />
                                            </button>
                                        </div>

                                    </div>

                                    <h6 className="text-gray-700 font-semibold pt-1">{newItem.release_date}</h6>

                                    <p className="pt-6">{newItem.overview}</p>

                                    <div className="flex items-center justify-between pt-4">

                                        <div className="flex items-center space-x-3">
                                            <button className="text-2xl bg-orange-500 text-white rounded-full p-1"
                                                onClick={() => dispatch(increaseMovieItem(newItem))}
                                            >
                                                <BsPlus className="pointer-events-none" />
                                            </button>

                                            <input type="number" value={newItem.quantity} readOnly className="w-10 pl-1 py-1 text-sm rounded-md outline-none border-[1px] border-orange-300" />

                                            <button className="text-2xl bg-orange-500 text-white rounded-full p-1"
                                                onClick={() => dispatch(decreaseItem(newItem))}
                                                disabled={newItem.quantity <= 1}
                                            >
                                                <BsDash />
                                            </button>
                                        </div>

                                        <button onClick={() => dispatch(deleteMovie(newItem))} className="text-2xl bg-red-600 text-white p-2">
                                            <BsTrash />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


                <div className="col-span-4 p-4 bg-slate-500 relative">
                    <h3 className="text-xl pb-3 text-white">Summary</h3>
                    <div className="border-b border-gray-300 w-full left-0 absolute"></div>

                    <h6 className="text-xl text-white font-medium pt-4 pb-2">Total Quantity: {totalQuantity}</h6>
                    <h6 className="text-xl text-white font-medium">Total Price: {totalPrice}&#36;</h6>
                </div>
            </section>
        </>
    )
};

export default Shop;
