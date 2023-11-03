import { useEffect, useState } from 'react';

import { Swiper, SwiperSlide} from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Box, Typography } from '@mui/material';


export const Carrucel = () => {
    
    const [peliculas, setPeliculas] = useState([]);

    const obtenerPeliculas = async () => {
      const url = `${import.meta.env.VITE_API_URL}/trending/all/week?api_key=${import.meta.env.VITE_KEY_API}`;
      const res = await fetch(url);
      const data = await res.json();
      setPeliculas(data.results)
    }
  
    useEffect(() => {
      obtenerPeliculas();
    }, []);
    
    console.log(import.meta.env.VITE_SOME_KEY) // 123
    console.log(import.meta.env.DB_PASSWORD) // undefined
    
    
    return (
        <Box sx={{marginBottom: 6}}>
        <Typography fontWeight={600} sx={{color: '#fff', fontSize: 20, marginBottom: 1}}>Lo mas Visto</Typography>
        <Swiper 
        modules={[Navigation]}
        spaceBetween={10}
        slidesPerView={5}
        navigation
        onSlideChange={() => {}}
        onSwiper={(swiper) => {}}
        >
        { 
            peliculas.map(pelicula => (
                <SwiperSlide key={pelicula.id}>
                    <img
                        style={{
                            width: '100%',
                            aspectRatio: '16/9',
                            objectFit: 'cover',
                            borderRadius: 10
                        }}
                        src={`https://image.tmdb.org/t/p/w500/${pelicula.poster_path}`} 
                        alt={pelicula.title || "No title available"}
                    /> 
                </SwiperSlide>
            ))
        }
        </Swiper>
        </Box>

    )
}