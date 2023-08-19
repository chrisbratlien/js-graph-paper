Array.prototype.collect = Array.prototype.map;


//select returns an array containing only the elements which pass the test
Array.prototype.select = function (test) {
    var result = [];
    for (var i = 0; i < this.length; i += 1) {
        if (test(this[i])) {
            result.push(this[i]);
        }
    }

    return result;
};

Array.prototype.reject = function(test) {
  return this.select(function(element) { return !test(element); });

}



//detect returns the first element which passes the test, or false. aka "find"
Array.prototype.detect = function (test) {
    for (var i = 0; i < this.length; i += 1) {
        if (test(this[i])) {
            return this[i];
        }
    }

    return false;
};


Array.prototype.contains = function (x) { //does the array contain x?
    var result = this.detect(function (n) { return n == x; });
    return (result !== false);
};


//each runs a block of code on each element
Array.prototype.each = function (fn) {
    for (var i = 0; i < this.length; i += 1) {
        fn(this[i]);
    }
};

Array.prototype.inject = function (acc, fn) {
    var result = acc;
    this.each(function (e) {
        result = fn(result, e);
    });
    return result;
};



Array.prototype.atRandom = function () {
    if (this.length === 0) { return false; }
    var i = Math.floor(Math.random() * this.length);
    return this[i];
};

Array.prototype.integrate = function (fn) {
    return this.inject(0, function (acc, i) { return acc + fn(i); });
};

Array.prototype.sum = function () {
    return this.integrate(function (x) { return x; });
};

 Array.prototype.average = function() {
  return this.integrate(function(x) {return x; }) / this.length;
};



/* IE doesn't support Array.indexOf, so here, hold my hand while we cross the street */
if (!Array.indexOf) {
    Array.prototype.indexOf = function (obj) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] == obj) {
                return i;
            }
        }
        return -1;
    }
}

Array.prototype.eachPCN = function(callback) { //gives your callback a view of previous, current, and next

    var length = this.length;
    var c,p,n = false;
    switch(length) {
      case 0:
        console.log('err-OR! does not compute. ');
        break;
      case 1:
        c = 0; n = 0; p = 0;
        break;
      case 2: 
        c = 0; n = 1; p = 1;
        break;
      default:
        c = 0; n = 1; p = length - 1;
        break;
    }    
    
    for(var i = 0; i < length; i += 1) {
      callback({ prev: this[p], current: this[c], next: this[n], p: p, c: c, n: n, length: length });
      c += 1; c %= length;
      n += 1; n %= length;
      p += 1; p %= length;
    }
};


