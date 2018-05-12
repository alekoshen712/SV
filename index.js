import SV from "./src/index"
let num = 1
window.vm1 = new SV({
  el: "#app1",
  data: {
    a: num,
    b: 10
  },
  computed: {
    c () {
      return this.a + this.b
    }
  },
  methods: {
    handleClick (e) {
      console.log("handleClick")
    },
    consoleC (e) {
      e.stopPropagation()
      this.a = ++num
    }
  },
  render () {
    return (
      <div onClick={this.handleClick}>
        <i className="font-red">{this.a}</i>
        {
          this.a === 3 ? null : <div>{this.b}</div>
        }
        <div onClick={this.consoleC}>{this.c}</div>
      </div>
    )
  }
})

console.log(vm1)