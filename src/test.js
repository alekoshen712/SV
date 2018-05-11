let a = new Set()
let b = new Set()
// let deps = []
// let newDeps = []
a.add(1)
b.add(2)
let tmp = a
a = b
b = tmp
tmp.clear()
// a = tmp
// tmp = deps
// deps = newDeps
// newDeps = tmp
// newDeps.length = 0
console.log(a);
console.log(b);