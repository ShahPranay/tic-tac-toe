
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props){
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
}

function calculatewinner(squares){
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ];
  for(let i=0;i<8;++i){
    if(squares[lines[i][0]] && squares[lines[i][1]]===squares[lines[i][0]] && squares[lines[i][2]]===squares[lines[i][0]]){
      return squares[lines[i][0]];
    }
  }
  return 0;
}

class Board extends React.Component {
  constructor(props){
    super(props);
    this.state={
      squares:Array(9).fill(null),
      gamestate:null,
    }
  }
  handleclick(i){
    var squarestmp=this.state.squares.slice();var squarenum=Array(9).fill(0),n=0;
    for(let j=0;j<9;j++){
      if(squarestmp[j]==='X')
        squarenum[j]=1;
      else if(squarestmp[j]==='O')
        squarenum[j]=2;
      else
        n++;
    }
    if(squarestmp[i]!==null || this.state.gamestate!=null){
      alert('illegal move');
    }
    else{
      squarenum[i]=1;
      let tmp=backtracking(squarenum.slice(),2);
      squarestmp[i]='X';
      if(tmp[1]>=0 && tmp[1]<9){
        squarestmp[tmp[1]]='O';
      }
      else{
        this.setState({gamestate:tmp[0]});
      }
      var tmp2=calculatewinner(squarestmp);
      if(n===8 || tmp2){
        this.setState({gamestate:tmp2});
      }
      this.setState({squares:squarestmp});
    } 
  }
  renderSquare(i) {
    return (
      <Square 
        value={this.state.squares[i]}
        onClick={()=>this.handleclick(i)}
      />
    );
  }
  render() {
    const status = (this.state.gamestate!==null)? ((this.state.gamestate===0)?'Draw':'winner is '+this.state.gamestate):'Your Turn';
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================
var player2={},player1={};

function backtracking(squares,player){
  var id=0,p=1;
  for(let j=0;j<9;j++){
    id+=squares[j]*p;
    p=p*3;
  }
  if(player===2 && (id in player2))
    return player2[id];
  if(player===1 && (id in player1))
    return player1[id];
  var tmp=calculatewinner(squares);
  if(tmp!==0){
    if(player===2)
      player2[id]=[tmp,-1,-Infinity];
    else
      player1[id]=[tmp,-1,-Infinity];
    return [tmp,-1,-Infinity];
  }
  var possiblemoves=[],n=0;
  for(let i=0;i<9;++i){
    if(squares[i]===0){
      possiblemoves.push(i);
      ++n;
    }
  }
  if(n===0)
    return [0,-1,-Infinity];
  var wincnt=0,move=0,bestmove=[0,-1,Infinity];
  var nxt=(player===1)?2:1;
  for(let i=0;i<n;i++){
    squares[possiblemoves[i]]=player;
    var [winnertmp,nextmove,wincntnxt]=backtracking(squares.slice(),nxt);
    if(winnertmp===player){
      wincnt++;
      if(bestmove[0]!==player || wincntnxt<bestmove[2]){
        bestmove=[winnertmp,nextmove,wincntnxt];move=possiblemoves[i];
      }
    }
    else if(winnertmp===nxt){
      wincnt--;
      if(bestmove[2]===Infinity){
        bestmove=[winnertmp,nextmove,wincntnxt];move=possiblemoves[i];
      }
    }
    else{
      if(bestmove[0]===nxt || (bestmove[0]===0 && wincntnxt<bestmove[2])){
        bestmove=[winnertmp,nextmove,wincntnxt];move=possiblemoves[i];
      }
    }
    squares[possiblemoves[i]]=0;
  }
  if(player===2)
    player2[id]=[bestmove[0],move,wincnt];
  else
    player1[id]=[bestmove[0],move,wincnt];
  return [bestmove[0],move,wincnt];
}

for(let i=0;i<9;++i){
  let sq=Array(9).fill(0);
  sq[i]=1;
  backtracking(sq,2);
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);