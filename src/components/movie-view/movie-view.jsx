export const MovieView = ({movie, onBackClick}) => {
    
    //ARIA tags
    var altText = `Picture of ${movie.title}`;
    
    console.log(movie);

    return (
        <div key={movie._id} onClick={onBackClick}>
            <div> Title: {movie.title}</div>
            <div> Director: {movie.director.name} </div>
            <div><img src={movie.image} altText={altText}></img></div>
            <button>Return</button>
        </div>
    );
};