import './App.css'
import { useCocktailsByLetter } from './hooks/cocktails/useCocktails'
import { getRamdomLetter } from './helpers/ramdomLetters'
import { CocktailCard } from './components/CocktailCard/CocktailCard'
import { LoadingCocktails } from './components/CocktailCard/LoadingCocktails'
import { RandomCocktail } from './components/RandomCocktail'


export default function App() {

  const [cocktails, setCocktails] = useCocktailsByLetter("a")

  const handleClick = () => {
    setCocktails(getRamdomLetter())
  }
  const move = () => {
    
  }

  return(
    <>
      <button onClick={handleClick}>Buscar</button>
      <div className='gallery'>
          {cocktails 
            ? cocktails.map((cocktail) => ( <CocktailCard key={cocktail.id} id={cocktail.id} name={cocktail.name} image={cocktail.image}/>))
            : <LoadingCocktails/>
          }
      </div>
    </>
    )
}

