//Variables
var scene, renderer, camera;
var group;
var mesh, sphere, spotLight;
var mazeSize = 16;
var clock;
var obstacles = [];
//Add keyboard controls
var keyboard = new KeyboardState();

//Variables to check if game is started and finished
var gameStarted = false, reachedGoal = false;
var finishTime = 0, time = 0;
//Save start position and start direction of the ball, reused. 
var startPosition = {x: 15.5, y: 1, z: 12.5};
var startDirection = {x: -1, y: 0, z:0};

//Variables to write to divs
var timer = document.getElementById('timer');
var interaction = document.getElementById('interaction');
var top = document.getElementById('top');
var center = document.getElementById('center');
var bottom = document.getElementById('bottom');

//Initiate scene and animate
init();
animate();

//Initiate scene
function init(){
	var WIDTH = window.innerWidth; 
	var HEIGHT = window.innerHeight;

	//Renderer
	renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize(WIDTH, HEIGHT);
  document.body.appendChild(renderer.domElement);
  
  //Create scene
  scene = new THREE.Scene();
  
  //Define a camera
  camera = new THREE.PerspectiveCamera(
    35,         			// Field of view
    WIDTH / HEIGHT,  // Aspect ratio
    .1,         		// Near
    10000       	 // Far
  );

  camera.position.set(40, 40, 0);
  var viewDirection = {x:0, y:0, z:0};
  camera.lookAt(viewDirection);

	//Load marble texture to the plane/floor
	var marbleTex = THREE.ImageUtils.loadTexture("texture/marble.jpg");
	var marbleMat = new THREE.MeshPhongMaterial({map: marbleTex});
	//Apply texture on both sides
	marbleMat.side = THREE.DoubleSide;

  //Create plane
  var planeGeo = new THREE.PlaneGeometry(mazeSize*2, mazeSize*2, 32, 32);
	var plane = new THREE.Mesh(planeGeo, marbleMat);
	plane.rotation.order = "YXZ";
	plane.rotation.x = Math.PI/2;
	plane.position.set(0,0,0)
	scene.add(plane);

  //Create fence around the maze
  var geometryRight = new THREE.BoxGeometry(2*mazeSize+1, objectHeight, 1);
  var geometryLeft = new THREE.BoxGeometry(2*mazeSize-5.5, objectHeight, 1);
  var geometryTop = new THREE.BoxGeometry(1, objectHeight, 2*mazeSize+1);
  var geometryBottom = new THREE.BoxGeometry(1, objectHeight, 2*mazeSize-5.55);

  var fenceMat = new THREE.MeshPhongMaterial({color: 0x000000});
  
  var rightFence = new THREE.Mesh(geometryRight, fenceMat);
  rightFence.position.set(0, objectHeight/2, mazeSize);
  scene.add(rightFence);

  var bottomFence = new THREE.Mesh(geometryBottom, fenceMat);
  bottomFence.position.set(mazeSize, objectHeight/2, -3.12);
  scene.add(bottomFence);
  
  var leftFence = new THREE.Mesh(geometryLeft, fenceMat);
  leftFence.position.set(3.25, objectHeight/2, -mazeSize);
  scene.add(leftFence);

  var topFence = new THREE.Mesh(geometryTop, fenceMat);
  topFence.position.set(-mazeSize, objectHeight/2, 0);
  scene.add(topFence);

  //Add fence to obstacles, for collision control	
  obstacles.push(rightFence);
  obstacles.push(bottomFence);
  obstacles.push(leftFence);
  obstacles.push(topFence);
	
	//Add maze walls
  for(var i=0; i<walls.length; i++){
  	var geo = new THREE.BoxGeometry(walls[i].geo.x, walls[i].geo.y, walls[i].geo.z);
  	var wall = new THREE.Mesh(geo, fenceMat);
  	wall.position.set(walls[i].position.x, walls[i].position.y, walls[i].position.z);
  	scene.add(wall);
  	//Add walls to obstacles, for collision control	
  	obstacles.push(wall);
  }

  //Create sphere with aluminum texture
	var aluminumTex = THREE.ImageUtils.loadTexture("./texture/aluminum.jpg");
	var aluminumMat = new THREE.MeshPhongMaterial({map: aluminumTex});

  var sphereGeo = new THREE.SphereGeometry(1, 32, 32);
  sphere = new THREE.Mesh(sphereGeo, aluminumMat);
  
  //Run start to set variables (position and direction of sphere)
  start();
  scene.add(sphere);

  //Create a spotlight above the sphere
  spotLight = new THREE.SpotLight(0xFFFFFF);
  //Spotlight should be focused on the sphere
  spotLight.target = sphere;
  spotLight.castShadow = true;
  spotLight.shadowDarkness = 0.5;

  scene.add(spotLight);

  //Set renderer
  renderer.setClearColor(0xdddddd, 1);
  renderer.render( scene, camera );
  renderer.shadowMapType = THREE.PCFSoftShadowMap;
}

//Animate the scene
function animate(){
	requestAnimationFrame(animate);
	//Render the scene
	renderer.render(scene, camera);
	//Run update
	update();
}

function update(){ 
	keyboard.update();
	//Update the light position, should be above the sphere
	spotLight.position.set(sphere.position.x, sphere.position.y + 8, sphere.position.z);

	//If the variable gameStarted is true, a game is ongoing
	if(gameStarted){
		//Set how far the ball should move for each press
		var moveDistance = 10 * clock.getDelta(); 

		//When pressing left arrow, move left
		if(keyboard.pressed("left")){
			sphere.direction = {x: 0, y: 0, z: 1};
			collision();
			
			if(sphere.direction.x !== 0 || sphere.direction.z !== 0)
				sphere.translateZ(moveDistance);
		}
		//When pressing right arrow, move right
		if(keyboard.pressed("right")){
			sphere.direction = {x: 0, y: 0, z: -1};
			collision();
			
			if(sphere.direction.x != 0 || sphere.direction.z != 0)
				sphere.translateZ(-moveDistance);
		}
		//When pressing down arrow, move down
		if(keyboard.pressed("down")){
			sphere.direction = {x: 1, y: 0, z: 0};
			collision();
			if(sphere.direction.x != 0 || sphere.direction.z != 0)
				sphere.translateX(moveDistance);
		}
		//When pressing up arrow, move up
		if (keyboard.pressed("up")){
			sphere.direction = {x: -1, y: 0, z: 0};
			collision();
			if(sphere.direction.x != 0 || sphere.direction.z != 0)
				sphere.translateX(-moveDistance);
		}

		//When goal is reached:
		if(sphere.position.x <= -10.5 && sphere.position.z <= -15){
			//Set variabe reach goal to true, gameStarted to false, stop timer and run finished function
			reachedGoal = true;
			gameStarted = false;
			clock.stop();
			finished();

		}
		//If user trying to go outside the fences, put the sphere back
		if(sphere.position.x >= 18){
			sphere.position.set(startPosition.x, startPosition.y, startPosition.z);
		}

		//Update timer text
		if(!reachedGoal){
			timer.innerHTML = "Timer: " + time + " seconds";
			time = clock.getElapsedTime().toFixed(1)
		}
	}
}

//When player is finished:
function finished(){
	//Set text and display the interaction div
	center.innerHTML = "You reached goal in " + time + " seconds.";
	bottom.innerHTML = "<button class='button' id='start' onclick='btnPlay()'>Play</button>";
	interaction.style.display = '';
}

//When player presses the play button:
function btnPlay(){
	//Hide the interaction div, run start to sett balls position and set timer
	interaction.style.display = 'none';
	start();
	gameStarted = true;
	clock = new THREE.Clock();
	clock.start();
}

function start(){
	reachedGoal = false;
	sphere.position.set(startPosition.x, startPosition.y, startPosition.z);
	sphere.direction = startDirection;
	
}