import app from './config/app'

const PORT = process.env.PORT || 3333
app.listen(PORT, () => {
  console.log(`> Server listening at localhost:${PORT}`)
})