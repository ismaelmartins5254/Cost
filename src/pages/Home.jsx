import financas from '../imagens/savings.svg'
import Styles from './Home.module.css'
import ButtonLink from '../components/layout/ButtonLink.jsx'


function Home(){
    
    return(
        <section className={Styles.home_container}>
            <h1>Bem-vindo ao <span>Costs</span></h1>
            <p>Comece a gerenciar os seus projetos agora mesmo!</p>
            <ButtonLink to='/Projetos' text='Criar Projeto'  />
            <img src={financas} alt="costs" />
        </section>
    )
}

export default Home