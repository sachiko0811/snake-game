// import React, { useEffect, useState } from 'react';
import React, { useCallback, useEffect, useState } from 'react';
import Navigation from './components/Navigation';
import Field from './components/Field';
import Button from './components/Button';
import ManipulationPanel from './components/ManipulationPanel';
import { initFields } from './src/utils';

// const fields = initFields(35)
// fields[17][17] = 'snake'
// fields[17][17] = 'food'
// const initialValues = initFields(35)
const initialPosition = { x: 17, y: 17 }
const initialValues = initFields(35, initialPosition)
const defaultInterval =  100

 const GameStatus = Object.freeze({
  init:  'init',
  playing: 'playing',
  suspended: 'suspended',
  gameover: 'gameover'
})

export const Direction = Object.freeze({
  up: 'up',
  right: 'right',
  left: 'left',
  down:'down'
})

const DirectionKeyCodeMap = Object.freeze({
  37: Direction.left,
  38: Direction.up,
  39: Direction.right,
  40: Direction.down,
})

const OppositeDirection = Object.freeze({
  up: 'down',
  right: 'left',
  left: 'right',
  down: 'up'
})

const Delta = Object.freeze({
  up: { x: 0, y: -1 },
  right: { x: 1, y: 0 },
  left: { x: -1, y: 0 },
  down: { x: 0, y: 1 },
})

let timer = undefined

const unsubscribe  =  () => {
  if(!timer) {
    return
  }
  clearInterval(timer)
}

const isCollision = (fieldSize, position) => {
  if(position.y < 0 || position.x< 0) {
    return true;
  }

  if(position.y > fieldSize - 1 || position.x > fieldSize - 1) {
    return true;
  }

  return false;
}

function App() {

  const [fields, setFields] = useState(initialValues)
  const [position, setPosition] = useState()
  const [status, setStatus] = useState(GameStatus.init)
  // const [status, setStatus] = useState('init')
  const [tick, setTick]  = useState(0)
  const [direction, setDirection] = useState(Direction.up)

  useEffect(() => {
    setPosition(initialPosition)
    // managing the time of this game
    timer = setInterval(() => {
      // if(!position) {
      //   return
      // }
      // goUp()
      setTick(tick => tick + 1)
    }, defaultInterval)
    return unsubscribe
  }, [])

  useEffect(() => {
    if (!position || status !== GameStatus.playing) {
      return
    }
    // goUp()
    // const canContinue = goUp()
    const canContinue = handleMoving()
    if(!canContinue) {
      setStatus(GameStatus.gameover)
    }
  }, [tick])

  const onStart  = () => setStatus(GameStatus.playing)

  const onRestart = () => {
    timer = setInterval(() => {
      setTick(tick => tick + 1)
    }, defaultInterval)
    setDirection(Direction.up)
    setStatus(GameStatus.init)
    setPosition(initialPosition)
    setFields(initFields(35, initialPosition))
  }

  // const  onChangeDirection = (newDirection) =>{
    const onChangeDirection = useCallback((newDirection) => {
      if(status !== GameStatus.playing) {
        return 
      } 
      if(OppositeDirection[direction] === newDirection) {
        return
      }
      setDirection(newDirection)
    }, [direction, status])
  
    useEffect(() => {
      const handleKeyDown = (e) => {
        const newDirection = DirectionKeyCodeMap[e.keyCode];
        if(!newDirection) {
          return;
        }

        onChangeDirection(newDirection);
      }
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown)
    }, [onChangeDirection])
    

  // const goUp = () => {
    const handleMoving = () => {
    const { x, y } = position
    // const nextY = Math.max(y-1,  0)
    // const newPosition = { x, y: y - 1}
    const delta = Delta[direction]
    const newPosition = {
      x: x + delta.x,
      y: y + delta.y
    }
    if(isCollision(fields.length, newPosition)) {
      // unsubscribe()
      return false
    }
    fields[y][x] = ''
    // fields[nextY][x] = 'snake'
    // setPosition({ x,y: nextY })
    // fields[newPosition.y][x] = 'snake'
    fields[newPosition.y][newPosition.x] = 'snake'
    setPosition(newPosition)
    setFields(fields)
    return true
  }

  // console.log('direction', direction)

  return (
    <div className="App">
      <header className="header">
        <div className="title-container">
          <h1 className="title">Snake Game</h1>
        </div>
        <Navigation />
      </header>
      <main className="main">
        <Field fields={fields} />
      </main>
      {/* <div style={{padding: '16px'}}>
        <button onClick={goUp}>Up</button>
      </div> */}
      <footer className="footer">
        {/* <Button onStart={onStart}/> */}
        <Button
        status={status}
        onStart={onStart}
        onRestart={onRestart}
        />
        <ManipulationPanel onChange={onChangeDirection}/>
      </footer>
    </div>
  );
}

export default App;
