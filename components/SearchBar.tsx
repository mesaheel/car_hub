"use client"
import React, { useState } from "react";
import SearchManufacturer from "./SearchManufacturer"
import Image from "next/image";
import { useRouter } from "next/navigation";

const SearchButton = ({otherClasses}: {otherClasses?: string}) => (
  <button type="submit" className={`-ml-3 z-10 ${otherClasses}`}>
    <Image 
      src="/magnifying-glass.svg"
      alt="magnifying glass"
      width={40}
      height={40}
      className="object-contain"
    />
  </button>
)

const SearchBar = () => {

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if( manufacturer === '' && model === '' ) {
      return alert("Please fill in the search bar")
    }
    updateSearchParams(model.toLocaleLowerCase(), manufacturer.toLocaleLowerCase())
  }

  const updateSearchParams = ( model: string, manufacturer: string ) => {
    const searchParams = new URLSearchParams(window.location.search)
    if(model) {
      searchParams.set('model', model)
    } else {
      searchParams.delete('model')
    }
    
    if(manufacturer) {
      searchParams.set('manufacturer', manufacturer)
    } else {
      searchParams.delete('manufacturer')
    }
    const newPathName = `${window.location.pathname}?${searchParams.toString()}`

    router.push(newPathName)
  }
  const router = useRouter();
  const [manufacturer, setManuFacturer] = useState("");
  const [model, setModel] = useState('');

  return (
    <form className='searchbar' onSubmit={handleSearch}>
        <div className="searchbar__item">
        <SearchManufacturer 
            manufacturer = {manufacturer}
            setManuFacturer = {setManuFacturer}
        />
        <SearchButton otherClasses="sm:hidden" />
        </div>
        <div className="searchbar__item">
            <Image 
              src="/model-icon.png"
              width={25}
              height={25}
              alt="model icon"
              className="absolute w-[20px] h-[20px] ml-4"
            />
            <input
              type="text"
              name="model"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              placeholder="Model"
              className="searchbar__input"
            />
            <SearchButton otherClasses="sm:hidden" />
        </div>
        <SearchButton otherClasses="max-sm:hidden" />
    </form>
  )
}

export default SearchBar