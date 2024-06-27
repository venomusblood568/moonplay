var items = []
  , point = document.querySelector('svg').createSVGPoint();

function getCoordinates(e, svg) {
  point.x = e.clientX;
  point.y = e.clientY;
  return point.matrixTransform(svg.getScreenCTM().inverse());
}

function changeColor(e) {
  document.body.className = e.currentTarget.className;
}

function Item(config) {
  Object.keys(config).forEach(function (item) {
    this[item] = config[item];
  }, this);
  this.el.addEventListener('mousemove', this.mouseMoveHandler.bind(this));
  this.el.addEventListener('touchmove', this.touchMoveHandler.bind(this));
}

Item.prototype = {
  update: function update(c) {
    this.clip.setAttribute('cx', c.x);
    this.clip.setAttribute('cy', c.y);
  },
  mouseMoveHandler: function mouseMoveHandler(e) {
    this.update(getCoordinates(e, this.svg));
  },
  touchMoveHandler: function touchMoveHandler(e) {
    e.preventDefault();
    var touch = e.targetTouches[0];
    if (touch) return this.update(getCoordinates(touch, this.svg));
  }
};

[].slice.call(document.querySelectorAll('.item'), 0).forEach(function (item, index) {
  items.push(new Item({
    el: item,
    svg: item.querySelector('svg'),
    clip: document.querySelector('#clip-'+index+' circle'),
  }));
});

[].slice.call(document.querySelectorAll('button'), 0).forEach(function (button) {
  button.addEventListener('click', changeColor);
});

//loading screen js part 

// Replace this URL with the image URL you want to fetch
const imageUrl = "https://i.pinimg.com/originals/7a/c0/b9/7ac0b96856333b70ecadc4cff902a5b7.gif";

// Get a reference to the image element
const imageElement = document.getElementById("loading-image");

// Set the image source to the specified URL
imageElement.src = imageUrl;

// JavaScript to hide the loading screen after 6 seconds (approx) because that's the total length of the gif
window.onload = function () {
  setTimeout(function () {
    document.querySelector('.loading-container').style.display = 'none';
    document.querySelector('.content').style.display = 'block';
    // Create and append the "Begin" button
    const beginButton = document.createElement("button");
    beginButton.className = "start-button";
    beginButton.textContent = "Load the project's";
    beginButton.onclick = beginAnimation;
    document.body.appendChild(beginButton);
  }, 3000); 
};
