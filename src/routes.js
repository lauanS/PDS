import { BrowserRouter, Switch, Route } from "react-router-dom";

import Main from "./pages/Main/index";
import Login from "./pages/Login/index";
import NotFound from "./pages/NotFound/index";

const Routes = () => (
    <BrowserRouter key={"browserRouter"}>
      <Switch key={"SwitcherRouter"}>
        <Route key={"pag1"} exact path="/" component={Main} />
        <Route key={"pag2"} exact path="/login" component={Login} />  
        <Route key={"RDefault"} path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
  
  export default Routes;