const players = [];

function createUser (name) {return {name};};

function createPlayer(name, mark) {
    const { }= createUser(name);
    return {name, mark};
};

players.push(createPlayer('Me', 'X'))
players.push(createPlayer('You', 'O'))

const board = (function () {
    let currentPlayer = players[0];
    const dimension = 3;
    let squares = [];
    
    const printBoard =() => {
        let index=0;
        boardContainer= document.getElementById("board");
        for(let y=1; y<=dimension; y++){
        let row = document.createElement("div");
        row.setAttribute("class", 'row');
            for(let x=1; x<=dimension;x++) {
                space=document.createElement("div");

                const square = {index: index, x: x, y: y, mark: 'empty'};
                squares.push(square);

                space.setAttribute("id", index);
                space.setAttribute("class", 'space');
                space.innerHTML = "Empty";
                space.onclick = ((id)=>()=>turn(id))(index);
                row.appendChild(space);;
                index+=1};
                boardContainer.appendChild(row);
            };
    };

    const turn = (id) => {
        console.log(id)
        squares[id].mark =currentPlayer.mark;
        document.getElementById(id).innerHTML= currentPlayer.mark;
        document.getElementById(id).onclick = ""
        checkVictory(id);
        if(currentPlayer == players[0]) {currentPlayer = players[1]}
        else {currentPlayer=players[0]};
    };

    const checkVictory = (id) => {
        for(let i=0; i<squares.length; i++){console.log(i);
            if(squares[i].mark == 'empty') {break};
            if(i==squares.length-1){console.log(`Game is a tie!`);};
        };

        if(id==0||id==3||id==6) {if(squares[id+1].mark==currentPlayer.mark && 
            squares[id+2].mark==currentPlayer.mark){
                {console.log(`${currentPlayer.name} wins a vertical victory!`)};
            }}
        else if (id==1||id==4||id==7) {if(squares[id-1].mark==currentPlayer.mark && 
            squares[id+1].mark==currentPlayer.mark){
                console.log(`${currentPlayer.name} wins a vertical victory!`)}}

        else if(id==2||id==5||id==8) {
            if(squares[id-1].mark==currentPlayer.mark && 
            squares[id-2].mark==currentPlayer.mark){
                console.log(`${currentPlayer.name} wins a vertical victory!`)}}

        if(id==0||id==1||id==2) {if(squares[id+3].mark==currentPlayer.mark && 
            squares[id+6].mark==currentPlayer.mark){
                {console.log(`${currentPlayer.name} wins a horizontal victory!`)};
            }}
        else if (id==3||id==4||id==5) {if(squares[id-3].mark==currentPlayer.mark && 
            squares[id+3].mark==currentPlayer.mark){
                console.log(`${currentPlayer.name} wins a horizontal victory!`)}}

        else if(id==6||id==7||id==8){
            if(squares[id-3].mark==currentPlayer.mark && 
            squares[id-6].mark==currentPlayer.mark){
                console.log(`${currentPlayer.name} wins a horizontal victory!`)}}
        
        if(squares[0].mark==currentPlayer.mark &&
            squares[4].mark==currentPlayer.mark &&
            squares[8].mark==currentPlayer.mark)
            {console.log(`${currentPlayer.name} wins a diagnol victory!`)}
        else if (squares[2].mark==currentPlayer.mark &&
            squares[4].mark==currentPlayer.mark &&
            squares[6].mark==currentPlayer.mark)
            {console.log(`${currentPlayer.name} wins a diagnol victory!`)}
    };
    return{dimension, players, squares, currentPlayer, printBoard, turn, checkVictory}
})();

board.printBoard()