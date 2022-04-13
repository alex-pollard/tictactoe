import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {calculateWinner} from './helpers.js'
import {Typography, Space, Button} from 'antd'

const {Title} = Typography;
//import ShoppingList from './shoppingList';
function refreshPage() {
  window.location.reload(false);
}

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
   let status;
   const winner = calculateWinner(this.state.squares);
    if (winner){
     status= 'Winner: ' + winner;
     return( 
       <>
        <Typography className="status">{status}</Typography>
        <Button type="primary"  onClick={refreshPage}>Reset</Button>
        </>)
    }
    else{
    status='Next player: ' + (this.state.xIsNext ? 'X' : 'O');
  }
    
    return (
      <div>
        
        <Typography className="status">{status}</Typography>
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
    let title;
    let random;
    random = Math.floor(Math.random() * 11);
    title = (random > 9) ? "Toe Toe Toe" : "Tic Tac Toe";
    return (
      <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}className="game">
        <Space type='vertical'>
        <div className="game-board">
        <Title className="title">{title}</Title>
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
        </Space>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <>

  <Game />
  </>,
  document.getElementById('root')
);
