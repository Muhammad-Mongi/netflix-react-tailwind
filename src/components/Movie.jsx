import React, { useState } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore'
export default function Movie({ movie }) {
    const [like, setLike] = useState(false);
    const [saved, setSaved] = useState(false);
    const { user } = UserAuth();

    const movieID = doc(db, 'users', `${user?.email}`);

    const saveShow = async () => {
        if (user?.email) {
            setLike(!like);
            setSaved(true);
            await updateDoc(movieID, {
                savedShows: arrayUnion({
                    id: movie.id,
                    img: movie.backdrop_path,
                    title: movie.title
                })
            })
        } else {
            alert('please log in to save a movie')
        }
    }

    return (
        <div className='relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block p-2 cursor-pointer'>
            <img
                src={`https://image.tmdb.org/t/p/w500/${movie?.backdrop_path}`}
                alt={movie.title} />
            {/* OVERLAY */}
            <div className='absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 transition-opacity duration-300'>
                <p className='text-xs md:text-sm flex items-center justify-center w-[80%] m-auto h-full whitespace-normal'>{movie?.title}</p>

                <p onClick={saveShow}>{like ? <FaHeart className='absolute top-3 left-3' /> : <FaRegHeart className='absolute top-3 left-3' />}</p>
            </div>
        </div>
    )
}
