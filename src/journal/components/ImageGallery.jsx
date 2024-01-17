import { ImageListItem, ImageList } from '@mui/material';
import { useState } from 'react';



export const ImageGallery = ({images = []}) => {
  
  const [imgUrl, setImgUrl] = useState('');
  const [active, setActive] = useState(false);

  const openAndCloseImage = (url = '') => {

    if(url.length > 1){
      setImgUrl(url);
    }

    if( active == false ){
      setActive(true)
      return 
    }else{
      setActive(false)
    }

  }

  const handleClick = (event) => {

    if(event.target.classList.contains('img-all-screen'))openAndCloseImage()

  }

  return (
    <>
      <ImageList sx={{ width: '100%', height: 500 }} cols={4} rowHeight={200}>
      { images.map((img) => (
        <ImageListItem key={img}>
          <img
            onClick={ () => openAndCloseImage(img)}
            className='img-journal'
            src={`${img}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt='Imagen de la nota'
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
    {
      (active) ? 
        <div className='img-all-screen animate__animated animate__fadeIn animate__faster' onClick={handleClick}>
          <img className='' src={imgUrl} alt="" />
        </div>
        : null
    }
    </>
    
  );
}