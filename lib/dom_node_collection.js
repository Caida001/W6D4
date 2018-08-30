class DOMNodeCollection {
  constructor(elementsArr) {
    this.elementsArr = elementsArr;
  }

  html(arg) {
    if(typeof arg === 'string') {
      for (var i = 0; i < this.elementsArr.length; i++) {
        // debugger
        this.elementsArr[i].innerHTML = arg;
      }
    } else {
      return this.elementsArr[0].innerHTML;
    }
  }

  empty(){
    // for (var i = 0; i < this.elementsArr.length; i++) {
    //   this.elementsArr[i].html = "";
    // }
    this.html("");
  }

  append(children){
    if (this.elementsArr.length == 0) return;
    // debugger

    if(typeof children == 'object' && !(children instanceof DOMNodeCollection)){
      children = $l(children);
    }

    if (typeof children === "string") {
      this.elementsArr.forEach((el) => {
        el.innerHTML += children;
      });
    } else if (children instanceof DOMNodeCollection) {
      this.elementsArr.forEach( (el) => {
        children.forEach( (childNode) => {
          el.appendChild(childNode.cloneNode(true));
        });
      });
    }
  }

  removeClass(classToRemove){
    this.elementsArr.forEach( el => el.classList.remove(classToRemove));
  }

  attr(key, val) {
    if(typeof val === 'string'){
      this.elementsArr.forEach( el => el.setAttribute(key, val));
    } else {
      return this.elementsArr[0].getAttribute(key);
    }
  }

  addClass(newClass) {
    if(typeof newClass === 'function'){
      this.elementsArr.forEach(el => el.classList.add(newClass()));
    } else {
      this.elementsArr.forEach(el => el.classList.add(newClass));
    }
  }

  children() {
    let arr = [];
    this.elementsArr.forEach( (el) => {
      const childrenList = el.children;
      arr = arr.concat(Array.from(childrenList));
    });
    return new DOMNodeCollection(arr);
  }

  parent(){
    let parentArr = [];
    this.elementsArr.forEach( (el) => {
      if(!el.visited) {
        parentArr.push(el);
        el.visted = true;
      }
    });

    parentArr.forEach( (el) => {
      el.visited = false;
    });
    return new DOMNodeCollection(parentArr);
  }

  find(selector){
    let arr = [];
    this.elementsArr.forEach((el) => {
      const list = el.querySelectorAll(selector);
      arr = arr.concat(Array.from(list));
    });
    return new DOMNodeCollection(arr);
  }

  remove() {
    this.elementsArr.forEach( el => el.parentNode.removeChild(el));
  }

  on(eventName, cb){
    this.elementsArr.forEach( (el) => {
      el.addEventListener(eventName, cb);
      const key = `jqliteEvents-${eventName}`;

      if(typeof el[key] === "undefined"){
        el[key] = [];
      }
      el[key].push(cb);
    });
  }

  off(eventName){
    this.elementsArr.forEach( (el) => {
      const key = `jqliteEvents-${eventName}`;
      if(el[key]){
        el[key].forEach( (cb) => {
          el.removeEventListener(eventName, cb);
        });
      }
      el[key] = [];
    });
  }
}

module.exports = DOMNodeCollection;
