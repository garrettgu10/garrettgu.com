var local = false;

function log() {
  if(local) return;
  var req = new XMLHttpRequest();
  var secret = "kel`etgmlb4`435Eegbte"
    .split('')
    .map(
      function(c) { return String.fromCharCode(c.charCodeAt(0)-1); }
    )
    .join(''); //encrypted to deter crawlers
  req.open("GET", "http://tamscso.ga/secret/"+secret+"/index.php");
  req.addEventListener("load", function() {
    console.log(this.responseText);
  })
  req.send();
}

function validNode(node) {
  if(node.nodeType === 1 && node.id !== "timer" && node.innerHTML.trim().length){
    //is element node and nonempty
    //check if in bounds
    var offset = $(node).offset();
    if(offset.left < window.innerWidth && offset.top < window.innerHeight)
      return true;
  }
  return false;
}

function attachOffsetsToData(node){
  for(var i = 0; i < node.childNodes.length; i++){
    var child = node.childNodes[i];

    if(child.nodeType === 1)
      child.dataset.offset = JSON.stringify($(child).offset());
    
    attachOffsetsToData(child);
  }
}

function fixNodes(node) {
  for(var i = 0; i < node.childNodes.length; i++) {
    var child = $(node.childNodes[i]);

    if(child[0].dataset && child[0].dataset.offset){
      var offset = JSON.parse(child[0].dataset.offset);
      child.css({position: 'fixed'})
      
      child.offset(offset);
    }

    fixNodes(node.childNodes[i]);
  }
}

function freeze(){
  attachOffsetsToData(document.body);
  fixNodes(document.body);
}

function getAttackers(node) {
  var result = [];
  for(var child of node.childNodes) {
    if(child.childNodes.length){
      result = result.concat(getAttackers(child));
    }else if(child.nodeType === 3){ //textnode
      var newNode = document.createElement("span");
      newNode.appendChild(document.createTextNode(child.textContent));
      node.replaceChild(newNode, child);

      var words = newNode.innerHTML.trim().split(' ');
      words = words.map(function(word) {
        return '<span>'+word+'</span>';
      });
      newNode.innerHTML = words.join(' ');

      var newChildren = [].slice.call(newNode.childNodes).filter(validNode);
      result = result.concat(newChildren);
    }
  }
  return result;
}

function lose() {
  var endTime = new Date().getTime();
  alert("you lasted "+ ((endTime-beginTime)/1000)+ " seconds.");
  location.reload();
}

function activate(attacker) {
  attacker.className += ' active';
  setInterval(move, 1000*Math.random()+1500, $(attacker));
  attacker.onmouseover = lose;
}

function move(attacker){
  if(Math.random() < 0.5){
    var offset = {
      left: window.mousePos.left - attacker.width()/2,
      top: window.mousePos.top - attacker.height()/2
    }
  }else{
    var offset={
      left: window.innerWidth*Math.random(),
      top: window.innerHeight*Math.random()
    }
  }
  
  attacker.offset(offset);
}

function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
  }
}

function updateTimer(timerNode) {
  var currentTime = new Date().getTime();
  timerNode.innerHTML = (Math.round((currentTime-beginTime)/100)/10).toFixed(1);
}

function init() {
  window.beginTime = new Date().getTime();
  $('button').replaceWith("<div>Keep your mouse away from the red words!<br>You have lasted&nbsp;<span id=\"timer\">0&nbsp;&nbsp;&nbsp;&nbsp;</span> seconds so far.</div>");
  $(document.body).css('border-color', 'red');

  setInterval(updateTimer, 100, $('#timer')[0]);

  var attackers = getAttackers(document.body);
  freeze();
  shuffle(attackers);
  attackers.unshift($('#timer')[0]);
  for(var i = 0; i < attackers.length; i++) {
    var attacker = attackers[i];
    
    setTimeout(activate, 1000+25*i*i, attacker);
  }
  $(document,window,'html').mouseleave(lose);
}

$(document).mousemove(function(e) {
  window.mousePos = {left: e.pageX, top: e.pageY};
})