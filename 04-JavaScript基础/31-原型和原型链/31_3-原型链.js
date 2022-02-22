// git reset --soft HEAD^或者HEAD~1 撤销上次 commit
// 访问一个对象的属性或方法时，首先从自身找，找不到往其原型找，再找不到再向其原型找，这样就形成一条原型链

// 查看是否是对象自身的属性或方法，hasOwnProperty
// 在其原型上，返回false