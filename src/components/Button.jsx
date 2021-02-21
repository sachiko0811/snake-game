import React from 'react'

// const Button = ({ onStart }) => {
   const Button = ({ status, onStart, onRestart, onStop }) => {
       return (
           <div className="button">
               {/* {
                   status === "gameover" ? <button onClick={onRestart}>gameover</button>
                   :
                   <button onClick={onStart}>start</button>
               } */}
               { status === "gameover" && <button className="btn btn-gameover" onClick={onRestart}>gameover</button>}
               { status === "init" && <button className="btn btn-init" onClick={onStart}>start</button>}
               { status === "suspended" && <button className="btn btn-suspended" onClick={onStart}>start</button>}
               { status === "playing" && <button className="btn btn-playing" onClick={onStop}>stop</button>}
           </div>
       )
}

export default Button;