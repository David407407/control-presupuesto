import { useState, useEffect } from 'react'
import { generarId } from './helpers'
import Header from './components/Header'
import ListadoGasto from './components/ListadoGasto'
import Modal from './components/Modal'
import IconoNuevoGasto from './img/nuevo-gasto.svg'
import FiltroGastos from './components/FiltroGastos'

function App() {
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  )
  const [presupuestoValido, setPresupuestoValido] = useState(false)
  const [mostrarModal, setMostrarModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)
  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  )
  const [mensaje, setMensaje] = useState('')
  const [gastoEditar, setGastoEditar] = useState({})
  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  useEffect( () => {
    if(presupuesto > 0) {
      setPresupuestoValido(true)
    }
    console.log(JSON.parse(localStorage.getItem('gastos')));
  }, [])

  useEffect( () => {
    if(Object.keys(gastoEditar).length > 0) {
      handleNuevoGasto()
    }
  }, [gastoEditar] )

  useEffect( () => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto] )

  useEffect( () => {
    localStorage.setItem('gastos', JSON.stringify( gastos ) ?? [])
  }, [gastos] )

  useEffect( () => {
    if(filtro && filtro !== '') {
      // Filtrar los gastos por categoria
      const gastosFiltrados = gastos.filter( gasto => gasto.categoria === filtro)
      setGastosFiltrados(gastosFiltrados)
    } else {
      setGastosFiltrados([])
    }
  }, [filtro])

  const handleNuevoGasto = () => {
    setMostrarModal(true)
    setTimeout(() => {
      setAnimarModal(true)
    }, 750);
  }

  const guardarGasto = gasto => {
    if(gasto.id) {
      const gastosActualizados = gastos.map( gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados)
      setGastoEditar({})
    } else {
      gasto.id = generarId()
      gasto.fecha = Date.now()
      setGastos([...gastos, gasto])
    }
    setAnimarModal(false)
    setTimeout(() => {
      setMostrarModal(false)
    }, 500);
  }

  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter( gastoItem => gastoItem.id !== id) // Creamos un nuevo arreglo excluyendo el que queremos eliminar
    setGastos(gastosActualizados) // Modificamos los pacientes con el arreglo que acabamos de crear
  }

  const handleResetearApp = () => {
    Swal.fire({ // Muestra un mensaje sobre si queremos eliminar al paciente
      title: 'Deseas reiniciar la app?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4f46e5',
      cancelButtonColor: '#cb0000',
      confirmButtonText: 'Reiniciar'
    }).then((result) => {
      if (result.isConfirmed) {
        setPresupuesto(0)
        setPresupuestoValido(false)
        setGastos([])
      }
    }) 
  }

  return (
    <div className={mostrarModal === true ? 'fijar' : ''}>
      <Header
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        presupuestoValido={presupuestoValido}
        setPresupuestoValido={setPresupuestoValido}
        mensaje={mensaje}
        setMensaje={setMensaje}
        gastos={gastos}
        handleResetearApp={handleResetearApp}
      />

      {mostrarModal === true && 
        <Modal
          setMostrarModal={setMostrarModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          mensaje={mensaje}
          setMensaje={setMensaje}
          guardarGasto={guardarGasto}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
        />
      }

      { presupuestoValido === true &&
        <>
          <main>
            <FiltroGastos
              filtro={filtro}
              setFiltro={setFiltro}
            />
            <ListadoGasto
              mostrarModal={mostrarModal}
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </main>
          <div 
            className='nuevo-gasto'
            onClick={handleNuevoGasto}
          >
              { mostrarModal === false &&
                <img src={IconoNuevoGasto} alt="icono nuevo gasto" />}
          </div>
        </>
      }
    </div>
  )
}

export default App
