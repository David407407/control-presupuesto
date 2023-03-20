import {useState} from 'react'
import NuevoPresupuesto from "./NuevoPresupuesto"
import ControlPresupuesto from "./ControlPresupuesto"

const Header = ( {presupuesto, setPresupuesto, presupuestoValido, setPresupuestoValido, mensaje, setMensaje, gastos, handleResetearApp} ) => {
  return (
    <header>
        <h1>Planificador de Gastos</h1>

        {
          presupuestoValido === false ?
          <NuevoPresupuesto
            presupuesto={presupuesto}
            setPresupuesto={setPresupuesto}
            setPresupuestoValido={setPresupuestoValido}
            mensaje={mensaje}
            setMensaje={setMensaje}
          />
          :
          <>
            <ControlPresupuesto
              presupuesto={presupuesto}
              gastos={gastos}
              handleResetearApp={handleResetearApp}
            />
          </>
        }
        
    </header>
  )
}

export default Header