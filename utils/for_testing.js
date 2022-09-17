const palindrome = string => string.split('').reverse().join('')

const average = array => array.length === 0 ? 0 : array.reduce((acc, current) => acc+current)/array.length

console.log(average([4, 8, 12, 27, 15]))

module.exports = {palindrome, average}