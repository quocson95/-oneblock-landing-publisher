import Image from 'next/image'
import { useEffect, useState } from 'react';
import Tabs from '../../components/Tabs';


type S3ObjectSync = {
    Name: string,
    PresignUrl: string,
}


const ImageGallery = () => {
  // Sample image data
  const  [images, setImages] = useState([]);

const getImages = async (offset: number, limit: number) =>{
    const url = `https://api.oneblock.vn/be/s3?bucket=cms-images&offset=${offset}&limit=${limit}`
    const response = await fetch(url)
    const data = (await response.json());
    setImages(data);
    return data
}
    useEffect(()=>{
        getImages(0, 1000)
    },[])

  return (
    <>
    <Tabs></Tabs>
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Image Gallery</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image: any, index) => (
          <div key={index} className="relative overflow-hidden rounded-lg shadow-md group">
            <Image
              src={image.presignUrl	}
              alt={image.name}
              width={600}
              height={400}
              className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center">
              <p className="text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {image.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  )
}

export default ImageGallery;
