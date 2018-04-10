class Dep {
  constructor () {
    this.deps = []
  }
  depend () {
    this.deps.push(function () {
      Dep.target.render()
    })
  }
  notify () {
    this.deps.forEach(fn => {
      fn()
    })
  }
}