import './App.css';
import Box from './components/Box';
import { useEffect, useState } from "react";

function App() {
  const [scoreUser,setScoreUser] = useState(0)
  const [scoreCPu,setScoreCPu] = useState(0)

  const [board,setBoard] = useState([
    '','','','','','','','',''
  ])

  const handleGameStatus = (position) => {
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
    if(handleGameStatus(newBoard)){
      setBoard([...newBoard])
      alert(`You won the round`)
      setScoreUser(scoreUser + 1)
      return;
    }
    setBoard([...newBoard])
    makeCpuMove([...newBoard])
    
}


  const makeCpuMove = (position) =>{
    let possibleMove = []
      for(let i = 0; i <position.length;i++ ){
        if(position[i] == ''){
          possibleMove.push(i)
        }
      }
      let randIdx = Math.floor(Math.random() * (possibleMove.length - 1))
      console.log(position,randIdx,possibleMove)
      position[possibleMove[randIdx]] = 'O'
      if(handleGameStatus(position)){
        setBoard([...position])
        alert(`CPU won the round`)
        setScoreCPu(scoreCPu + 1)
        return;
      }
    setBoard([...position])
  }

  
 
 

  return (
    <>
    <div className="parent">
      {board.map((Element,index) => {
        return <Box text={Element} id ={index} key={index} onClick={handleClick}  />
      }
      )}
        <h3>user  Score : {scoreUser}</h3>
      <h3>cpu  Score : {scoreCPu}</h3>
       </div>
      <div className='score'>
      <button className = "btn"onClick={()=>setBoard([  '','','','','','','','',''])}>reset the board</button>
      </div>
 
  </>);
}

export default App;
