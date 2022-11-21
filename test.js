const n = 10000
const z = 10
for (let i = 0; i < z; i++) {
  let data = []
  for (let k = 0; k < n; k++) {
    const money = Math.round(Math.random())
    data.push(money === 0 ? -1 : 1)
    // Math.round(Math.random())
  }
  const zero = data.filter(a => a === -1)
  const one = data.filter(a => a === 1)
  console.log(zero.length, one.length, (100 * one.length / data.length))
}


// const data = [0, 1, 0, 0]
// const dataOne = data.filter(i => i === 1)


