import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Movie from './Movie';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'

export default function Row({ title, fetchURL, rowID }) {
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        axios.get(fetchURL)
            .then(response => {
                setMovies(response.data.results)
            })
    }, [fetchURL])

    const slideLeft = () => {
        const slider = document.getElementById('slider' + rowID);
        slider.scrollLeft = slider.scrollLeft - 500;
    }

    const slideRight = () => {
        const slider = document.getElementById('slider' + rowID);
        slider.scrollLeft = slider.scrollLeft + 500;
    }

    return (
        <div>
            <h2 className='text-white font-bold md:text-xl p-4 mt-4'>{title}</h2>
            <div className="relative flex items-center text-white group">
                <MdChevronLeft
                    onClick={slideLeft}
                    className='bg-white text-black rounded-full absolute left-0 z-10 opacity-50 hover:opacity-100 cursor-pointer hidden group-hover:block '
                    size={40} />
                <div id={`slider${rowID}`} className='w-full h-full overflow-x-scroll whitespace-nowrap scrollbar-hide scroll-smooth mb-3'>
                    {movies.map((movie, index) => {
                        return (
                            <Movie movie={movie} key={index} />
                        )
                    })}
                </div>
                <MdChevronRight
                    onClick={slideRight}
                    className='bg-white text-black rounded-full absolute right-0 z-10 opacity-50 hover:opacity-100 cursor-pointer hidden group-hover:block '
                    size={40} />
            </div>
        </div>
    )
}
