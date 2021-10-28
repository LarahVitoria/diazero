import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CreateUsers from '../Pages/CreateUser/create';

import Home from '../Pages/Home/home';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/create" exact component={CreateUsers} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;