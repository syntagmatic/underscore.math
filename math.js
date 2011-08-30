//   Math.js

(function() {

  var math = this.math = {};

  // Sum of array
  // math.sum([1,2,3])
  //   => 6
  // math.sum([{b: 4},{b: 5},{b: 6}], 'b')                                              
  //   => 15                                                                            
  math.sum = function(obj, key) {                                                       
    if (_.isArray(obj) && typeof obj[0] === 'number') {                                 
      var arr = obj;                                                                    
    } else {                                                                            
      var key = key || 'value';                                                         
      var arr = _(obj).pluck(key);                                                      
    }                                                                                   
    var val = 0;                                                                        
    for (var i=0, len = arr.length; i<len; i++)                                         
      val += arr[i];                                                                    
    return val;                                                                         
  };

  // Arithmetic mean
  // math.mean([1,2,3])
  //   => 2
  math.mean = function(arr) {
    return math.sum(arr) / arr.length;
  };

  // Scale to max value
  // math.scale(1,[2,5,10])
  //   => [ 0.2, 0.5, 1]
  math.scale = function(arr, max) {
    var max0 = _.max(arr);
    return _.map(arr, function(i) { return i * (max/max0); });
  };

  // Slope between two points
  // math.slope([0,0],[1,2])
  //   => 2
  math.slope = function(x, y) {
    return (y[1] - x[1]) / (y[0]-x[0]);
  };

  // Sort array by numbers
  // math.sort([3,1,2])
  //   => [1,2,3]
  math.sort = function(arr) {
    return arr.sort(function(a, b){
      return a - b;
    });
  };
  
  // math.median([1,2,3,4])
  //   => 2.5
  math.median = function(arr) {
    var middle = (arr.length + 1) /2;
    var sorted = math.sort(arr);
    return (sorted.length % 2) ? sorted[middle - 1] : (sorted[middle - 1.5] + sorted[middle - 0.5]) / 2;
  };

  // math.variance([1,2,3])
  //   => TODO
  math.variance = function(arr) {
    // TODO TEST!
    var mean = _(arr).mean();
    return _(arr).chain.map(function(x) { return Math.pow((x-mean),2); }).mean().value();
  };
  
  // math.stdDeviation([1,2,3])
  //   => TODO
  math.stdDeviation = function(arr) {
    // TODO TEST!
    return Math.sqrt(_(arr).variance());
  };

  // math.transpose(([1,2,3], [4,5,6], [7,8,9]])
  //   => [[1,4,7], [2,5,8], [3,6,9]]
  math.transpose = function(arr) {
    var trans = [];
    _(arr).each(function(row, y){
      _(row).each(function(col, x){
        if (!trans[x]) trans[x] = [];
        trans[x][y] = col;
      });
    });
    return trans;
  };


  _.mixin(math);

})();
