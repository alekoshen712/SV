let util = {
  def (obj, key, value, enumerable) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: !!enumerable,
      writable: true,
      configurable: true
    })
  },
  observe (value) {
    let ob
    if (value.hasOwnProperty('__ob__') && value.__ob__ instanceof Observer) {
      ob = value.__ob__
    } else {
      ob = new Observer(value)
    }
    return ob
  }
}

class Dep {
  constructor () {
    this.subs = []
  }
  depend () {

  }
  notify () {
    this.subs.forEach(sub => sub())
  }
  addSub (sub) {
    this.subs.push(sub);
  }
}

class Observer {
  constructor (value) {
    this.value = value
    this.dep = new Dep()
    util.def(value, '__ob__', this)
    this.walk(value)
  }
  walk (obj) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        defineReactive(obj, key, obj[key])
      }
    }
  }
}


function defineReactive(obj, key, val) {
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: false,
    get () {
      obj.__ob__.dep.addSub(() => Dep.target.render())
      return val
    },
    set (newVal) {
      obj.__ob__.dep.notify()
      val = newVal
    }
  })
}

class SV {
  constructor (options) {
    Dep.target = this
    this.$options = options
    this.init()
  }

  init () {
    this.initData()
    this.render()
  }

  initData () {
    let data = this.$data = this.$options.data
    this.proxyData()
    util.observe(data)
  }

  proxyData () {
    Object.keys(this.$data).forEach(key => {
      Object.defineProperty(this, key, {
        configurable: true,
        enumerable: true,
        get () {
          return this.$data[key]
        },
        set (val) {
          this.$data[key] = val
        }
      })
    })
  }

  render () {
    setTimeout(() => {

      let el = document.querySelector('#app')
      el.innerHTML = this.$data.msg
    }, 0)
  }
}



let vm = new SV({
  data: {
    msg: 'hello SV'
  }
});


