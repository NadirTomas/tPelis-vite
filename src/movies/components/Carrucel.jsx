import { useEffect, useState } from 'react';

import { Swiper, SwiperSlide} from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Box, Typography } from '@mui/material';


export const Carrucel = () => {
    
    const [peliculas, setPeliculas] = useState([]);

    const obtenerPeliculas = async () => {
      const url = 'https://api.themoviedb.org/3/trending/all/week?api_key=d9f5aeafdb73c67c649d861f2986d584';
      const res = await fetch(url);
      const data = await res.json();
      setPeliculas(data.results)
    }
  
    useEffect(() => {
      obtenerPeliculas();
    }, []);
    
    
    return (
        <Box sx={{marginBottom: 6}}>
        <Typography fontWeight={600} sx={{color: '#fff', fontSize: 20, marginBottom: 1}}>Lo mas Visto</Typography>
        <Swiper 
        modules={[Navigation]}
        spaceBetween={10}
        slidesPerView={5}
        navigation
        onSlideChange={() => console.log('slide Change')}
        onSwiper={(swiper) => console.log(swiper)}
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