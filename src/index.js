import React from 'react';
import ReactDOM from 'react-dom';
import Board from './board.js';
import {fillLastMove} from './usefullFunction';
import {calculateWinner} from './usefullFunction';
import './index.css';

function Draw(props) {
	let draw = null;

	if (props.draw) {
		draw = <div className="draw">It's a draw </div>
	}
	return draw;
}
      
class Game extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			history: [{
				squares: Array(9).fill(null),
				lastMove: {
					col: null,
					row: null,
				}
			}],
			xIsNext: true,
			stepNumber: 0,
			ascendSort: true,
		}
	} 
	
	handleClick(i) {
		const history = this.state.history.slice(0, this.state.stepNumber + 1);
		const current = history[history.length - 1];
		const squares = current.squares.slice();
		const lastMove = {
			col: null,
			row: null
		}
		if (calculateWinner(current.squares)|| squares[i]) {
			return;
		}
		squares[i] = this.state.xIsNext ? 'X' : 'O';
		fillLastMove(lastMove, i);
		this.setState({
			history: history.concat([{squares: squares,
			lastMove: lastMove}]),
			xIsNext: !this.state.xIsNext,
			stepNumber: history.length,
		});
	}
	
	jumpTo(step) {
		this.setState({
			xIsNext: step % 2 === 0,
			stepNumber: step
		});
	}
	
	sortMove(ascend, history) {
		let btn_class = null;
		let moveHistory = [];

		if (ascend) {
			for (let it = 0; it < history.length; it++) {
				const desc = it ? 'Go to move #' + it : 'Go to game start';				
				if (this.state.stepNumber === it) {
					btn_class = "boldButton";
				} else {
					btn_class = null;
				}
				moveHistory.push(<li key={it}>
					<button className={btn_class} onClick={() => this.jumpTo(it)}>{desc}</button>
					<p>Last move : x = {history[it].lastMove.col} y = {history[it].lastMove.row}</p>
			      </li>)
			}
		} else {
			for (let it = history.length - 1; it >= 0; it--) {
				const desc = it ? 'Go to move #' + it : 'Go to game start';				
				if (this.state.stepNumber === it) {
					btn_class = "boldButton";
				} else {
					btn_class = null;
				}
				moveHistory.push(<li key={it}>
					<button className={btn_class} onClick={() => this.jumpTo(it)}>{desc}</button>
					<p>Last move : x = {history[it].lastMove.col} y = {history[it].lastMove.row}</p>
			      </li>)
			}
		}
		return moveHistory;
	};

	render() {
	  const history = this.state.history;
	  const current = history[this.state.stepNumber];
	  const winner = calculateWinner(current.squares);
	  let status = null;
	  const moves = this.sortMove(this.state.ascendSort, history);
	  if (winner) {
	    status = 'Winner: ' + current.squares[winner[0]];
	  } else {
	    status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
	  }
	  return (
	    <div className="game">
	      <div className="game-board">
		<Board squares={current.squares} winner={winner} onClick= {(i) => this.handleClick(i)}/>
		<Draw draw={(moves.length === 10 && this.state.stepNumber === 9 && !winner)}/>
	      </div>
	      <div className="game-info">
		<div>{status}</div>
		<ol><button onClick={() => this.setState({ascendSort: !this.state.ascendSort})}>Change order</button></ol>
		<ol>{moves}</ol>
	      </div>
	    </div>
	  );
	}
      }
      
      // ========================================
      
      ReactDOM.render(
	<Game />,
	document.getElementById('root')
      );