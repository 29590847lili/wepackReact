
// const obj={
//     aa :'aa'
// }
// function foo(){
//     console.log('foo aa:', this.aa)
// }
Function.prototype.myApply = function(thisArg, args) {
    const fn = Symbol('fn')        // 声明一个独有的Symbol属性, 防止fn覆盖已有属性
    thisArg = thisArg || window    // 若没有传入this, 默认绑定window对象
    thisArg[fn] = this              // this指向调用call的对象,即我们要改变this指向的函数
    console.log(this)
    const result = thisArg[fn](...args)  // 执行当前函数
    console.log(...args)
    delete thisArg[fn]              // 删除我们声明的fn属性
    return result                  // 返回函数执行结果
}

//测试
//foo.myApply(obj, [1,2,3])  // 谁调用的 myApply this就是只向谁
Function.prototype.mybind = function(thisArg, ...args){
    var self = this;
    let fn = function(){
        var _this = this instanceof fn ? this : thisArg;
        return self.apply(_this, [...args,...arguments])
    }
    fn.prototype = Object.create(self.prototype);
    return fn
}
let foo = function(name){
    this.mane = name
}
let obj={ name: "jack" }

let fun = foo.mybind(obj);

let tom = new fun('tom');
console.log(fun);
console.log(tom);