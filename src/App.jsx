import './App.css'
import { useSearchCocktails } from './hooks/cocktails/useCocktails'
import { CocktailCard } from './components/CocktailCard/CocktailCard'
import { LoadingCocktails } from './components/CocktailCard/LoadingCocktails'
import { useEffect, useRef } from 'react'


export default function App() {

  const [cocktails, setCocktails] = useSearchCocktails("")

  const search = useRef()

  const handleClick = (event) => {
    event.preventDefault()
    const fields = Object.fromEntries(new window.FormData(event.target));

    const minusFields = Object.values(fields).map(field => (
      field.toLowerCase()
    ))
    console.log(minusFields)
  };

  const handleChange = () => {
    const value = search.current.value
    console.log(value)
    setCocktails(value)
  }

  return(
    <>
      <form onSubmit={handleClick}>
        <input ref={search} onChange={handleChange} name="1" type="text"/>
        <input name="2" type="text"/>
        <input name="3" type="text"/>
        <button>Buscar</button>
      </form>


      <div className="gallery">
          {cocktails 
            ? cocktails.map((cocktail) => ( <CocktailCard key={cocktail.id} id={cocktail.id} name={cocktail.name} image={cocktail.image}/>))
            : <LoadingCocktails/>
          }
      </div>
    </>
    )
}

