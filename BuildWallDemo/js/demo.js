if ( WEBGL.isWebGLAvailable() === false ) {

    document.body.appendChild( WEBGL.getWebGLErrorMessage() );

}

var camera,scene,renderer;
var mouse,raycaster;
var plane;
let orbitControl,transControl;

init();
render();
function init() {
    camera=new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,1,10000);
    camera.position.set(1200,1200,0);
    camera.lookAt(0,0,0);

    scene=new THREE.Scene();
    scene.background=new THREE.Color(0xf0f0f0);

    // lights
    var ambientLight = new THREE.AmbientLight( 0x606060 );
    scene.add( ambientLight );

    var directionalLight = new THREE.DirectionalLight( 0xffffff );
    directionalLight.position.set( 1, 0.75, 0.5 ).normalize();
    scene.add( directionalLight );

    //renderer
    renderer=new THREE.WebGLRenderer({ antialias:true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth,window.innerHeight);
    document.body.appendChild(renderer.domElement);
    renderer.domElement.id='canvas';

    //controls orb
    orbitControl=new THREE.OrbitControls(camera,renderer.domElement);
    orbitControl.enableDamping=true;
    orbitControl.screenSpacePanning=false;
    orbitControl.maxPolarAngle=Math.PI/2;
    orbitControl.enablePan=false;
    // trans control

   //grid
     var gridHelper=new THREE.GridHelper(1000,100);
     console.log(gridHelper);
     scene.add(gridHelper);

   var geometry=new THREE.PlaneBufferGeometry(1000,1000);
   geometry.rotateX(-Math.PI/2);
   plane=new THREE.Mesh(geometry,new THREE.MeshBasicMaterial({visible:false}));
   scene.add(plane);

    //加载json模型
    var objectLoader=new THREE.ObjectLoader();
    objectLoader.load('mod/level6.json',function (obj) {
        obj.scale.set(0.03,0.03,0.03);
        obj.position.set(-340,-465,220);
        obj.rotateX(Math.PI/180*270);
        scene.add(obj);
        render();

    });
    window.addEventListener( 'resize', onWindowResize, false );
}
function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function render() {
    orbitControl.update();
    renderer.render( scene, camera );
    requestAnimationFrame(render);
}