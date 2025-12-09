import './Candle.css'

function Candle() {
  return (
    <div className="candle-container">
      <div className="candle">
        <div className="candle-wick"></div>
        <div className="flame">
          <div className="flame-inner"></div>
          <div className="flame-glow"></div>
        </div>
        <div className="candle-body"></div>
      </div>
    </div>
  )
}

export default Candle

