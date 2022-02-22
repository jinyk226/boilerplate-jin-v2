const app = require('./server/index')
const PORT = 8000


app.listen(PORT, () => console.log(`Serving on port ${PORT}`))
