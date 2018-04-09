/**
 * 遍历树级路由
 * 
 * @param {*Array} routeArr 
 */
function mapRoutes(routeArr) {

  let routes = []

  function map(routers) {
    routers.forEach(r => {

      routes.push(r.name)

      if (r.children && r.children.length !== 0) {
        map(r.children)
      }

    })
  }

  map(routeArr)

  return routes

}

export { mapRoutes }