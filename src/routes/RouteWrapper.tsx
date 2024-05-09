import React from "react";
import { Route, Switch } from "react-router-dom";
import routeMap from "./routeMap";

const RouteWrapper = () => {
  return (
    <Switch>
      {routeMap.map((Current, index) => {
        const CurrentComponent = Current.component;
        return (
          <Route
            key={`${Current.path}-${index}`}
            path={Current.path}
            component={CurrentComponent}
          />
        );
      })}
    </Switch>
  );
};

export default RouteWrapper;
