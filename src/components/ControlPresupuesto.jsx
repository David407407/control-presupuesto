import {useState, useEffect} from 'react'
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css"

const ControlPresupuesto = ( {presupuesto, gastos, handleResetearApp} ) => {

  const [disponible, setDisponible] = useState(0)
  const [gastado, setGastado] = useState(0)
  const [porcentajeGastado, setPorcentajeGastado] = useState(0)

  useEffect(() => {
    const totalGastado = gastos.reduce( (total, gasto) => Number(gasto.cantidad) + total, 0 )
    setGastado(totalGastado)
    
    const presupuestoDisponible = presupuesto-gastado
    setDisponible(presupuestoDisponible)

    const porcentaje = totalGastado/(presupuesto/100)

    setTimeout(() => {
      setPorcentajeGastado(porcentaje.toFixed(2))
    }, 1200);
  }, [gastos])

  const formatearCantidad = (cantidad) => {
    return cantidad.toLocaleString("en", {
      style: "currency",
      currency: "USD"
    })
  }

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar
        styles={buildStyles({
          pathColor : porcentajeGastado > 100 ? '#dc2626' : '#3b82f6',
          trailColor : '#f5f5f5',
          textColor : porcentajeGastado > 100 ? '#dc2626' : '#3b82f6'
        })}
          value={porcentajeGastado}
          text={`${porcentajeGastado}% Gastado`}
        />
      </div>
      <div className="contenido-presupuesto">

        <button 
          className='reset-app'
          onClick={() => handleResetearApp()}
        >Resetear App</button>

        <p>
          <span>Presupuesto: </span> {formatearCantidad(presupuesto)}
        </p>

        <p className={disponible < 0 && 'negativo'}>
          <span>Disponible: </span> {formatearCantidad(disponible)}
        </p>

        <p>
          <span>Gastado: </span> {formatearCantidad(gastado)}
        </p>
      </div>
      
    </div>
  )
}

export default ControlPresupuesto