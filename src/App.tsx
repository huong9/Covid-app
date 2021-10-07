import { Provider } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import store from "./redux/store";

import AdminDashboard from "./components/AdminDashboard";
import Login from "./components/Login";

import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/login" exact={true}>
            <Login />
          </Route>

          <Route path="/admin" exact={true}>
            <AdminDashboard />
          </Route>

          <Redirect to="/login" exact={true} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
