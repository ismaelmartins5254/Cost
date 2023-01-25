import { Link } from 'react-router-dom'
import Container from './Container'
import Styles from './NavBar.module.css'
import Logo from '../../imagens/costs_logo.png' 


function NavBar() {
    return (
        <nav className={Styles.container}>
            <Container >
                <ul className={Styles.list}>
                    <Link to='/'>
                        <img src={Logo} alt="costs" />
                    </Link>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/ProjetosCriados'>Projetos</Link></li>
                    <li><Link to='/Empresa'>Empresa</Link></li>
                    <li><Link to='/Contato'>Contato</Link></li>
                </ul>
            </Container>
        </nav>
    )
}

export default NavBar