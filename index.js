const server = require("./api/server");

const port = process.env.PORT || 4444;

server.listen(port, () => {
  console.log(`Server Running on http://localhost:${port}`);
});
