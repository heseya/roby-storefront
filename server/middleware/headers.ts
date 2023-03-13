export default defineEventHandler((event) => {
  event.node.res.setHeader('Cache-Control', 's-maxage=15, stale-while-revalidate')
})
