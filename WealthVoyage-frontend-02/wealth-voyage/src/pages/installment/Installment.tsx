import React from 'react'
import "./installment.scss"
import SingleView from '../../components/singleView/SingleView'
import { singleInstallment } from '../../data'

const Installment = () => {
  //fetch data
  return (
    <div className='installment'>
      <SingleView {...singleInstallment}/>
    </div>
  )
}

export default Installment
