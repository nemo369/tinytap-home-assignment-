import { useEffect } from 'react';
import { useImageStore } from '../../state/state';

export default function ImagesList() {
  const { images,setImage, image:currentImage } = useImageStore(state => state);

  useEffect(() => {
    console.log(images);

  }, [images])

  return (
    <ul className='flex gap-x-5 '>
      {images.map((image, index) => {
        return <li key={image.lastModified} className={`${image.lastModified === currentImage?.lastModified ? ' border-blue-300' : 'border-transparent'} border rounded-md overflow-hidden shadow`}>
          <button 
          onClick={() => setImage(image)} >
            <img src={URL.createObjectURL(image)} alt={image.name} className="w-20 h-full aspect-image block object-contain" />
          </button>
        </li>
      })}
    </ul>

  )
}
