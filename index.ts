import { app } from "./src/app"
import { config as dotenv } from "dotenv"

dotenv()

const port = process.env.PORT

app.listen(port, () => {
  console.log(`running on port ${port}`)
})
