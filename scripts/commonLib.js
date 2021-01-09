
/**
 * Common Functions Library File
 * @author Shashi Kumar
 */

/**
 * Generate random number
 * @param {Number} max 
 */
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
/**
 * A list of randomly sorted numbers
 */
function getRandomNumbers(){
      let list = [1, 2, 3, 4, 5, 6, 7, 8, 9]
      list = list.sort(() => Math.random() - 0.5)
    return list
  }
 
/**
 * Clone a new array from given array to pass directly into functions
 * @param {Object} obj 
 */
function clone(obj) {
      var copy;
      if (null == obj || "object" != typeof obj) return obj;

      if (obj instanceof Date) {
          copy = new Date();
          copy.setTime(obj.getTime());
          return copy;
      }
      if (obj instanceof Array) {
          copy = [];
          for (var i = 0, len = obj.length; i < len; i++) {
              copy[i] = clone(obj[i]);
          }
          return copy;
      }
      if (obj instanceof Object) {
          copy = {};
          for (var attr in obj) {
              if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
          }
          return copy;
      }
  
      throw new Error("Unable to copy obj! Its type isn't supported.");
  }