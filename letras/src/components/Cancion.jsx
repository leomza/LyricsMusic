import React, { Fragment } from 'react'

const Cancion = ({ letra }) => {
  //Para que no muestre nada si no hay ninguna letra de canción:
  if (letra === '') return null

  return (
    <Fragment>
      <h2>Letra Cancion</h2>
      <p className='letra'>{letra}</p>
    </Fragment>
  )
}

export default Cancion
