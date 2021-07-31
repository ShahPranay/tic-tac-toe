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

class GameOptions extends React.Component{
  constructor(props){
    super(props);
    this.state={
      firstplayer:this.props.firstplayer,
      difficulty:this.props.difficulty,
    }
    this.handleplayerchange=this.handleplayerchange.bind(this);
    this.handlediffchange=this.handlediffchange.bind(this);
    this.handlesubmit=this.handlesubmit.bind(this);
  }
  handleplayerchange(event){
    this.setState({firstplayer: event.target.value});
  }
  handlediffchange(event){
    this.setState({difficulty: event.target.value});
  }
  handlesubmit(event){
    this.props.onstart(this.state.firstplayer,this.state.difficulty);
    event.preventDefault();
  }
  render(){
    return(
      <div>
        <form onSubmit={this.handlesubmit}>
          <label className="firstplayer" >
            Choose first player:
            <select value={this.state.firstplayer} onChange={this.handleplayerchange}>
              <option value={1}>You</option>
              <option value={2}>Computer</option>
            </select>
          </label>
          <label className="difficulty">
            Set difficulty:
            <select value={this.state.difficulty} onChange={this.handlediffchange}>
              <option value={0.7}>Easy</option>
              <option value={0.85}>Medium</option>
              <option value={1}>Hard</option>
            </select>
          </label>
          <input className="startbutton" type="submit" value="Start Game" />
        </form>
      </div>
    );
  }
}

class Board extends React.Component {
  constructor(props){
    super(props);
    this.state={
      squares:Array(9).fill(null),
      gamestate:null,
    }
    this.compmove=this.compmove.bind(this);
  }
  compmove(squarenum,squarestmp){
    var possiblemoves=[],size=0;
    for(let i=0;i<9;++i){
      if(squarenum[i]===0){
        possiblemoves.push(i);
        size++;
      }
    }
    var r=Math.random();
    if(r>this.props.difficulty){
      var m=Math.floor(Math.random()*size);
      squarestmp[possiblemoves[m]]='O';
    }
    else{
      let tmp=backtracking(squarenum.slice(),2);
      if(tmp[0]>=0 && tmp[0]<9){
        squarestmp[tmp[0]]='O';
      }
      else{
        this.setState({gamestate:((tmp[1]>0)?2:((tmp[1]===0)?0:1))});
      }
    }
    this.setState({squares:squarestmp});
    var tmp2=calculatewinner(squarestmp);
    if(size===1 || tmp2){
      this.setState({gamestate:tmp2});
    }

  }
  handleclick(i){
    var squarestmp=this.state.squares.slice();var squarenum=Array(9).fill(0);
    for(let j=0;j<9;j++){
      if(squarestmp[j]==='X')
        squarenum[j]=1;
      else if(squarestmp[j]==='O')
        squarenum[j]=2;
    }
    if(squarestmp[i]!==null || this.state.gamestate!=null){
      alert('illegal move');
    }
    else{
      squarenum[i]=1;
      squarestmp[i]='X';
      this.compmove(squarenum,squarestmp);
      
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
    const status = (this.state.gamestate!==null)? ((this.state.gamestate===0)?'Draw':'winner is '+this.state.gamestate):'Play';
    if(this.props.reset){
      this.setState({squares:Array(9).fill(null),gamestate:null});
      if(this.props.firstplayer==2){
        // var tmp=backtracking(Array(9).fill(0),2),squarestmp2=Array(9).fill(null);
        // squarestmp2[tmp[0]]='O';
        // this.setState({squares: squarestmp2});
        this.compmove(Array(9).fill(0),Array(9).fill(null));
      }
      this.props.resetdone();
    }
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
  constructor(props){
    super(props);
    this.state={
      firstplayer:1,
      difficulty:0.7,
      reset:false,
    }
    this.startgame=this.startgame.bind(this);
    this.resetdone=this.resetdone.bind(this);
  }
  startgame(player,diff){
    this.setState({firstplayer: player, difficulty: diff,reset:true});
  }
  resetdone(){
    this.setState({reset:false});
  }
  render() {
    return (
      <div className="game">
        <div className="game-options">
          <GameOptions firstplayer={this.state.firstplayer} difficulty={this.state.difficulty} onstart={this.startgame} />
        </div>
        <div className="game-board">
          <Board firstplayer={this.state.firstplayer} difficulty={this.state.difficulty} reset={this.state.reset} resetdone={this.resetdone}/>
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
  var possiblemoves=[],n=0;
  for(let i=0;i<9;++i){
    if(squares[i]===0){
      possiblemoves.push(i);
      ++n;
    }
  }
  var tmp=calculatewinner(squares);
  if(tmp!==0){
    if(tmp===2){
      player2[id]=[-1,10+n];
      return player2[id];
    }
    else{
      player1[id]=[-1,-10-n];
      return player1[id];
    }
  }
  
  if(n===0)
    return [-1,0];
  var bestmove,haswon=0;
  if(player===2)
    bestmove=[-1,-Infinity];
  else
    bestmove=[-1,Infinity];
  var nxt=(player===1)?2:1;
  for(let i=0;i<n;i++){
    squares[possiblemoves[i]]=player;
    var nextans=backtracking(squares,nxt);
    if(haswon===0){
      if(player===2){
        if(nextans[1]>bestmove[1])
          bestmove=[possiblemoves[i],nextans[1]];
      }
      else{
        if(nextans[1]<bestmove[1])
          bestmove=[possiblemoves[i],nextans[1]];
      }
    }
    squares[possiblemoves[i]]=0;
  }
  if(player===2)
    player2[id]=bestmove;
  else
    player1[id]=bestmove;
  return bestmove;
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