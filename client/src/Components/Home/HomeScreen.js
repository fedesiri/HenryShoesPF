import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux'; 
import { Link } from 'react-router-dom';


export default function HomeScreen (){



    return (
        <div>
            <h1>Aqui se veran todos los productos, con link a su detalle</h1>
            <Link to = {"cards/id"}></Link>
            "<CardProduct/>"
        </div>

    )
}