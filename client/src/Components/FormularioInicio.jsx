import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { postInicioSesion } from "../../redux/actions/index"


const FormularioInicio = () => {
    const dispatch = useDispatch();
    const msjPost = useSelector((state) => state.postmsj)




    const [input, setInput] = useState({
        email: "",
        password: "",
      })
    let [error, setError] = useState('');


 function handleChange(e) {
    e.preventDefault()
    setInput({
      ...input, [e.target.name]: e.target.value
    })
    let objError = validate({ ...input, [e.target.name]: e.target.value });
    setError(objError);
  }



  function handleSubmit(e) {
    e.preventDefault();
    if ((input.email === "" ||  input.password === "" )) {
      return alert("No se puede enviar , complete las categorias");
    } else {
        dispatch(postInicioSesion(input));
      setInput({
        email: "",
        password: "",

      })
    };
  }


  function validate(input) {
    let errors = {};
    let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
    let regexLetra = /[A-z]/;
    let regexMayuscula = /[A-Z]/;
    let regexNumero = /\d/;

    if (!input.email) {
      errors.email = 'Email es requerido';
    } else if (!regexEmail.test(input.email.trim())) {
      errors.email = "solo acepta email correcto";
    }

    if (!input.password) {
        errors.password = 'Password es requerido';

      } else if (input.password.trim().length  < 8 )  {
        errors.password = "password tiene q tener un minimo de 8 caracteres";

      }else if (!regexLetra.test(input.password.trim())) {
        errors.password = "es necesario al menos una letra";

      }else if (!regexMayuscula.test(input.password.trim())) {
        errors.password = "es necesario al menos una letra en mayuscula";

      }else if (!regexNumero.test(input.password.trim())) {
        errors.password = "es necesario al menos un numero";
      }
    return errors;
  };



  return (
    <>
    <h1> Ingresar a mi cuenta</h1>

    <form  onSubmit={e => handleSubmit(e)}  >
    <label >Email:
            <input  type="email"
              name="email"
              placeholder="Email"
              value={input.email}
              onChange={e => handleChange(e)}
            />
          </label>

          <label >Password:
            <input  type="password"
              name="password"
              placeholder="Password"
              value={input.password}
              onChange={e => handleChange(e)}
            />
          </label>

<button type='submit'> Iniciar sesión</button>
<Link to="/create_cuenta" >  <div> Crear cuenta</div> </Link>

 



    </form>
    
    
    
    
    
    
    
    </>
  )
}

export default FormularioInicio