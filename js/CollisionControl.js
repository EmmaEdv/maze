var rays = [
  new THREE.Vector3(0, 0, 1),
  new THREE.Vector3(1, 0, 1),
  new THREE.Vector3(1, 0, 0),
  new THREE.Vector3(1, 0, -1),
  new THREE.Vector3(0, 0, -1),
  new THREE.Vector3(-1, 0, -1),
  new THREE.Vector3(-1, 0, 0),
  new THREE.Vector3(-1, 0, 1)
];

var caster = new THREE.Raycaster();

//Code borrowed from: http://webmaestro.fr/collisions-detection-three-js-raycasting/ : Test and avoid collisions
function collision() {
  var collisions, i;
    // Maximum distance from the origin before we consider collision
  var distance = 1.25;
  // For each ray
  for (i = 0; i < rays.length; i += 1) {
    // We reset the raycaster to this direction
    caster.set(sphere.position, rays[i]);
    // Test if we intersect with any obstacle mesh
    collisions = caster.intersectObjects(obstacles);
    // And disable that direction if we do
    //EN KOLLISSION
    if (collisions.length > 0 && collisions[0].distance <= distance) {
    	//console.log("EN KOLLISSION, ", collisions[0].distance <=  distance, " length ", collisions.length);
      // Yep, this.rays[i] gives us : 0 => up, 1 => up-left, 2 => left, ...
      if ((i === 0 || i === 1 || i === 7) && sphere.direction.z  === 1)
      	sphere.direction.z  = 0;
      else if ((i === 3 || i === 4 || i === 5) && sphere.direction.z === -1)
        sphere.direction.z  = 0;

      if ((i === 1 || i === 2 || i === 3) && sphere.direction.x === 1)
        sphere.direction.x  = 0;
      else if ((i === 5 || i === 6 || i === 7) && sphere.direction.x === -1)
        sphere.direction.x  = 0;
    }
  }
}