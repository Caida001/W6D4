const DomNodeCollection = require('./dom_node_collection.js');

window.$l = function(arg){
  // debugger
  if(typeof arg === 'string') {
    return new DomNodeCollection(getNodesFromDom(arg));
  } else if (arg instanceof HTMLElement) {
    return new DomNodeCollection([arg]);
  } else if (arg instanceof Function) {
    document.addEventListener("DOMContentLoaded", function() {
      alert("DOM fully loaded and parsed");
      arg();
    });
  }
};

function getNodesFromDom(arg){
  const nodes = document.querySelectorAll(arg);
  const nodesArr = Array.from(nodes);
  return nodesArr;
}

$l.extend = (base, ...objs) => {
  objs.forEach( (obj) => {
    for (const prop in obj){
      base[prop] = obj[prop];
    }
  });
  return base;
};
