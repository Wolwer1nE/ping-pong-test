;(function() {

  const canvas = document.getElementById("cnvs");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const platform = {
    width: 400,
    height: 50,
  };
  const gameState = {
    redSqure: {
      x: 100,
      y: canvas.height - platform.height/2,
      width: platform.width,
      height: platform.height
    },
    pointer: {
      x: 0,
      y: 0,
    },
    ball:{
      x:canvas.width/2,
      y:0,
      radius: 25,
      vx:0,
      vy:5
    },
  tickLength: 50
  };

  canvas.addEventListener('mousemove', onMouseMove, false);
  canvas.addEventListener("click", onMouseClick, false);

  function onMouseMove(e) {
    gameState.pointer.x = e.pageX;
    gameState.pointer.y = e.pageY
  }

  function onMouseClick(e) {
    window.cancelAnimationFrame( gameState.stopCycle );
  }
  function queueUpdates( numTicks ) {
    for(let i=0; i < numTicks; i++) {
      gameState.lastTick = gameState.lastTick + gameState.tickLength;
      update( gameState.lastTick );
    }
  }
  function draw(tFrame) {
    const context = canvas.getContext('2d');

    // clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    const {x, y, width, height} = gameState.redSqure;

    context.beginPath();
    context.rect(x - width/ 2, y - height/2, width, height);
    context.fillStyle = "#FF0000";
    context.fill();
    context.closePath();

    const ball = gameState.ball;

    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, 2*Math.PI);
    context.fillStyle = "#0000FF";
    context.fill();
    context.closePath();

  }
  function update(tick) {
    const vx = (gameState.pointer.x - gameState.redSqure.x) / 10;
    gameState.redSqure.x += vx;
    gameState.ball.y += gameState.ball.vy;
    gameState.ball.y += gameState.ball.vx;

    if (gameState.ball.y >= canvas.height)
    {
      gameState.ball.vy = -10;
      gameState.ball.y += gameState.ball.vx
    }
    else if  (gameState.ball.y <= 0)
    {
      gameState.ball.vy =  10
    }
  }

  function run(tFrame) {
    gameState.stopCycle = window.requestAnimationFrame( run );

    const nextTick = gameState.lastTick + gameState.tickLength;
    let numTicks = 0;

    if (tFrame > nextTick) {
      const timeSinceTick = tFrame - gameState.lastTick;
      numTicks = Math.floor( timeSinceTick / gameState.tickLength );
    }
    queueUpdates( numTicks );
    draw( tFrame );
    gameState.lastRender = tFrame;
  }

  function setup() {
    gameState.lastTick = performance.now();
    gameState.lastRender = gameState.lastTick;
  }

  setup();
  run();
})();







