export function useProducts() {
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
  