import { useEffect } from 'react'
import './App.css'
import { useState } from 'react'

const PRODUCTS_API = "https://api.escuelajs.co/api/v1/products"

export default function App() {
  const [response, setResponse] = useState(null)

  useEffect(() => {
    fetch(PRODUCTS_API)
      .then(res => res.json())
      .then(data => {
        const productImages = data.map((product, index) => (
          product.images
        ))
        setResponse(productImages)
      })
    
  }, [])

  return(
      <div className='gallery'>
        {response ? 
        response.map((imagen, index) => (
          <img key={index} src={imagen[0]} alt={`Imagen ${index}`} />
        ))
        : <h1>Cargando...</h1>
      }
      </div>
    )
}

