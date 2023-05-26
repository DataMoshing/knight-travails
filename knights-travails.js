// Map oject holds key-value pairs and remembers original insertion order of keys. In this case it will be used to store chess squares and their information.
const squareRegistry = new Map();

// x an y  will represent the coordinates of a square on a chessboard.
const chessSquare = (x, y) => {
    // Assign the values of x and y to x_Pos and y_Pos representing the current position of the chess square.
    const x_Pos = x;
    const y_Pos = y;
    // Variable will be used to store predecessor square.
    let predecessor;

    /* <--- Helper Functions ---> */

    // Returns value of predecessor variable. When getPredecessor is called on a chess square object, it will retrieve and return the value in predecessor variable.
    const getPredecessor = () => predecessor
    const setPredecessor = (newPredecessor) => {
        // Assign value of predecessor to itself if truthy (already defined) or assign value to newPredecessor otherwise.
        predecessor = predecessor || newPredecessor;
    }

    /* <--- Helper Functions ---> */

    // Return string representing name of chess square in format "x, y".
    const name = () => `${x}, ${y}`

    // 2D array that represents the possible movements of a knight on chessboard. Each subarray contains two values : change in x-coordinate and y-coordinate for a knight move.
    const knightMoves = [[1, 2], [1, -2], [2, 1], [2, -1], [-1, 2], [-1, -2], [-2, 1], [-2, -1]]

    // Generates array of possible next moves for knight based on knightMoves array. Using the nextSquareMove to calculate the coordinates of the next square for each move and filters out undefined squares.
    const createKnightMoves = () => {
        return knightMoves.map((move) => nextSquareMove(move[0], move[1])).filter((square) => square !== undefined)
    }

    // Function takes the x_Move and y_Move offsets and calculates the coordinates of the next square based on current squares position. If resulting coordinates are within boundaries of chessboard (0 to 7) return a new chessSquare object with new coordinates.
    const nextSquareMove = (x_Move, y_Move) => {
        const [newX, newY] = [x_Pos + x_Move, y_Pos + y_Move]
        if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8) {
            return chessSquare(newX, newY);
        }
    }

    // Check if square name exists in squareRegistry map
    if (squareRegistry.has(name())) {
        // If square name is found in registry, retrieve and return corresponding square.
        return squareRegistry.get(name())
    } else {
        // If square name is not found in registry, a new square object is created with the properties.
        newSquare = { name, getPredecessor, setPredecessor, createKnightMoves }
        // New square object is added to squareRegistry map.
        squareRegistry.set(name(), newSquare)
        // New square object is returned.
        return newSquare;
    }
}

const knightTravails = (start, end) => {
    // Clear the squareRegistry map, ensuring that is starts with no previously registered chess squares.
    squareRegistry.clear();

    // Call the chessSquare function and pass start parameter. Spread the elements of start array as individual arguments to chessSquare function. chessSquare function creates a chess square based on provided coordinates. Spread operator the `start` array elements are passed as separate arguments to chessSquare allowing x and y coordinates to be extracted and assigned to origin.
    const origin = chessSquare(...start)
    // The spread operator spreads the elements of the end array as separate arguments to the chessSquare function where it then creates a chess square object based on provided coordinates and assigned to target variable.
    const target = chessSquare(...end)

    // Set queue with origin chess square object as its only element.
    const queue = [origin]
    // While that continues until the target chess square is found in the queue.
    while (!queue.includes(target)) {
        // Removes and returns the first element from the queue assigning it to currentSquare.
        const currentSquare = queue.shift()
        // Call the createKnightMoves function on current square to generate a list of possible next moves.
        const enqueueList = currentSquare.createKnightMoves()
        // Set the currentSquare predecessor for each square in the enqueueList. Establishing a link between the current square and possible next moves.
        enqueueList.map((square) => square.setPredecessor(currentSquare))
        // Adds all the suqares from the enqueueList to end of queue expanding the search.
        queue.push(...enqueueList)
    }

    // Set the path array with the target chess square object as its only element.
    const path = [target]
    // While loop that continues until the origin chess square is found in the path.
    while (!path.includes(origin)) {
        // Retrieves the predecessor of the first square in the path array and assigns to prevSquare.
        const prevSquare = path[0].getPredecessor();
        // Adds the prevSquare to the beginning of the path array reconstructing the path from the target square.
        path.unshift(prevSquare);
    }

    console.log(`The shortest path was ${path.length - 1} moves!`)
    console.log("The moves were:")
    path.forEach((square) => {
        console.log(square.name())
    });
}

/* Knight's travails algorithm using a breadth-first search. It finds the shortest path from the starting position (origin) to the target position (target) on the chessboard. */


console.log(knightTravails([0, 0], [4, 2]))