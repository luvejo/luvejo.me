module.exports = function (name, block) {
  return block.fn({ src: require(`../assets/img/${name}`) })
}
