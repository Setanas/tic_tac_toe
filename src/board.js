import React from 'react';
import './index.css'

function Square(props) {
	let className = "square";

	if (props.win) {
		className += ' win';
	}
	return (
	<button className={className} onClick={props.onClick}> {props.value}
	</button>)
}

class Board extends React.Component {
	renderLine(size) {
		let html = [];
		let win = false;

		for (let square = 0; square < 3; square++) {
			if (this.props.winner && this.props.winner.indexOf(square + size) !== -1) {
				win = true;
			} else {
				win = false;
			}
			html.push(<Square value={this.props.squares[square + size]} win={win}
				onClick={() => this.props.onClick(square + size)}/>);
		}
	  return html;
	}

	renderSquare() {
		let html = [];
		const size = 3;
		for (let square = 0; square < size; square++) {
			html.push(<div className="board-row">
			{this.renderLine(square * size)}
		      </div>)
		}
		return html;
	}

	render() {
	  return (
	    <div>
		    {this.renderSquare()}
	    </div>
	  );
	}
      }

export default Board;