import React from 'react'
import "./progressBar.scss"

type Props = {
    percentage: number;
    color: string;
}

const ProgressBar = (props: Props) => {
  
  return (
    <div className="progressBar" style={{background: `${props.color}`}}>
      <div className="progressBarInner" style={{ width: `${props.percentage}%` }} />
       <span className="progressText">{`${props.percentage}%`}</span>
    </div>
  );
}

export default ProgressBar
