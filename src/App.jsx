import './App.css'
import { useCocktailsByLetter } from './hooks/cocktails/useCocktails'
import { getRamdomLetter } from './helpers/ramdomLetters'


export default function App() {

  const [cocktails, setCocktails] = useCocktailsByLetter("x")

  const handleClick = () => {
    setCocktails(getRamdomLetter())
  }

  return(
      <div className='gallery'>
        <button onClick={handleClick}>Buscar</button>
        {cocktails ? 
        cocktails.map((product) => (
          <div key={product.id} >
            <p>{product.name}</p>
            <img src={product.image} alt={`Imagen ${product.id}`} />
          </div>
        ))
        : <h1>Cargando...</h1>
      }
        </div>
    )
}

