function performRotation(shape) {
  anime({
    easing: "easeOutQuad",
    targets: shape,
    rotateY: anime.random(-60, 60),
    rotateX: anime.random(-60, 60),
    rotateZ: anime.random(0, 360),
    delay: anime.random(2500, 5000), 
    duration: anime.random(2500, 5000),
  }).finished.then(function() {
    performRotation(shape);
  })
}

function debounce(func, delay) {
	var timeout;
	return function() {
		clearTimeout(timeout);
		timeout = setTimeout(func.apply(null, arguments), delay);
	};
};

function showEmail() {
  const email = atob("Z3UgW2F0XSB1dGV4YXMuZWR1");
  document.getElementById("email-container").innerHTML = email;
}

function animateIn(element, isInitial) {
  const duration = isInitial? 0: 1000;
  const xDirection = window.innerWidth > 1000 && element.classList.contains("transition-from-right") ? 1: -1;
  
  if(element.classList.contains("header")){
    anime({
      targets: element,
      opacity: 1,
      translateY: [100, 0],
      scale: [0, 1],
      duration: duration
    })
  }else if (element.classList.contains("project-title")){
    anime({
      targets: element,
      opacity: 1,
      translateX: [xDirection * 150, 0],
      duration: duration
    })
  }else if (element.classList.contains("link-container")) {
    anime({
      targets: element,
      opacity: 1,
      translateY: [100, 0],
      duration: duration
    })
  }else if(element.classList.contains("image-container")){
    anime({
      targets: element,
      opacity: 1,
      translateX: [xDirection * 50, 0],
      duration: duration
    })
  }else if(element.tagName === "P") {
    anime({
      targets: element,
      opacity: 1,
      translateX: [xDirection * 50, 0],
      duration: duration
    })
  }else {
    anime({
      targets: element,
      opacity: 1,
      duration: duration
    })
  }
}

const THRESHOLD = 100;
function handleScroll(element, isInitial) {
  if(element.dataset.displayed) {
    return;
  }
  const scrollBottom = window.scrollY + window.innerHeight;
  const elementTop = element.offsetTop;
  if(scrollBottom - elementTop > THRESHOLD) {
    element.dataset.displayed = "true";
    animateIn(element, isInitial);
  }
}

const debouncedHandleScroll = debounce(handleScroll, 250);

function initializeScrollableElements() {
  const headers = document.querySelectorAll(".header, .project-title, .link-container, .image-container, p");
  for(let header of headers) {
    header.style.opacity = 0;
    handleScroll(header, true);
  }
  let isInitial = true;
  document.addEventListener("scroll", function() {
    for(let header of headers) {
      debouncedHandleScroll(header, isInitial);
    }
  }, {passive: true});
  setTimeout(function() {
    isInitial = false;
  }, 500);
}

(function() {
  const SHAPE_CLASSES = ["triangle", "circle", "square"];
  const shapes = [];
  const mainCallout = document.querySelector(".main-callout");
  for(let i = 0; i < 50; i++){
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
      delay: 200,
      duration: anime.random(750, 3000)
    }).finished.then(function() {
      performRotation(shape);
    })
  }
  
  initializeScrollableElements();

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