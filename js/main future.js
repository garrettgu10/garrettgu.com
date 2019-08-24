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

function getAnimation(element) {
  const duration = 1000;
  const xDirection = window.innerWidth > 1000 && element.classList.contains("transition-from-right") ? 1: -1;
  
  if(element.classList.contains("header")){
    return anime({
      targets: element,
      opacity: [0, 1],
      translateY: [100, 0],
      scale: [0, 1],
      duration: duration,
      autoplay: false,
    })
  }else if (element.classList.contains("project-title")){
    return anime({
      targets: element,
      opacity: [0, 1],
      translateX: [xDirection * 150, 0],
      duration: duration,
      autoplay: false,
    })
  }else if (element.classList.contains("link-container")) {
    return anime({
      targets: element,
      opacity: [0, 1],
      translateY: [100, 0],
      duration: duration,
      autoplay: false,
    })
  }else if(element.classList.contains("image-container")){
    return anime({
      targets: element,
      opacity: [0, 1],
      translateX: [xDirection * 50, 0],
      duration: duration,
      autoplay: false,
    })
  }else if(element.tagName === "P") {
    return anime({
      targets: element,
      opacity: [0, 1],
      translateX: [xDirection * 50, 0],
      duration: duration,
      autoplay: false,
    })
  }else {
    return anime({
      targets: element,
      opacity: [0, 1],
      duration: duration,
      autoplay: false,
    })
  }
}

const animations = [];
const START_DIST = 100;
const ANIMATION_DIST = 500;
function handleScroll(element) {
  const scrollBottom = window.scrollY + window.innerHeight;
  const elementTop = element.offsetTop;
  const scrollFraction = Math.max(0, Math.min(1, (scrollBottom - elementTop - START_DIST) / ANIMATION_DIST));
  const animation = animations[parseInt(element.dataset.index)];
  animation.seek(scrollFraction * 1000);
}

const debouncedHandleScroll = debounce(handleScroll, 250);

function initializeScrollableElements() {
  const headers = document.querySelectorAll(".header, .project-title, .link-container, .image-container, p");
  for(let i = 0; i < headers.length; i++) {
    const header = headers[i];
    animations[i] = getAnimation(header);
    animations[i].seek(0);
    header.dataset.index = i;
    handleScroll(header);
  }
  let isInitial = true;
  document.addEventListener("scroll", function() {
    for(let header of headers) {
      debouncedHandleScroll(header, isInitial);
    }
  }, {passive: true});
  window.addEventListener("resize", function() {
    for(let header of headers) {
      debouncedHandleScroll(header, isInitial);
    }
  }, {passive: true});
  setTimeout(function() {
    isInitial = false;
  }, 500);
}

function isMobile() {
  return window.innerWidth < 700;
}

(function() {
  const SHAPE_CLASSES = ["triangle", "circle", "square"];
  const shapes = [];
  const mainCallout = document.querySelector(".main-callout");
  let renderedMobile = isMobile();
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
    const multiplier = isMobile()? 0.66: 1;
    const x = r * Math.cos(theta) * 1.5 * multiplier;
    const y = r * Math.sin(theta) * multiplier;
    shape.dataset.x = x;
    shape.dataset.y = y;
    anime({
      targets: shape,
      translateX: x,
      translateY: y,
      rotateY: anime.random(-60, 60),
      rotateX: anime.random(-60, 60),
      rotateZ: rotation,
      opacity: 1,
      delay: 200,
      duration: anime.random(750, 3000)
    })/*.finished.then(function() {
      performRotation(shape);
    })*/
  }
  
  initializeScrollableElements();
  
  window.addEventListener("resize", function() {
    if(isMobile() !== renderedMobile) {
      renderedMobile = isMobile();
      const multiplier = isMobile()? 0.66: 1/0.66;
      anime({
        targets: shapes,
        translateX: function(shape) {
          const x = parseFloat(shape.dataset.x) * multiplier
          shape.dataset.x = x;
          return x;
        },
        translateY: function(shape) {
          const y = parseFloat(shape.dataset.y) * multiplier
          shape.dataset.y = y;
          return y;
        },
      })
    }
  })

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