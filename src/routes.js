import { BrowserRouter, Switch, Route } from "react-router-dom";
import ptBR from 'antd/lib/locale/pt_BR';
import Layout from "./components/Layout/index";

import Main from "./pages/Main/index";
import Login from "./pages/Login/index";
import SignUp from "./pages/SignUp/index";
import NotFound from "./pages/NotFound/index";

import ViewReport from "./pages/ViewReport/index";
import ControlPanel from "./pages/private/ControlPanel/index";

import { ConfigProvider } from 'antd';
import { AuthProvider } from "./context/authContext";
import PrivateRoute from "./components/PrivateRoute";

const Routes = () => { 
  return (
    <AuthProvider>
      <ConfigProvider locale={ptBR}>
        <BrowserRouter key={"browserRouter"}>
          <Layout>
            <Switch key={"SwitcherRouter"}>
              <Route key={"pag1"} exact path="/" component={Main} />
              <Route key={"pag2"} exact path="/login" component={Login} />  
              <Route key={"pag3"} exact path="/cadastro" component={SignUp} /> 
              <Route key={"pag4"} exact path="/view" component={ViewReport}/>
              <PrivateRoute key={"pri1"} exact path="/control" component={ControlPanel}/>
              <Route key={"RDefault"} path="*" component={NotFound} />
            </Switch>
          </Layout>
        </BrowserRouter>
      </ConfigProvider>
    </AuthProvider>
  );
};
  
  export default Routes;