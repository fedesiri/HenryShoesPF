import "./CardPrev.css";

export default function CardPrev ({ id, model, price, image, brandName, description, gender, year, CategName, size }){
    return (
        <div className="CardContainer">
            
                <div className ="CardImage">
                    <img className="imagen" src={image} alt="image not available" />
                </div>
                <div className = "CardInfo">
                    <div>
                    <p>
                        Product Name: {model} 
                    </p>
                    </div>

                    <div>
                    <p>
                        Brand Name: {brandName} 
                    </p>
                    </div>

                    <div>
                    <p>
                        Gender: {gender} 
                    </p>
                    </div>

                    <div>
                    <p>
                        Release Year: {year} 
                    </p>
                    </div>

                    <div>
                    <p>
                        Description: {description}
                    </p>
                    </div>

                    <div>
                    <p>
                        Price:${price} 
                    </p>
                    </div>

                    <div>
                    <p>
                        Category Name: {CategName} 
                    </p>
                    </div>

                    <div>
                    <p>
                        Sizes: {size} 
                    </p>
                    </div>
                </div>
                </div>
    );
}