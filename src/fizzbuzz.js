const fizzBuzz = (num) => {
    let array = []
    for (i = 1; i <= num; i++) {
        if(num % 3 === 0) {
            array.push("Fizz")
        }
        array.push(i)
    }
    return array
}



module.exports = fizzBuzz