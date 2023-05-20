import './App.css';
import Box from './components/Box';
import { useEffect, useState } from "react";

function App() {
  const [playCpu,setPLayCpu] = useState(true)
  const [scoreUser,setScoreUser] = useState(0)
  const [scoreCPu,setScoreCPu] = useState(0)
  const [turnX,setTurnX] = useState(true);
  // const [userWon,setUserWon] = useState(false)
  // const [cpuWon,setCpuWon] = useState(false)
  const winningCombo = [
    "012","345","678","036","147","258","048","246"
  ]
  const [board,setBoard] = useState([
    '','','','','','','','',''
  ])

  const didTheGameEnd = (position) => {
    let possibleMove = []
      for(let i = 0; i <position.length;i++ ){
        if(position[i] == ''){
          possibleMove.push(i)
        }
      }
      if(possibleMove.length == 0){
        return true
      }else{
        return false
      }
  }

  const handleGame = (position) => {
      if( position[0] != '' && position[0] == position[1] && position[1]== position[2]){     
        return true;
      }
      if( position[3] != '' && position[3] == position[4] && position[4]== position[5]){     
        return true;
      }
      if( position[6] != '' && position[6] == position[7] && position[7]== position[8]){     
        return true;
      }
      if( position[0] != '' && position[0] == position[3] && position[3]== position[6]){     
        return true;
      }
      if( position[1] != '' && position[1] == position[4] && position[4]== position[7]){     
        return true;
      }
      if( position[2] != '' && position[2] == position[5] && position[5]== position[8]){     
        return true;
      }
      if( position[0] != '' && position[0] == position[4] && position[4]== position[8]){     
        return true;
      }
      if( position[2] != '' && position[2] == position[4] && position[4]== position[6]){     
        return true;
      }
      return false
  }

  const handleClick = (id) => {
    let newBoard = [...board]
    if(newBoard[id] !=''){
      alert('choose another position!!')
      return
    }
    newBoard[id] =  'X' 
    if(handleGame(newBoard)){
      setBoard([...newBoard])
      alert(`You won the round`)
      setScoreCPu(scoreCPu + 1)
      return;
    }
    setBoard([...newBoard])
    if(didTheGameEnd([...newBoard])){
      alert('this round ended in a draw')
      return
    }
    makeCpuMove([...newBoard])
    
}


  const makeCpuMove = (position) =>{
    let possibleMove = []
    let userMoves = []
      for(let i = 0; i <position.length;i++ ){
        if(position[i] == ''){
          possibleMove.push(i)
        }else if(position[i] == 'X'){
          userMoves.push(i)
        }
      }
     
      
      let randIdx = Math.floor(Math.random() * (possibleMove.length - 1))
      console.log(position,randIdx,possibleMove)
      position[possibleMove[randIdx]] = 'O'
      if(handleGame(position)){
        setBoard([...position])
        alert(`CPU won the round`)
        setScoreCPu(scoreCPu + 1)
        return;
      }
    setBoard([...position])
  }

  const handlePlayerClick = (id) =>{
    let newBoard = [...board]
    if(newBoard[id] !=''){
      alert('choose another position!!')
      return
    }
    newBoard[id] =  turnX ? 'X' : 'O' 
    if(handleGame(newBoard)){
      setBoard([...newBoard])
      alert(`${turnX ? 'Plyer-1' : 'Player-2'} won the round`)
      if(turnX){
        setScoreUser(scoreUser + 1)
      }else{
        setScoreCPu(scoreCPu + 1)
      }
      return;
    }
    setBoard([...newBoard])
    setTurnX(!turnX)
    if(didTheGameEnd([...newBoard])){
      alert('this round ended in a draw')
      return
    }
  } 
 
 

  return (
    <>
    <div className='info'>
      <p>
      A simple tic-tac-toe game<br/>
      play with another person or my dummy-cpu<br/>
      use 1player or 2player button to toggle the game<br />
      use reset board button to clear the board and play again
      </p>
    </div>
    <div className="parent">
      {board.map((Element,index) => {
        return <Box text={Element} id ={index} key={index} onClick={playCpu ? handleClick : handlePlayerClick}  />
      }
      )}
        {playCpu && <>
          <h3>user  Score : {scoreUser}</h3>
      <h3>cpu  Score : {scoreCPu}</h3></>}
      {!playCpu && <>
          <h3>Player1-'X' score : {scoreUser}</h3>
      <h3>Player2-'O' Score : {scoreCPu}</h3></>}
       </div>
      <div className='score'>
        <button className='btn' onClick={() => {
          setPLayCpu(!playCpu);
          setBoard([  '','','','','','','','',''])}}>
            {playCpu ? "2 Players" : "1 Player"}
            </button>
      <button className = "btn"onClick={()=>
        setBoard([  '','','','','','','','',''])}>
          reset the board
          </button>
      </div>
 
  </>);
}

export default App;
