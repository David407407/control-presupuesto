import {useState, useEffect} from 'react';
import Alerta from './Alerta';

const NuevoPresupuesto = ( {presupuesto, setPresupuesto, setPresupuestoValido, mensaje, setMensaje} ) => {
    const handlePresupuesto = (e) => {
        e.preventDefault()

        if(!Number(presupuesto) || Number(presupuesto) < 0) {
            setPresupuesto(0)
            setMensaje('Ingresa un Presupuesto Válido')
            return
        } 
        setMensaje('')
        setPresupuesto(Number(presupuesto))
        setPresupuestoValido(true)
    }

  return (
    <div className="contenedor-presupuesto contenedor sombra">
        <form
         className="formulario"
         onSubmit={handlePresupuesto}
        >
            <div className="campo">
                <label htmlFor="">Definir Presupuesto</label>
                <input 
                    type="text"
                    className="nuevo-presupuesto"
                    placeholder="Añade tu Presupuesto"
                    onChange={ (e) => setPresupuesto(e.target.value)}
                    value={presupuesto}
                />
            </div>

            <input type="submit" value="Añadir" />

            {
                mensaje && 
                <Alerta
                    tipo={"error"}
                >
                    <p>{mensaje}</p>
                </Alerta>
            }
        </form>
    </div>
  )
}

export default NuevoPresupuesto