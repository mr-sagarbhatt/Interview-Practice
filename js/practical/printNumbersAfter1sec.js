//  ? print 1 to 5 after 1 second

const printNum = (n) => {
  for (let i = 1; i <= n; i++) {
    const fn = (val) => {
      setTimeout(() => console.log({ val }), val * 1000)
    }
    fn(i)
  }
}

printNum(5)
