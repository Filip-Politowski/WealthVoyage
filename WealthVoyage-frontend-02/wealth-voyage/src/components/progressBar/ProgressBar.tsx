import React from 'react'
import "./progressBar.scss"

type Props = {
    percentage: number
}

const ProgressBar = (props: Props) => {
  return (
    <div className="progressBar">
      <div className="progressBarInner" style={{ width: `${props.percentage}%` }} />
       <span className="progressText">{`${props.percentage}%`}</span>
    </div>
  );
}

export default ProgressBar
