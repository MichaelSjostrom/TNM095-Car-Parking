var tileSize = 24;
var body = document.getElementsByTagName("BODY")[0];
var window = window;
var canvases = [];
var bgRenderer;

var tileMap = createParkingLot();

function run(){
	// build layers

	for (var i = 0, len = 2; i < len; i++) {
		var canvas = '<canvas width="'+(tileMap.length * tileSize)+'" height="'+(tileMap[0].length * tileSize)+'" data-index="'+i+'" class="gamecanvas canvas'+ i +'"/>';
		body.innerHTML += canvas;
		canvases.push(canvas);
	}


  var mapCanvas = document.getElementsByTagName("canvas")[0];
  var mapRenderer = new MapRenderer(mapCanvas, tileMap);
  mapRenderer.draw();
}
run();

//Ful som fan men funkar så länge
function createParkingLot(){
  var result = [];
  var indexCounter = 0;
  for( var i = 0; i < 40; i++){
    result[i] = [];
    for( var j = 0; j < 24; j++){
      if(j%2 == 0 && j !== 0 &&i !== 0 && i !== 39){
        result[i][j] = new Tile(true, 'parking', indexCounter);
      } else {
        result[i][j] = new Tile(true, 'road', indexCounter);
      }
      indexCounter++;
      }
    }


  return result;
}


