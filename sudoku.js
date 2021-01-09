
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  
  function getRandomNumbers(){
      let list = [1, 2, 3, 4, 5, 6, 7, 8, 9]
      list = list.sort(() => Math.random() - 0.5)
    return list
  }
  
  function clone(obj) {
      var copy;
      if (null == obj || "object" != typeof obj) return obj;

      if (obj instanceof Date) {
          copy = new Date();
          copy.setTime(obj.getTime());
          return copy;
      }
      if (obj instanceof Array) {
          copy = [];
          for (var i = 0, len = obj.length; i < len; i++) {
              copy[i] = clone(obj[i]);
          }
          return copy;
      }
      if (obj instanceof Object) {
          copy = {};
          for (var attr in obj) {
              if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
          }
          return copy;
      }
  
      throw new Error("Unable to copy obj! Its type isn't supported.");
  }
  
  function createFirstGridBoard(){
    let board = [
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0]
    ]
      let numbers = getRandomNumbers()
    for(let i=0; i<board.length; i++){
      for(let j=0; j<board.length; j++){
        if(i<3 && j<3){
            board[i][j] = numbers.pop()
          numbers = (numbers.length==0) ? getRandomNumbers() : numbers
        }
      }
    }
    return board
  }
  function findEmptyCells(board){
      let emptyCells=[]
      let possibleNumbers=[]
      for(let i=0; i<board.length; i++){
      for(let j=0; j<board[i].length; j++){
          if(board[i][j]==0){
              let totalSolutions=0
              let invalidNumbers=[]
              for(let m=1; m<=9; m++){
                  const isRowValid = validateRows(m, board, [i,j])
                  const isColumnValid = validateColumn(m, board, [i,j])
                  const isCubeValid = validateCube(m, board, [i,j])
                if(isRowValid && isColumnValid && isCubeValid){
                  totalSolutions++
                 }else{
                     invalidNumbers.push(m)
                 }
              }
              possibleNumbers.push([totalSolutions,[i,j],invalidNumbers])   
          }
      }
      }
      for(let i=1; i<=9; i++){
          possibleNumbers.forEach(item=>{
            if(item[0] == i){
              emptyCells.push([item[1], item[2]])
          }
        })
      }
      return emptyCells
  }
  
  function validateRows(number,board, cellPosition){
    let validated = false
    for(let i=0; i<board[cellPosition[0]].length; i++){
    if(number == board[cellPosition[0]][i]){
        validated = false
        break
    }else{
        validated = true
    }
    }
    return validated
  }
  
  function validateColumn(number,board, cellPosition){
    let validated = false
    for(let i=0; i<board.length; i++){
    if(number == board[i][cellPosition[1]]){
        validated = false
        break
    }else{
        validated = true
    }
    }
    return validated
  }
  
  function validateCube(num, board, cellPosition){
  const boxX = Math.floor(cellPosition[1]/3) //2
    const boxY= Math.floor(cellPosition[0]/3) //2
    let cube=[]
    for(let i=(boxY*3); i< (boxY*3 + 3); i++){
        for(let j=(boxX*3);j<(boxX*3+3); j++){
            cube.push(board[i][j])
        }
    }
    return (cube.includes(num)) ? false: true
  }
  
  function fillEmptyCellsByDecrementing(board, emptyCells){
      let i=0
      let trials = 0
      try{
          while(i<emptyCells.length){
              const cellPosition=emptyCells[i][0]
              let cellInitialValue = board[cellPosition[0]][cellPosition[1]]
              let isSolved= false
              cellInitialValue = (cellInitialValue==0) ? 9 : cellInitialValue-1
              for(let j=cellInitialValue; j>=1; j--){
                  if(!emptyCells[i][1].includes(j)){
                      const isRowValid = validateRows(j, board, cellPosition)
                      const isColumnValid = validateColumn(j, board, cellPosition)
                      const isCubeValid = validateCube(j, board, cellPosition)
                      if(isRowValid && isColumnValid && isCubeValid){
                      board[cellPosition[0]][cellPosition[1]] = j
                      isSolved=true
                      break;
                      }
                      trials++
                      } 
                  }
              if(!isSolved){
                board[cellPosition[0]][cellPosition[1]] = 0
                i--
                  }
              else if(isSolved){
                  i++
                  }  
              }
          return [trials, board]
      }
      catch(e){
          if (e instanceof TypeError) {
              console.log('Invalid Puzzle')
          }
          else{
              console.log(e)
          }
          
      }
      
  }
  
  function fillEmptyCellsByIncrementing(board, emptyCells){
      let i=0
      let trials = 0
      try{
          while(i<emptyCells.length){
              const cellPosition=emptyCells[i][0]
              let cellInitialValue = board[cellPosition[0]][cellPosition[1]]
              let isSolved= false
              cellInitialValue = (cellInitialValue<9) ? cellInitialValue+1 : 9
              for(let j=cellInitialValue; j<=9; j++){
                  if(!emptyCells[i][1].includes(j)){
                      const isRowValid = validateRows(j, board, cellPosition)
                      const isColumnValid = validateColumn(j, board, cellPosition)
                      const isCubeValid = validateCube(j, board, cellPosition)
                      if(isRowValid && isColumnValid && isCubeValid){
                      board[cellPosition[0]][cellPosition[1]] = j
                      isSolved=true
                      break;
                      }
                      trials++
                      } 
                  }
              if(!isSolved){
                board[cellPosition[0]][cellPosition[1]] = 0
                i--
                  }
              else if(isSolved){
                  i++
                  }  
              }
          return [trials, board]
      }
      catch(e){
          if (e instanceof TypeError) {
              console.log('Invalid Puzzle')
          }
          else{
              console.log(e)
          }
          
      }
      
  }

  function randomEmptyCell(board, level){
    let totalDeletedCells = 0
    let totalCellsToBeDeleted = 0
    if(level=="easy"){
      totalCellsToBeDeleted = 45
    }
    else if(level=="medium"){
      totalCellsToBeDeleted = 51
    }
    else if(level=="hard"){
      totalCellsToBeDeleted = 52
    }
    else if(level=="samurai"){
      totalCellsToBeDeleted = 53
    }
    else{
      totalCellsToBeDeleted = 20
    }
    for(let i=0; i<totalCellsToBeDeleted; i++){
      let randomXindex = getRandomInt(9)
      let randomYindex = getRandomInt(9)
      const previousNumber = board[randomXindex][randomYindex]
      if(board[randomXindex][randomYindex] == 0){
          totalCellsToBeDeleted++
      }
      else{
        board[randomXindex][randomYindex] = 0
        const trialBoard = clone(board)
        const isSolved = solve(trialBoard)
        if(!isSolved){
            board[randomXindex][randomYindex]=previousNumber
            totalCellsToBeDeleted++
        }
      }
    }
    
    return board
  }
  
  function isSolved(board){
      isSolved = false
      for(let i=0; i<board.length; i++){
          for(let j=0; j<board[i].length; j++){
              const number = board[i][j]
              board[i][j]=0
              const isRowValid = validateRows(number, board, [i,j])
              const isColumnValid = validateColumn(number, board, [i,j])
              const isCubeValid = validateCube(number, board, [i,j])
              board[i][j] = number
              if(isRowValid && isColumnValid && isCubeValid){
                  isSolved = true
              }else{
                  isSolved = false
                  break
              }
          }
      }
      return isSolved
  }
  
  function solve(board){
    const emptyCells = findEmptyCells(board)
    let boardSolution1 = clone(board)
    let boardSolution2 = clone(board)
    let result1 = fillEmptyCellsByIncrementing(boardSolution1, emptyCells)
    let result2 = fillEmptyCellsByDecrementing(boardSolution2, emptyCells)
    if(JSON.stringify(result1[1]) == JSON.stringify(result2[1])){
        return result1
    }else{
        return false
    }
    
  }
  function createNewGame(level){
    let bestBoard=[0,[]]
    let result1=[]
    let result2=[]
    let totalBoardsTried = 1
    for(index=0; index<10; index++){
      let board = createFirstGridBoard()
      const emptyCells = findEmptyCells(board)
      const resultBoard = fillEmptyCellsByIncrementing(board, emptyCells)
      if(resultBoard[0]>0){
        board = randomEmptyCell(resultBoard[1], level)
        const randomBoard = clone(board)
        const result = solve(board)
        if(result[0]>bestBoard[0]){
              bestBoard[0] = result[0]
              bestBoard[1] = randomBoard
              const difficulty = measureDifficulty(bestBoard[0])
              if(difficulty.toLocaleLowerCase() == level.toLocaleLowerCase()){
                break
            }
        }
        }
        totalBoardsTried++ 
    }
    console.log(bestBoard[0])
    return bestBoard[1]
  }
  
  function printBoard(board){
      let boardContent = "\n"
      for(let i=0; i<board.length; i++){
      let rowContent = ""
      for(let j=0; j<board[i].length; j++){
          rowContent = (j!==0) ? rowContent +" ": rowContent
          rowContent = rowContent + board[i][j]
          if(((j+1)%3==0) && j!==board[i].length-1 ){
          rowContent = rowContent + " |"
          }
      }
      boardContent = boardContent + rowContent + '\n'
      if(((i+1)%3==0) && (i!==0 && i!== board.length-1)){
          boardContent = boardContent + '- - - - - - - - - - - \n'
      }
      }
      console.log(boardContent)
  }
  
  function measureDifficulty(trials){
      if(trials<5000){
          return "Easy"
      }
      else if(trials>5000 && trials<50000){
          return "Medium"
      }
      else if(trials>50000 && trials<500000){
          return "Hard"
      }
      else if(trials>500000){
          return "Samurai"
      }
  }
  
  function printBoard1(board){
      let boardContent = ""
      for(let i=0; i<board.length; i++){
      for(let j=0; j<board[i].length; j++){
          
          if(board[i][j] == 0){
              boardContent = boardContent + "."
          }else{
              boardContent = boardContent + board[i][j]
          }
      }
      }
      console.log(boardContent)
  }

  