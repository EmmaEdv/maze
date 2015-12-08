var objectHeight = 2;
//Objekt med storlek och position
var walls = [
	//Lodräta
	{
		geo: {x: 5.5, y: objectHeight, z: 0.5},
		position: {x: 12.75, y: objectHeight/2, z: 10}
	},
	{
		geo: {x: 10.5, y: objectHeight, z: 0.5},
		position: {x: 0, y: objectHeight/2, z: 10}
	},
	{
		geo: {x: 5.5, y: objectHeight, z: 0.5},
		position: {x: -12.75, y: objectHeight/2, z: 10}
	},
	{
		geo: {x: 5, y: objectHeight, z: 0.5},
		position: {x: 2.5, y: objectHeight/2, z: 5}
	},

	{
		geo: {x: 10, y: objectHeight, z: 0.5},
		position: {x: 10.5, y: objectHeight/2, z: 0}
	},
	{
		geo: {x: 5.5, y: objectHeight, z: 0.5},
		position: {x: -2.5, y: objectHeight/2, z: 0}
	},
	{
		geo: {x: 5.5, y: objectHeight, z: 0.5},
		position: {x: -12.75, y: objectHeight/2, z: 0}
	},
	{
		geo: {x: 5.25, y: objectHeight, z: 0.5},
		position: {x: 7.25, y: objectHeight/2, z: -5.25}
	},
	{
		geo: {x: 5.5, y: objectHeight, z: 0.5},
		position: {x: 12.75, y: objectHeight/2, z: -10.25}
	},
	{
		geo: {x: 5.5, y: objectHeight, z: 0.5},
		position: {x: 2.5, y: objectHeight/2, z: -10.25}
	},
	{
		geo: {x: 5.5, y: objectHeight, z: 0.5},
		position: {x: -7.5, y: objectHeight/2, z: -10.25}
	},

	//Vågräta
	{
		geo: {x: 0.5, y: objectHeight, z: 5.5},
		position: {x: 10.25, y: objectHeight/2, z: 7.5}
	},
	{
		geo: {x: 0.5, y: objectHeight, z: 5.5},
		position: {x: 5, y: objectHeight/2, z: 7.5}
	},
	{
		geo: {x: 0.5, y: objectHeight, z: 15.5},
		position: {x: -5, y: objectHeight/2, z: 2.5}
	},
	{
		geo: {x: 0.5, y: objectHeight, z: 5.5},
		position: {x: -10, y: objectHeight/2, z: 7.5}
	},
	{
		geo: {x: 0.5, y: objectHeight, z: 10.75},
		position: {x: 0, y: objectHeight/2, z: -5.15}
	},
	{
		geo: {x: 0.5, y: objectHeight, z: 10.75},
		position: {x: -10, y: objectHeight/2, z: -5.15}
	},
	{
		geo: {x: 0.5, y: objectHeight, z: 5.5},
		position: {x: 10.25, y: objectHeight/2, z: -7.75}
	}
];