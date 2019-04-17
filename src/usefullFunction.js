export function fillLastMove(lastMove, position) {
	if (position % 3 === 0) {
		lastMove.col = 0;
	} else if (position % 3 === 1) {
		lastMove.col = 1;
	} else {
		lastMove.col = 2;
	}
	if (position < 3) {
		lastMove.row = 2;
	} else if (position > 5) {
		lastMove.row = 0;
	} else {
		lastMove.row = 1;
	}
	 
}
      
export function calculateWinner(squares) {
	const lines = [
		[0, 1, 2],
	  	[3, 4, 5],
	  	[6, 7, 8],
	  	[0, 3, 6],
	 	[1, 4, 7],
	  	[2, 5, 8],
	  	[0, 4, 8],
		[2, 4, 6],
	];
	for (let i = 0; i < lines.length; i++) {
	  const [a, b, c] = lines[i];
	  if (squares[a] && squares[b] === squares[a] && squares[a] === squares[c]) {
	    return lines[i];
	  }
	}
	return null;
      }