import "./setup.ts";
import app from "./app";

const port = process.env.PORT

app.listen(port, () => {
  console.log(`Server is listening on port ${port}.`);
});
