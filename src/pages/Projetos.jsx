import { useHistory } from "react-router-dom"
import FormProjeto from "../components/projeto/FormProjeto"
import Styles from './Projetos.module.css'

function Projetos() {

    const history = useHistory()

    function creatpost(project) {
        project.cost = 0 //dinheiro inicial
        project.services = [] //seviços iniciais add c o tempo
        // normalmente coloca no back-end

        fetch('http://localhost:5000/Projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project),
        })
            .then((resp) => resp.json())
            .then((data) => { //redirection
                console.log(data)
                history.push('/ProjetosCriados', {message: 'Projeto enviado com sucesso :)'})
            }).catch((err) => console.log(err))
    }


    return (
        <div className={Styles.projeto_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <FormProjeto handleSubmit={creatpost} btntext='Criar Projeto' />
        </div>
    )
}

export default Projetos