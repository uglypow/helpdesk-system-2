// this shim is required
import "reflect-metadata";
import { createKoaServer } from "routing-controllers";
import { TicketController } from "./modules/tickets/TicketController";
import { UserController } from "./modules/users/UserController";
import { ErrorResponderMiddleware } from "./middlewares/ErrorHandlerMiddleware";

// creates express app, registers all controller routes and returns you express app instance
const app = createKoaServer({
  defaultErrorHandler: false,
  middlewares: [ErrorResponderMiddleware],
  controllers: [UserController, TicketController], // we specify controllers we want to use
});

// run express application on port 3000
const port = process.env.PORT || "3000";
app.listen(port, () => console.log(`listening to port ${port}`));
