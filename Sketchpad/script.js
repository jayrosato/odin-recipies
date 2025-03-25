let new_grid_button = document.getElementById("new_grid_button");
let grid_container = document.getElementById("grid_container");


new_grid_button.onclick = () => new_grid()

function new_grid() {
    let dimension = prompt("Please enter the grid dimensions", 16);
    if (dimension == null || isNaN(dimension) == true) {
        alert("Please enter a valid integer!")
    }
    else if(dimension > 100) {alert("Max grid size is 100!")}
    else {generate_square_grid(dimension)};
};

function generate_square_grid(dimension) {
    let grid_exists = document.getElementById("main_grid");
    if(grid_exists != null) {
        grid_exists.remove()
    };
    const main_grid = document.createElement("div");
    main_grid.setAttribute("id", "main_grid");
    main_grid.setAttribute("class", "main_grid");
    grid_container.appendChild(main_grid);

    for(let rows=1; rows<=dimension; rows++) {
        const row = document.createElement("div");
        row.setAttribute("class", "row");
        main_grid.appendChild(row);
        
        for(let grid_spaces=1; grid_spaces<=dimension; grid_spaces++) {
            const grid_space = document.createElement("div");
            let grid_space_id = rows + 'x' + grid_spaces;
            grid_space.setAttribute("id", grid_space_id);
            grid_space.setAttribute("class", "grid_space");
            grid_space.onmouseover = () => draw(grid_space_id);
            row.appendChild(grid_space);
        };
    };
};

function draw(grid_space_id) {
    const target_grid = document.getElementById(grid_space_id);
    const drawn_in_object = window.getComputedStyle(target_grid);
    const drawn_in_color = drawn_in_object.getPropertyValue("background-color");
    if (drawn_in_color == "rgb(0, 0, 255)") {
        target_grid.style.backgroundColor = "white";
    }
    else {target_grid.style.backgroundColor = "blue";};
}


generate_square_grid(16);
