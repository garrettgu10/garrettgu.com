var local = true;

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
  if(node.nodeType === 1 && node.innerHTML.trim().length){
    //is element node and nonempty
    //check if in bounds
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

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function init() {
  $('button').remove();

  var attackers = getAttackers(document.body);
  freeze();
  for(var i = 0; i < attackers.length; i++) {
    var attacker = attackers[i];
    
    attacker.style.color = getRandomColor();
  }
}