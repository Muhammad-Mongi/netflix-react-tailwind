import React, { useEffect, useState } from 'react'
import { UserAuth } from '../context/AuthContext';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { db } from '../firebase';
import { updateDoc, doc, onSnapshot } from 'firebase/firestore'
import { AiOutlineClose } from 'react-icons/ai'


export default function SavedShows() {

    const [movies, setMovies] = useState([]);
    const { user } = UserAuth();
    const slideLeft = () => {
        const slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft - 500;
    }
    const movieRef = doc(db, 'users', `${user?.email}`)
    const slideRight = () => {
        const slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft + 500;
    }

    const deleteShow = async (id) => {
        try {
            const result = movies.filter(movie => movie.id !== id)
            await updateDoc(movieRef, {
                savedShows: result
            })
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        onSnapshot(doc(db, 'users', `${user?.email}`), doc => {
            setMovies(doc.data()?.savedShows)
        })
    }, [user?.email])
    return (
        <>
            <div>
                <h2 className='text-white font-bold md:text-xl p-4 mt-4'>My Shows</h2>
                <div className="relative flex items-center text-white group">
                    <MdChevronLeft
                        onClick={slideLeft}
                        className='bg-white text-black rounded-full absolute left-0 z-10 opacity-50 hover:opacity-100 cursor-pointer hidden group-hover:block '
                        size={40} />
                    <div id={`slider`} className='w-full h-full overflow-x-scroll whitespace-nowrap scrollbar-hide scroll-smooth mb-3'>

                        {movies.length > 0 ?
                            movies.map((movie, index) => {
                                return (
                                    <div key={index} className='relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block p-2 cursor-pointer'>
                                        <img
                                            src={`https://image.tmdb.org/t/p/w500/${movie.img}`}
                                            alt={movie.title} />
                                        {/* OVERLAY */}
                                        <div className='absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 transition-opacity duration-300'>
                                            <p className='text-xs md:text-sm flex items-center justify-center w-[80%] m-auto h-full whitespace-normal'>{movie.title}</p>
                                            <p onClick={() => deleteShow(movie.id)} className='absolute top-4 right-4 text-gray-300'>
                                                <AiOutlineClose />
                                            </p>
                                        </div>
                                    </div>
                                )
                            }) : "Nothing To Show"}
                    </div>
                    <MdChevronRight
                        onClick={slideRight}
                        className='bg-white text-black rounded-full absolute right-0 z-10 opacity-50 hover:opacity-100 cursor-pointer hidden group-hover:block '
                        size={40} />
                </div>
            </div>
        </>
    )
}
