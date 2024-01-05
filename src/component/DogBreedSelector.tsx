import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

interface DogBreedSelectorProps {}

const fetchDogBreeds = async () => {
  const response = await fetch('https://dog.ceo/api/breeds/list/all');
  const data = await response.json();
  return Object.keys(data.message);
};

const DogBreedSelector: React.FC<DogBreedSelectorProps> = () => {
  const { data: dogBreeds } = useQuery<string[]>('dogBreeds', fetchDogBreeds);
  const [selectedBreed, setSelectedBreed] = useState<string>(()=>{
    const saveBreed =localStorage.getItem("selectedBreed")
    return saveBreed || "select a breed"
  })
  const [selectedBreedImages,setSelectedBreedImages] = useState<[]>([])
  const handleSelectChange =(e:any)=>{
    setSelectedBreed(e.target.value);
    
  }
  
  useEffect(() => {
    localStorage.setItem("selectedBreed", selectedBreed )
  }, [selectedBreed])
  
  useEffect(() => {
   const fetchImage = async () => {
      const response = await fetch(`https://dog.ceo/api/breed/${selectedBreed}/images`);
      const data = await response.json();
      setSelectedBreedImages(Array.isArray(data.message) ? data.message : []);
    }
    fetchImage()
  }, [selectedBreed])

  return (
    <div className="bg-gray-200 rounded-md md:p-3 p-0 pt-2 m-auto">
      <label className="block text-lg font-semibold mb-2">Select a Dog Breed:</label>
      <select className="w-full p-2 border rounded-md" 
      value={selectedBreed}
      onChange={handleSelectChange}
      >
        
        {dogBreeds &&
          dogBreeds.map((breed) => (
            <option key={breed} value={breed}>
              {breed}
              
            </option>
          ))}
      </select>
      <div className='flex flex-row flex-wrap gap-5 mt-5 px-4 mx-auto'>
      {selectedBreedImages.map((image) =>(
        <img src={image} alt="dog" 
        className='w-[100px] h-[150px] object-cover rounded-[15px]'
        />
      )
        
      )}
      </div>
      
    </div>
  );
};

export default DogBreedSelector;
