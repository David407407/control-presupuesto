import {useState, useEffect} from 'react'

const FiltroGastos = ({filtro, setFiltro}) => {
  return (
    <div className='filtros sombra contenedor'>
        <form 

        >
            <div className='campo'>
                <label>Filtrar Gastos</label>
                <select 
                    id="categoria"
                    onChange={(e)=> setFiltro(e.target.value)}
                    value={filtro}
                >
                    <option value="">-- Todas las Categorias --</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="comida">Comida</option>
                    <option value="casa">Casa</option>
                    <option value="gastos">Gastos Varios</option>
                    <option value="ocio">Ocio</option>
                    <option value="salud">Salud</option>
                    <option value="suscripciones">Suscripciones</option>
                </select>
            </div>
        </form>
    </div>
  )
}

export default FiltroGastos