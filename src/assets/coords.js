function World(name, desc, to) {
    this.worldName = name;
    this.desc = desc;
    this.to = to;
    this.coords = [];
};

function AddCoords(worldObj, coordName, coordX, coordY, coordZ) {
    let coordArray
};

var firstWorld = new World('firstWorld','desc1','/gay');

console.log(firstWorld);

AddCoords(firstWorld, "200,200,200");

console.log(firstWorld);