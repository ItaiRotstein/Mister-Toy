import { Route, Switch } from "react-router-dom"

import { AppHeader } from './cmps/app-header'
import routes from "./routes"

import './style/styles.scss'


export function App() {
  return (
    <div className="app">
        <AppHeader />
        <main>
          <Switch>
            {routes.map(route => (<Route path={route.path} exact key={route.path} component={route.component} />))}
          </Switch>
        </main>
    </div>
  )
}
