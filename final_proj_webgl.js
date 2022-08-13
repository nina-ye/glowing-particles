/*
 * Initializing GL object
 */
var gl;
function initGL(canvas) {
  try {
    gl = canvas.getContext("experimental-webgl");
    gl.viewportWidth = canvas.width;
    gl.viewportHeight = canvas.height;
  } catch (e) {}
  if (!gl) alert("Could not initialise WebGL, sorry :-(");

  gl = WebGLDebugUtils.makeDebugContext(
    gl,
    throwOnGLError,
    validateNoneOfTheArgsAreUndefined
  );
}

/*
 * Initialize background
 */
var backgroundVertexPositions = [
  -5.0, -5.0, 0.0, 5.0, -5.0, 0.0, 5.0, 5.0, 0.0, -5.0, 5.0, 0.0,
];
var backgroundTextureCoords = [0, 0, 1, 0, 1, 1, 0, 1];
var backgroundVertexIndices = [0, 1, 2, 0, 2, 3];

var backgroundIsLoaded;
var backgroundTexture;
var backgroundAtlas;

var aBackgroundVertexPosition_buffer;
var aBackgroundTextureCoords_buffer;
var backgroundIndex_buffer;

function initBackground() {
  backgroundIsLoaded = false;
  backgroundTexture = gl.createTexture();
  backgroundAtlas = new window.Image();
  backgroundAtlas.onload = function () {
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.bindTexture(gl.TEXTURE_2D, backgroundTexture);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      backgroundAtlas
    );
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    backgroundIsLoaded = true;
  };
  backgroundAtlas.src = "sky2.jpg";
}

/*
 * Initializing object geometries
 */
var primroseP_mesh, primroseP_transforms;
function initMesh() {
  // Load object meshes
  primroseP_mesh = new OBJ.Mesh(primroseP_mesh_str);

  OBJ.initMeshBuffers(gl, primroseP_mesh);

  primroseP_transforms = [
    mat4.create(),
    mat4.create(),
    mat4.create(),
    mat4.create(),
    mat4.create(),
    mat4.create(),
    mat4.create(),
    mat4.create(),
    mat4.create(),
    mat4.create(),
    mat4.create(),
    mat4.create(),
    mat4.create(),
    mat4.create(),
    mat4.create(),
  ];

  mat4.identity(primroseP_transforms[0]);
  mat4.scale(primroseP_transforms[0], [3, 3, 3]);
  mat4.translate(primroseP_transforms[0], [-1, -0.9, -0.2]);

  mat4.identity(primroseP_transforms[1]);
  mat4.scale(primroseP_transforms[1], [2.5, 2.5, 2.5]);
  mat4.translate(primroseP_transforms[1], [-0.8, -0.8, 0.1]);

  mat4.identity(primroseP_transforms[2]);
  mat4.scale(primroseP_transforms[2], [3, 3, 3]);
  mat4.translate(primroseP_transforms[2], [-0.7, -0.7, 0.0]);

  mat4.identity(primroseP_transforms[3]);
  mat4.scale(primroseP_transforms[3], [3, 3, 3]);
  mat4.translate(primroseP_transforms[3], [-0.5, -1.0, -0.1]);

  mat4.identity(primroseP_transforms[4]);
  mat4.scale(primroseP_transforms[4], [3, 3, 3]);
  mat4.translate(primroseP_transforms[4], [-0.1, -0.7, -0.1]);

  mat4.identity(primroseP_transforms[5]);
  mat4.scale(primroseP_transforms[5], [2.8, 2.8, 2.8]);
  mat4.translate(primroseP_transforms[5], [0.1, -0.4, 0.3]);

  mat4.identity(primroseP_transforms[6]);
  mat4.scale(primroseP_transforms[6], [3, 3, 3]);
  mat4.translate(primroseP_transforms[6], [0.5, -0.6, 0.2]);

  mat4.identity(primroseP_transforms[7]);
  mat4.scale(primroseP_transforms[7], [2.5, 2.5, 2.5]);
  mat4.translate(primroseP_transforms[7], [0.8, -0.9, 0.1]);

  mat4.identity(primroseP_transforms[8]);
  mat4.scale(primroseP_transforms[8], [3.2, 3.2, 3.2]);
  mat4.translate(primroseP_transforms[8], [0.9, -0.3, 0.3]);

  mat4.identity(primroseP_transforms[9]);
  mat4.scale(primroseP_transforms[9], [3, 3, 3]);
  mat4.translate(primroseP_transforms[9], [1, -0.9, -0.3]);

  mat4.identity(primroseP_transforms[10]);
  mat4.scale(primroseP_transforms[10], [2.5, 2.5, 2.5]);
  mat4.translate(primroseP_transforms[10], [0.8, -0.8, 0.0]);

  mat4.identity(primroseP_transforms[11]);
  mat4.scale(primroseP_transforms[11], [3, 3, 3]);
  mat4.translate(primroseP_transforms[11], [0.5, -1.0, -0.2]);

  mat4.identity(primroseP_transforms[12]);
  mat4.scale(primroseP_transforms[12], [3.2, 3.2, 3.2]);
  mat4.translate(primroseP_transforms[12], [0.7, -0.8, 0.2]);

  mat4.identity(primroseP_transforms[13]);
  mat4.scale(primroseP_transforms[13], [3, 3, 3]);
  mat4.translate(primroseP_transforms[13], [-0.5, -0.6, 0.1]);

  mat4.identity(primroseP_transforms[14]);
  mat4.scale(primroseP_transforms[14], [2.5, 2.5, 2.5]);
  mat4.translate(primroseP_transforms[14], [-0.8, -0.9, 0.0]);
}

/*
 * Initialize texture
 */
var imageIsLoaded;
var particleTexture;
var particleAtlas;
function initTexture() {
  imageIsLoaded = false;
  particleTexture = gl.createTexture();
  particleAtlas = new window.Image();
  particleAtlas.onload = function () {
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.bindTexture(gl.TEXTURE_2D, particleTexture);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      particleAtlas
    );
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    imageIsLoaded = true;
  };
  particleAtlas.src = "circle.png";
}

/*
 * Initialize particle parameters
 */
var vertexPositions = [];
var particlePositions = [];
var textureCoords = [];
var triCorners = [];
var vertexIndices = [];
var velocities = [];
var lifetimes = [];

var aVertexPosition_buffer;
var aTextureCoords_buffer;
var aTriCorner_buffer;
var index_buffer;
var aLifetime_buffer;

var numParticles = 50;
var particleColor = [1.0, 0.898, 0.6];
var particleSpeed = 1.0;
var particleSize = 0.5;
var triCornersCycle = [
  -1.0, -1.0, 0.0, 1.0, -1.0, 0.0, 1.0, 1.0, 0.0, -1.0, 1.0, 0.0,
];
var textureCoordsCycle = [0, 0, 1, 0, 1, 1, 0, 1];

function initParticles() {
  for (var i = 0; i < numParticles; i++) {
    // lifetimes
    var lifetime = 10 * Math.random() + 10;

    // offsets
    // displace x between 0 to 10 units from the center
    var xStartOffset = 6 * Math.random() - 3;
    // displace y -1.5 unit below the center
    var yStartOffset = -1.0;
    // displace z between 0 to 0.5 units from the center
    var zStartOffset = -3 + (6.0 / numParticles) * i;

    // velocities
    var upVelocity = 0.5 * Math.random() + 0.1;
    var xSideVelocity = 0.06 * Math.random() - 0.03;
    var zSideVelocity = 0.0;

    // offsets
    vertexPositions.push(xStartOffset);
    vertexPositions.push(yStartOffset);
    vertexPositions.push(zStartOffset);

    // velocities
    velocities.push(xSideVelocity);
    velocities.push(upVelocity);
    velocities.push(zSideVelocity);

    for (var j = 0; j < 4; j++) {
      // lifetimes
      lifetimes.push(lifetime);

      // triCorners
      triCorners.push(triCornersCycle[j * 3]);
      triCorners.push(triCornersCycle[j * 3 + 1]);

      textureCoords.push(textureCoordsCycle[j * 2]);
      textureCoords.push(textureCoordsCycle[j * 2 + 1]);
    }

    vertexIndices = vertexIndices.concat(
      [0, 1, 2, 0, 2, 3].map(function (num) {
        return num + 4 * i;
      })
    );
  }
}

/*
 * calculate Particle Positions
 */
function calculateParticlePositions() {
  particlePositions = [];
  lightPos = [];

  for (var i = 0; i < numParticles; i++) {
    var position = [
      vertexPositions[i * 3],
      vertexPositions[i * 3 + 1],
      vertexPositions[i * 3 + 2],
    ];
    var velocity = [
      velocities[i * 3],
      velocities[i * 3 + 1],
      velocities[i * 3 + 2],
    ];
    var calculatedPos = [];

    var time = clockTime % (lifetimes[i * 4] / particleSpeed);
    vec3.scale(velocity, time * particleSpeed, calculatedPos);
    vec3.add(calculatedPos, position, calculatedPos);

    mat4.multiplyVec3(lightMatrix, calculatedPos);
    lightPos.push(calculatedPos[0]);
    lightPos.push(calculatedPos[1]);
    lightPos.push(calculatedPos[2]);

    for (var j = 0; j < 4; j++) {
      particlePositions.push(calculatedPos[0]);
      particlePositions.push(calculatedPos[1]);
      particlePositions.push(calculatedPos[2]);
    }
  }
}

/*
 * Initializing shaders
 */
var shaderProgram; // shader for objects
function createShader(vs_id, fs_id) {
  var shaderProg = createShaderProg(vs_id, fs_id);

  // Enable all vertex attributes
  shaderProg.vertexPositionAttribute = gl.getAttribLocation(
    shaderProg,
    "aVertexPosition"
  );
  shaderProg.vertexNormalAttribute = gl.getAttribLocation(
    shaderProg,
    "aVertexNormal"
  );

  // Uniforms
  shaderProg.pMatrixUniform = gl.getUniformLocation(shaderProg, "uPMatrix");
  shaderProg.mvMatrixUniform = gl.getUniformLocation(shaderProg, "uMVMatrix");
  shaderProg.nMatrixUniform = gl.getUniformLocation(shaderProg, "uNMatrix");
  shaderProg.lightPosUniform = gl.getUniformLocation(shaderProg, "uLightPos");
  shaderProg.colorUniform = gl.getUniformLocation(shaderProg, "specularColor");

  return shaderProg;
}

var particleProgram; // shader for particles
function createParticle(vs_id, fs_id) {
  var particleProg = createShaderProg(vs_id, fs_id);

  // Enable all vertex attributes
  particleProg.vertexPositionAttribute = gl.getAttribLocation(
    particleProg,
    "aVertexPosition"
  );
  particleProg.textureCoordsAttribute = gl.getAttribLocation(
    particleProg,
    "aTextureCoords"
  );
  particleProg.triCornerAttribute = gl.getAttribLocation(
    particleProg,
    "aTriCorner"
  );
  particleProg.lifetimeAttribute = gl.getAttribLocation(
    particleProg,
    "aLifetime"
  );

  // Uniforms
  particleProg.pMatrixUniform = gl.getUniformLocation(particleProg, "uPMatrix");
  particleProg.mvMatrixUniform = gl.getUniformLocation(
    particleProg,
    "uMVMatrix"
  );
  particleProg.timeUniform = gl.getUniformLocation(particleProg, "uTime");
  particleProg.colorUniform = gl.getUniformLocation(particleProg, "uColor");
  particleProg.sizeUniform = gl.getUniformLocation(particleProg, "uSize");
  particleProg.speedUniform = gl.getUniformLocation(particleProg, "uSpeed");
  particleProg.particleAtlasUniform = gl.getUniformLocation(
    particleProg,
    "particleAtlas"
  );

  return particleProg;
}

var backgroundProgram;
function createBackground(vs_id, fs_id) {
  var backgroundProg = createShaderProg(vs_id, fs_id);

  // vertex attributes
  backgroundProg.vertexPositionAttribute = gl.getAttribLocation(
    backgroundProg,
    "aVertexPosition"
  );
  backgroundProg.textureCoordsAttribute = gl.getAttribLocation(
    backgroundProg,
    "aTextureCoords"
  );

  // uniforms
  backgroundProg.pMatrixUniform = gl.getUniformLocation(
    backgroundProg,
    "uPMatrix"
  );
  backgroundProg.mvMatrixUniform = gl.getUniformLocation(
    backgroundProg,
    "uMVMatrix"
  );
  backgroundProg.textureUniform = gl.getUniformLocation(
    backgroundProg,
    "uTexture"
  );

  return backgroundProg;
}

function initShaders() {
  particleProgram = createParticle("particle-vs", "particle-fs");
  shaderProgram = createShader("shader-vs", "shader-fs");
  backgroundProgram = createBackground("background-vs", "background-fs");
}

/*
 * Main rendering code
 */
// Basic rendering parameters
var mvMatrix = mat4.create(); // Model-view matrix for the main object
var pMatrix = mat4.create(); // Projection matrix

// Lighting control
var lightMatrix = mat4.create(); // Model-view matrix for the point light source
var lightPos = [];

/*
 * Set Uniforms for shaders
 */
function setShaderUniforms(prog) {
  gl.uniformMatrix4fv(prog.pMatrixUniform, false, pMatrix);
  gl.uniformMatrix4fv(prog.mvMatrixUniform, false, mvMatrix);

  var nMatrix = mat4.transpose(mat4.inverse(mvMatrix));
  gl.uniformMatrix4fv(prog.nMatrixUniform, false, nMatrix);

  gl.uniform3fv(prog.lightPosUniform, lightPos);
  gl.uniform3fv(prog.colorUniform, particleColor);
}

function setParticleUniforms(prog) {
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.ONE, gl.ONE);

  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, particleTexture);
  gl.uniform1i(prog.particleAtlasUniform, 0);

  gl.uniformMatrix4fv(prog.pMatrixUniform, false, pMatrix);
  gl.uniformMatrix4fv(prog.mvMatrixUniform, false, mvMatrix);
  gl.uniform1f(prog.timeUniform, clockTime);
  gl.uniform1f(prog.sizeUniform, particleSize);
  gl.uniform1f(prog.speedUniform, particleSpeed);
  gl.uniform3fv(prog.colorUniform, particleColor);
}

function setBackgroundUniforms(prog) {
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.ONE, gl.ONE);

  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, backgroundTexture);
  gl.uniform1i(prog.textureUniform, 0);

  gl.uniformMatrix4fv(prog.pMatrixUniform, false, pMatrix);
  gl.uniformMatrix4fv(prog.mvMatrixUniform, false, mvMatrix);
}

/*
 * Draw scene
 */
function drawScene() {
  gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  mat4.perspective(
    35,
    gl.viewportWidth / gl.viewportHeight,
    0.1,
    1000.0,
    pMatrix
  );

  if (backgroundIsLoaded) {
    drawBackground();
  }
  drawObjects();
  if (imageIsLoaded) {
    drawParticles();
  }
}

function drawBackground() {
  gl.useProgram(backgroundProgram);

  gl.enableVertexAttribArray(backgroundProgram.vertexPositionAttribute);
  gl.enableVertexAttribArray(backgroundProgram.textureCoordsAttribute);

  mat4.identity(mvMatrix);
  mat4.translate(mvMatrix, [0.0, 0.0, -10.0]);

  aBackgroundVertexPosition_buffer = gl.createBuffer();
  aBackgroundTextureCoords_buffer = gl.createBuffer();
  backgroundIndex_buffer = gl.createBuffer();

  setBackgroundUniforms(backgroundProgram);

  gl.bindBuffer(gl.ARRAY_BUFFER, aBackgroundVertexPosition_buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(backgroundVertexPositions),
    gl.STATIC_DRAW
  );
  gl.vertexAttribPointer(
    backgroundProgram.vertexPositionAttribute,
    3,
    gl.FLOAT,
    false,
    0,
    0
  );

  gl.bindBuffer(gl.ARRAY_BUFFER, aBackgroundTextureCoords_buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(backgroundTextureCoords),
    gl.STATIC_DRAW
  );
  gl.vertexAttribPointer(
    backgroundProgram.textureCoordsAttribute,
    2,
    gl.FLOAT,
    false,
    0,
    0
  );

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, backgroundIndex_buffer);
  gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array(backgroundVertexIndices),
    gl.STATIC_DRAW
  );

  gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);

  gl.disableVertexAttribArray(backgroundProgram.vertexPositionAttribute);
  gl.disableVertexAttribArray(backgroundProgram.textureCoordsAttribute);

  gl.disable(gl.BLEND);
}

function drawParticles() {
  gl.useProgram(particleProgram);

  gl.enableVertexAttribArray(particleProgram.vertexPositionAttribute);
  gl.enableVertexAttribArray(particleProgram.textureCoordsAttribute);
  gl.enableVertexAttribArray(particleProgram.triCornerAttribute);
  gl.enableVertexAttribArray(particleProgram.lifetimeAttribute);

  mat4.identity(mvMatrix);

  // bind buffers
  aVertexPosition_buffer = gl.createBuffer();
  aTextureCoords_buffer = gl.createBuffer();
  aTriCorner_buffer = gl.createBuffer();
  aLifetime_buffer = gl.createBuffer();
  index_buffer = gl.createBuffer();

  setParticleUniforms(particleProgram);

  gl.bindBuffer(gl.ARRAY_BUFFER, aVertexPosition_buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(particlePositions),
    gl.STATIC_DRAW
  );
  gl.vertexAttribPointer(
    particleProgram.vertexPositionAttribute,
    3,
    gl.FLOAT,
    false,
    0,
    0
  );

  gl.bindBuffer(gl.ARRAY_BUFFER, aTextureCoords_buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(textureCoords),
    gl.STATIC_DRAW
  );
  gl.vertexAttribPointer(
    particleProgram.textureCoordsAttribute,
    2,
    gl.FLOAT,
    false,
    0,
    0
  );

  gl.bindBuffer(gl.ARRAY_BUFFER, aTriCorner_buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triCorners), gl.STATIC_DRAW);
  gl.vertexAttribPointer(
    particleProgram.triCornerAttribute,
    2,
    gl.FLOAT,
    false,
    0,
    0
  );

  gl.bindBuffer(gl.ARRAY_BUFFER, aLifetime_buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(lifetimes), gl.STATIC_DRAW);
  gl.vertexAttribPointer(
    particleProgram.lifetimeAttribute,
    1,
    gl.FLOAT,
    false,
    0,
    0
  );

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);
  gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array(vertexIndices),
    gl.STATIC_DRAW
  );

  gl.drawElements(gl.TRIANGLES, vertexIndices.length, gl.UNSIGNED_SHORT, 0);

  gl.disableVertexAttribArray(particleProgram.vertexPositionAttribute);
  gl.disableVertexAttribArray(particleProgram.textureCoordsAttribute);
  gl.disableVertexAttribArray(particleProgram.triCornerAttribute);
  gl.disableVertexAttribArray(particleProgram.lifetimeAttribute);

  gl.disable(gl.BLEND);
}

function drawObjects() {
  mat4.identity(lightMatrix);
  mat4.translate(lightMatrix, [0.0, -2.0, -7.0]);

  calculateParticlePositions();

  gl.useProgram(shaderProgram);

  gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
  gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);

  var currentMesh, currentTransform;

  // primroseP_mesh
  currentMesh = primroseP_mesh;
  for (var i = 0; i < primroseP_transforms.length; i++) {
    currentTransform = primroseP_transforms[i];

    mat4.identity(mvMatrix);
    mat4.translate(mvMatrix, [0.0, -1.0, -7.0]);
    mat4.rotateX(mvMatrix, 0.3);
    mat4.multiply(mvMatrix, currentTransform);

    setShaderUniforms(shaderProgram);

    // attribute buffers
    gl.bindBuffer(gl.ARRAY_BUFFER, currentMesh.vertexBuffer);
    gl.vertexAttribPointer(
      shaderProgram.vertexPositionAttribute,
      currentMesh.vertexBuffer.itemSize,
      gl.FLOAT,
      false,
      0,
      0
    );

    gl.bindBuffer(gl.ARRAY_BUFFER, currentMesh.normalBuffer);
    gl.vertexAttribPointer(
      shaderProgram.vertexNormalAttribute,
      currentMesh.normalBuffer.itemSize,
      gl.FLOAT,
      false,
      0,
      0
    );

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, currentMesh.indexBuffer);
    gl.drawElements(
      gl.TRIANGLES,
      currentMesh.indexBuffer.numItems,
      gl.UNSIGNED_SHORT,
      0
    );
  }

  gl.disableVertexAttribArray(shaderProgram.vertexPositionAttribute);
  gl.disableVertexAttribArray(shaderProgram.vertexNormalAttribute);
}

var lastTime = 0;
var animated = true;
function tick() {
  requestAnimationFrame(tick);

  var timeNow = new Date().getTime();

  if (lastTime != 0) {
    var elapsed = timeNow - lastTime;
    var currentTime = new Date().getTime();
    if (animated) {
      clockTime += (currentTime - previousTime) / 1000;
      drawScene();
    } else {
      drawScene();
    }
    previousTime = currentTime;
  }
  lastTime = timeNow;
}

/*
 * Start Program
 */
var previousTime;
var clockTime;
function webGLStart() {
  var canvas = $("#canvas0")[0];

  initGL(canvas);
  initMesh();
  initShaders();
  initBackground();
  initTexture();
  initParticles();

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.enable(gl.DEPTH_TEST);

  previousTime = new Date().getTime();
  clockTime = 10;

  tick();
}
