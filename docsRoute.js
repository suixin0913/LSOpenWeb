const fs = require('fs')
const path = require('path')
// console.log(fs.existsSync('docs'))

var allRoute = []
getAllRoute(path.resolve('./docs'))
replaceRoutePath(allRoute)

function getAllRoute(dir) {
  files = fs.readdirSync(dir)
  files.forEach(function (file) {
    const targetPath = dir + '/' + file
    if (fs.statSync(targetPath).isDirectory()) {
      getAllRoute(targetPath)
    } else {
      var content = fs.readFileSync(targetPath).toString()
      var slug = strSubstr('slug: ', '\n', content)
      if (slug) {
        allRoute.push(slug)
      }
    }
  })
}

function strSubstr(start, end, str) {
  let temp = str.split(start, 2);
  if (end === '') {
      return temp[1];
  }
  if (temp[1]) {
    let content = temp[1].split(end, 2);
    return content[0];
  }
  return ''
}

function replaceRoutePath(routes) {
  var content = fs.readFileSync(path.resolve('./docusaurus.config.js')).toString()
  content = content.replace('docsRouteBasePath: []', `docsRouteBasePath: ${JSON.stringify(routes)}`)
  fs.writeFileSync(path.resolve('./docusaurus.config.js'), content)
}