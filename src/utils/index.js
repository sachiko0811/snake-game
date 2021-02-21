// const getFoodPosition = (fieldSize) => {
//     const x = Math.floor(Math.random() * (fieldSize - 1)) + 1;
//     const y = Math.floor(Math.random() * (fieldSize -1)) + 1;
//     return { x, y};
// }

// const getFoodPosition = (fieldSize, excludes) =>  {
    export const getFoodPosition = (fieldSize, excludes) => {
    while(true) {
    const x = Math.floor(Math.random() * (fieldSize - 1)) + 1;
    const y = Math.floor(Math.random() * (fieldSize -1)) + 1;
    const conflict = excludes.some(item => item.x === x && item.y === y)

    if(!conflict) {
        return { x, y };
    }
  }
}

// export const initFields = (fieldSize, initialPosition) => {
export const initFields = (fieldSize, snake) => {
    const fields = []
    for (let i = 0; i < fieldSize; i++) {
        const cols = new Array(fieldSize).fill('')
        fields.push(cols)
    }
    fields[17][17] = 'snake'
    // fields[initialPosition.y][initialPosition.x] =  'snake'
    fields[snake.y][snake.x] = 'snake'

    // const food = getFoodPosition(fieldSize)
    const food = getFoodPosition(fieldSize, [snake])
    fields[food.y][food.x] = 'food'; 

    return fields // gonna return an array that you made
}