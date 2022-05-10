import React, { useState } from 'react'

const FormularioInicio = () => {

    const [input, setInput] = useState({
        email: " ",
        password: "",
    })
    let [error, setError] = useState('');



    function handleInputChange(e) {
        e.preventDefault()
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        let objError = validate({ ...input, [e.target.name]: e.target.value });
        setError(objError);


    }

    function handleSubmit(e) {
        e.preventDefault();
        if ((input.email === "" || input.password === "")) {
            return alert("No se puede enviar , complete las categorias");
        } else {

            setInput({
                email: "",
                password: ""
            })
        };


    }

    function validate(input) {
        let errors = {};
        let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
        let regexLetra = /[A-z]/;
        let regexMayuscula = /[A-Z]/
        let regexNumero = /\d/


        if (!input.email.trim()) {
            errors.email = "El campo 'Email' es requerido";
        } else if (!regexEmail.test(input.email.trim())) {
            errors.email = "El campo 'Email' es incorrecto";
        }

        if (!input.password.trim()) {
            errors.password = "El campo 'Password' es requerido";
        }
        else if (input.password.length < 8) {
            errors.password = "Agregue al menos 8 caracteres";
        }
        else if (!regexLetra.test(input.password.trim())) {
            errors.password = "El campo 'Password' requiere una letra";
        }
        else if (!regexMayuscula.test(input.password.trim())) {
            errors.password = "El campo 'Password' requiere una letra en Mayuscula";
        }
        else if (!regexNumero.test(input.password.trim())) {
            errors.password = "El campo 'Password' requiere un numero";
        }

        return errors;
    };







    return (
        <>
            <>
                <form onSubmit={e => handleSubmit(e)}  >
                    <h3>Ingresar a mi cuenta</h3>
                    <label>  <h3>Email</h3>
                        <input name='email'
                            value={input.email}
                            onChange={(e) => handleInputChange(e)}
                            type="email"
                        />
                    </label>
                    {error.email && (<p>{error.email} </p>)}



                    <label>  <h3>Contraseña</h3>
                        <input name="password"
                            value={input.password}
                            onChange={(e) => handleInputChange(e)}
                            type="password"
                        />
                    </label>
                    {error.password && (<p>{error.password} </p>)}


                    <br />
                    <button type='submit'> Iniciar sesión</button>

                    <button>  Crear cuenta</button>

                </form>
            </>

        </>)
}

export default FormularioInicio