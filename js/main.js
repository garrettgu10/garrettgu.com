function performRotation(shape) {
  anime({
    easing: "easeOutQuad",
    targets: shape,
    rotateY: anime.random(-60, 60),
    rotateX: anime.random(-60, 60),
    rotateZ: anime.random(0, 360),
    duration: anime.random(2500, 7500),
  }).finished.then(function() {
    performRotation(shape);
  })
}

function showEmail() {
  const email = atob("Z3UgW2F0XSB1dGV4YXMuZWR1");
  document.getElementById("email-container").innerHTML = email;
}

(function() {
  const SHAPE_CLASSES = ["triangle", "circle", "square"];
  const shapes = [];
  const mainCallout = document.querySelector(".main-callout");
  for(let i = 0; i < 60; i++){
    shapes[i] = document.createElement("div");
    shapes[i].classList = SHAPE_CLASSES[Math.floor(Math.random() * 3)]
    mainCallout.appendChild(shapes[i]);
  }

  for(let i = 0; i < shapes.length; i++) {
    const shape = shapes[i];
    const theta = i / shapes.length * Math.PI * 2;
    const rotation = Math.random() * 360;
    const r = Math.random() * 290 + 200;
    anime({
      targets: shape,
      translateX: r * Math.cos(theta) * 1.5,
      translateY: r * Math.sin(theta),
      rotateY: anime.random(-60, 60),
      rotateX: anime.random(-60, 60),
      rotateZ: rotation,
      opacity: 1,
      duration: anime.random(750, 3000)
    }).finished.then(function() {
      performRotation(shape);
    })
  }

  anime({
    targets: ".name-letter",
    opacity: [0, 1],
    scale: [0,1],
    translateY: [100, 0],
    delay: anime.stagger(50)
  })

  anime({
    targets: ".subtitle",
    opacity: [0, 1],
    translateY: [100, 0],
    delay: 500,
  })
})()