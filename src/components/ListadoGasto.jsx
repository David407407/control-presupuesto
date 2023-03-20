import Gasto from "./Gasto"

const ListadoGasto = ({mostrarModal, gastos, setGastoEditar, eliminarGasto, filtro, gastosFiltrados}) => {

  return (
    <div className={mostrarModal === true ? "listado-gastos contenedor indice" : "listado-gastos contenedor"}>
        

        {
          filtro ?
          <>
            <h2>{gastosFiltrados.length === 0 ? 'No hay Gastos en esta Categoria' : 'Gastos'} </h2>
            {gastosFiltrados.map( gasto => {
              return (
                <Gasto
                  key={gasto.id}
                  gasto={gasto}
                  setGastoEditar={setGastoEditar}
                  eliminarGasto={eliminarGasto}
                />
              ) 
            })}
          </>
          :
          <>
            <h2>{gastos.length ? 'Gastos' : 'No hay Gastos Aún'}</h2>
            {gastos.map( gasto => {
            return (
              <Gasto
                key={gasto.id}
                gasto={gasto}
                setGastoEditar={setGastoEditar}
                eliminarGasto={eliminarGasto}
              />
            ) 
            })}
          </>
          
        }
    </div>
  )
}

export default ListadoGasto