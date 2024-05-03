// this shim is required
import { createKoaServer } from "routing-controllers";
import { UserController } from "./users/controllers/UserControllers";

// creates express app, registers all controller routes and returns you express app instance
const app = createKoaServer({
  controllers: [UserController], // we specify controllers we want to use
});

// run express application on port 3000
app.listen(3000, () => console.log("listening to port 3000"));
