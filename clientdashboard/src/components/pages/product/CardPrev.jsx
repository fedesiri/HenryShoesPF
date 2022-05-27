
export default function CardPrev ({ id, model, price, image, brandName, description, gender, year, CategName }){
    return (
        <CardContainer>
            
                <CardImage>
                    <img src={image} alt="" />
                </CardImage>
                <CardInfo>
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
                        Description: {description} 
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
                        Category Name: {CategName} 
                    </p>
                    </div>

                    <div>
                    <p>
                        Price:${price} 
                    </p>
                    </div>
                </CardInfo>
                </CardContainer>
    );
}