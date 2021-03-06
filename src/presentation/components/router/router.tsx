import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Login } from "@/presentation/pages/";

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={Login} />
      </Switch>
    </BrowserRouter>
  );
}
