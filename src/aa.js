

Function.prototype.mybind1 = function(context, ...args) {
    var fn = this; 
    return function() {
        return fn.apply(context,[...args,...arguments]); 
    }
}

// let obj = { name: "jack" }
    
// let foo = function(){
//     console.log(this.name)
// }
// foo.mybind(obj)();
Function.prototype.mybind = function(thisArg, ...args){
    var self = this;
    let fn = function(){
        console.log('---111')
        console.log(self) // foo
        console.log(this) // window  当new 的时候  this就是foo
        console.log('111---')
        console.log(this instanceof self)
        var _this = this instanceof self ? this : thisArg;
        return self.apply(_this, [...args,...arguments])
    }
    fn.prototype = Object.create(self.prototype);
    return fn
}

let foo = function (name) {
    this.name = name;
}
foo.prototype.sayName = function(){
    console.log('hello, my name is ' + this.name);
}
  
let obj = { name: 'jack' }
  
let jack = foo.mybind(obj);
jack()
// let tom = new jack('tom');
// tom.sayName();  // hello, my name is tom


