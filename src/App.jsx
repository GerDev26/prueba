import { useEffect } from 'react'
import { useState } from 'react'
import './App.css'

function getRamdomLetter() {
  const letras = 'abcdefghijklmnopqrstuvwxyz';
  const indiceAleatorio = Math.floor(Math.random() * letras.length);
  return letras.charAt(indiceAleatorio);
}

function useProducts() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/products")
      .then(res => res.json())
      .then(json => {
        setProducts(json);
        console.log("peticion correcta")
      })
      .catch(error => {
        console.log("Error en la petición: ", error);
      });
  }, []);

  const productsWidthImage = products
    ?  products.filter(product => (
        product.images[ 0] !== ('[\"https://placeimg.com/640/480/any\"]' || undefined)
      ))
    : []

  const productsFormatted = productsWidthImage ? productsWidthImage.map(product => ({
    id: product.id,
    title: product.title,
    price: product.price,
    image: product.images[0]
  })) : [];

  return productsFormatted
  
}

function useSearchCocktails(initialLetter){
  
  const [letter, setLetter] = useState(initialLetter);

  const COCKTAIL_API = "https://www.thecocktaildb.com/api/json/v1/1/search.php?f="

  const [cocktails, setCocktails] = useState(null)

  useEffect(() => {
    fetch(COCKTAIL_API + letter)
      .then(res => res.json())
      .then(json => {
        setCocktails(json.drinks);
        
        console.log("peticion correcta")
      })
      .catch(error => {
        console.log("Error en la petición: ", error);
      });
  }, [letter]);

  const changeLetter = (newLetter) => {
    setLetter(newLetter)
  }

  const listOfCocktails = cocktails
    ? cocktails.map(cocktail => ({
      id: cocktail.idDrink,
      name: cocktail.strDrink,
      image: cocktail.strDrinkThumb
    }))
    : []

    return [listOfCocktails, changeLetter]
}
export default function App() {

  const [cocktails, setCocktails] = useSearchCocktails()

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

