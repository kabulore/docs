const getUrlQuerys = () => {
  const s = location.search.length ? location.search.substring(1) : ''
  const a = s.length ? s.split('&') : []
  let r = {}
  a.forEach(item => {
    let t = item.split('=')
    r[decodeURIComponent(t[0])] = decodeURIComponent(t[1])
  })
  return r
}

