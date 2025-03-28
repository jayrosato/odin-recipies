function Board(dimension, players) {
   this.dimension = dimension,
    this.players = players,
    this.current_player = this.players[0];
    this.squares = [];
    this.printBoard =  function () {
        let index=0;
        board= document.getElementById("board");
        for(let y=1; y<=dimension; y++){
        let row = document.createElement("div");
        row.setAttribute("class", 'row');
            for(let x=1; x<=dimension;x++) {
                space=document.createElement("div");

                const square = {index: index, x: x, y: y, mark: 'empty'};
                this.squares.push(square);

                space.setAttribute("id", index);
                space.setAttribute("class", 'space');
                space.innerHTML = "Empty";
                space.onclick = this.turn.bind(this, index)
                row.appendChild(space);
                index+=1};

            board.appendChild(row);
            };
    };

    this.turn = function (id) {
        this.squares[id].mark =this.current_player.mark;
        document.getElementById(id).innerHTML= this.current_player.mark;
        document.getElementById(id).onclick = ""
        this.checkVictory(id);
        if(this.current_player == this.players[0]) {this.current_player = this.players[1]}
        else {this.current_player=this.players[0]};
    };

    this.checkVictory = function (id) {
        for(let i=0; i<this.squares.length; i++){console.log(i);
            if(this.squares[i].mark == 'empty') {break};
            if(i==this.squares.length-1){console.log(`Game is a tie!`);};
        };

        if(id==0||id==3||id==6) {if(this.squares[id+1].mark==this.current_player.mark && 
            this.squares[id+2].mark==this.current_player.mark){
                {console.log(`${this.current_player.name} wins a vertical victory!`)};
            }}
        else if (id==1||id==4||id==7) {if(this.squares[id-1].mark==this.current_player.mark && 
            this.squares[id+1].mark==this.current_player.mark){
                console.log(`${this.current_player.name} wins a vertical victory!`)}}

        else if(id==2||id==5||id==8) {
            if(this.squares[id-1].mark==this.current_player.mark && 
            this.squares[id-2].mark==this.current_player.mark){
                console.log(`${this.current_player.name} wins a vertical victory!`)}}

        if(id==0||id==1||id==2) {if(this.squares[id+3].mark==this.current_player.mark && 
            this.squares[id+6].mark==this.current_player.mark){
                {console.log(`${this.current_player.name} wins a horizontal victory!`)};
            }}
        else if (id==3||id==4||id==5) {if(this.squares[id-3].mark==this.current_player.mark && 
            this.squares[id+3].mark==this.current_player.mark){
                console.log(`${this.current_player.name} wins a horizontal victory!`)}}

        else if(id==6||id==7||id==8){
            if(this.squares[id-3].mark==this.current_player.mark && 
            this.squares[id-6].mark==this.current_player.mark){
                console.log(`${this.current_player.name} wins a horizontal victory!`)}}
        
        if(this.squares[0].mark==this.current_player.mark &&
            this.squares[4].mark==this.current_player.mark &&
            this.squares[8].mark==this.current_player.mark)
            {console.log(`${this.current_player.name} wins a diagnol victory!`)}
        else if (this.squares[2].mark==this.current_player.mark &&
            this.squares[4].mark==this.current_player.mark &&
            this.squares[6].mark==this.current_player.mark)
            {console.log(`${this.current_player.name} wins a diagnol victory!`)}
    }

};


const player1 = {name: 'Me', mark: 'X'}
const player2 = {name: 'You', mark: 'O'}
players = [player1, player2]

const grid = new Board(3, players);
grid.printBoard();