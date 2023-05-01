import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Users from './components/Users'
import UsersTable from './components/UsersTable'
import './App.css'

const App=()=>(
<BrowserRouter>
<Switch>
  <Route exact path="/" component={Users}/>
  <Route exact path="/users" component={UsersTable}/>
</Switch>
</BrowserRouter>
)


export default App