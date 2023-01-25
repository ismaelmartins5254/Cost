import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import './App.css'

import Home from './pages/Home'
import ProjetosCriados from './pages/ProjetosCriados'
import Empresa from './pages/Empresa'
import Contato from './pages/Contato'
import Projetos from './pages/Projetos'
import Projeto from './pages/Projeto'

import Container from './components/layout/Container'
import NavBar from './components/layout/NavBar'
import Footer from './components/layout/Footer'

function App() {
  return (
    <Router>
      
        <NavBar/>
      
      <Switch>
        <Container customClass='min_heigth'>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/ProjetosCriados'>
            <ProjetosCriados />
          </Route>
          <Route path='/Projetos'>
            <Projetos/>
          </Route>
          <Route path='/project/:id'>
            <Projeto/>
          </Route>
          <Route path='/Empresa'>
            <Empresa />
          </Route>
          <Route path='/Contato'>
            <Contato />
          </Route>
        </Container>
      </Switch>

      <Footer />
      
    </Router>
  )
}

export default App
