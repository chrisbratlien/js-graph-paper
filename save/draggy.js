var Point = function(specX,specY) {
  //private
  var x = specX || 0;
  var y = specY || 0;

  //interface
  var that = {};
  that.x = function() { return x; };
  that.y = function() { return y; };
  return that;
};

var Draggy = function(elem,spec) {

  //////console.log('The element',elem);
  
  elem.draggable = true; //assignment


  //privates
  var lastPoint = Point(0,0);
  var onUpdate = spec.onUpdate || function() {};


  //interface
  var that = {};
  that.whereAmI = function() {
    return Point(parseInt(elem.style.left,10),parseInt(elem.style.top,10));
  };
  that.nowBeHere = function(newPoint) {
    var where = that.whereAmI();
    console.log('where',where.x(),where.y(),'newPoint',newPoint.x(),newPoint.y());
    that.updateElementPoint(Point(where.x() + (newPoint.x() - lastPoint.x()),where.y() + (newPoint.y() - lastPoint.y())));
    lastPoint = newPoint;
  };
  that.updateElementPoint = function(aPoint) { //assignment
    console.log('nbh',aPoint.x(),aPoint.y());


    elem.style.left = aPoint.x() + 'px';
    elem.style.top = aPoint.y() + 'px';
    
    onUpdate(aPoint); //private onUpdate callback, must be sent in constructor spec
  };
  
  //mouse
  that.pointOfMouseEvent = function(event) {
  	if (event == null) { event = window.event; } //IE7
	   return Point(event.clientX,event.clientY);
  };
  that.handleMouseDown = function(event){
    console.log('mousedown');
  	if (elem.style.top == '' || elem.style.top == '') {
  	 that.updateElementPoint(Point(0,0));
  	} 
    lastPoint = that.pointOfMouseEvent(event);
    document.onmousemove = that.handleMouseMove;    
    document.onmouseup = that.handleMouseUp;    
    return false;
  };
  that.handleMouseMove = function(event) {
    console.log('mousemove');
    that.nowBeHere(that.pointOfMouseEvent(event));
  	 return false;
  };
  that.handleMouseUp = function(event) {
    that.nowBeHere(that.pointOfMouseEvent(event));
    document.onmousemove = null;
    document.onmouseup = null;
	 return false;
  };
  
  //touch
  that.pointOfTouchEvent = function(event) {
  	if (event == null) { event = window.event; } //IE7
    if (typeof event.targetTouches == "undefined") {
      event = event.originalEvent; 
    }  	
  	var touch = event.targetTouches[0];
  	return Point(touch.pageX,touch.pageY);
  };
  that.handleTouchStart = function(event){
    ////console.log('touchstart');
  	if (elem.style.top == '' || elem.style.top == '') {
  	 that.updateElementPoint(Point(0,0));
  	} 
    lastPoint = that.pointOfTouchEvent(event);
    document.ontouchmove = that.handleTouchMove;    
    document.ontouchend = that.handleTouchEnd;    
    return false;
  };
  that.handleTouchMove = function(event) {
    //console.log('touchmove');
    that.nowBeHere(that.pointOfTouchEvent(event));
  	 return false;
  };
  that.handleTouchEnd = function(event) {
    document.ontouchmove = null;
    document.ontouchend = null;
    that.nowBeHere(that.pointOfTouchEvent(event));
	 return false;
  };
  
  elem.onmousedown = that.handleMouseDown;  //assignment
  elem.ontouchstart = that.handleTouchStart; //assignment
  
  return that;

};
