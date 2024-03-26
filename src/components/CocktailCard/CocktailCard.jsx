import './CocktailCard.css'
export function CocktailCard({id, name, image}){
    return(
        <div className='cocktail-card'>
            <p className='cocktail-card-name'>{name}</p>
            <img className='cocktail-card-img' src={image} alt={`Imagen ${id}`} />
        </div>
    )
}