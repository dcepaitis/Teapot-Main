let control, container, renderer, scene, camera, mesh;

window.addEventListener('load', function () {
  container = document.getElementById('container');
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );
  camera.position.z = 100;
  camera.target = new THREE.Vector3(0, 0, 0);
  scene.add(camera);

  material = new THREE.ShaderMaterial({
    uniforms: {
      dx: { type: 'f', value: 0.0 },
      dy: { type: 'f', value: 0.0 },
      dz: { type: 'f', value: 1.0 },
      uBigCircleRadius: { type: 'f', value: 0.25 },
      uSmallCircleRadius: { type: 'f', value: 0.2 },
      uDivisions: { type: 'f',value: 8},
      uScale: { type: 'f', value: 8.0},
      uEdge: {type: 'f', value: 0.0}
    },
    vertexShader: document.getElementById('vertexShader').textContent,
    fragmentShader: document.getElementById('fragmentShader').textContent,
  });
  geometry = new THREE.TeapotGeometry(15, 20, true, true, true, true, true);
  var mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  initControls();
  render();
});

function initControls() {
  control = new (function () {
    this.x = 0.5;
    this.y = 0.5;
    this.z = 1.0;
    this.bigCircleRadius = 0.3;
    this.smallCircleRadius = 0.2;
    this.divisions = 8.0;
    this.scale = 3.0;
    this.edge = 0.0;

  })();

  var gui = new dat.GUI();
  gui.add(control, 'x', -1.0, 1.0, 0.0);
  gui.add(control, 'y', -1.0, 1.0, 0.0);
  gui.add(control, 'z', 1.0, 2.0, 1.0);
  gui.add(control, 'bigCircleRadius', 0, 0.5).step(0.01);
  gui.add(control, 'smallCircleRadius',0, 0.25).step(0.01);
  // gui.add(control, 'divisions', 0, 10.0).step(2.0);
  gui.add(control, 'scale', 1, 10.0).step(1.0);
  gui.add(control, 'edge', 0.0, 10.0);


  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  container.appendChild(renderer.domElement);
  controls = new THREE.TrackballControls(camera, renderer.domElement);
}

function render() {
  material.uniforms.dx.value = control.x;
  material.uniforms.dy.value = control.y;
  material.uniforms.dz.value = control.z;
  material.uniforms.uBigCircleRadius.value = control.bigCircleRadius;
  material.uniforms.uSmallCircleRadius.value = control.smallCircleRadius;
  material.uniforms.uDivisions.value = control.divisions;
  material.uniforms.uScale.value = control.scale;
  material.uniforms.uEdge.value = control.edge;


  // render
  renderer.render(scene, camera);
  requestAnimationFrame(render);
  controls.update();
}
