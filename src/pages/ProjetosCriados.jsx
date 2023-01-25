import { useLocation } from "react-router-dom"

import { useState, useEffect } from "react"

import Mensagem from "../components/layout/Mensagem"
import Container from "../components/layout/Container"
import ButtonLink from '../components/layout/ButtonLink.jsx'
import ProjetoCard from "../components/projeto/ProjetoCard"
import Loading from "../components/layout/loading"

import Styles from './ProjetoCriado.module.css'



function ProjetosCriados() {

    const [projects, setProjects] = useState([])
    const [Removeloader, setRemoveloader] = useState(false)
    const [ProjectMessage, setProjectMessage] = useState('')


    const location = useLocation()
    let message = ''
    if (location.state) {
        message = location.state.message
    }

    useEffect(() => {
        setTimeout(() => {
            fetch('http://localhost:5000/Projects', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then((resp) => resp.json()).then((data) => {
                setProjects(data)
                setRemoveloader(true)
            }).catch((err) => console.log(err))
        }, 500)
    }, [])

    function RemoveProject(id){ // criando funçao pro botao de excluir
        fetch(`http://localhost:5000/Projects/${id}`,{
            method:'DELETE',
            headers:{
                'Content-Type': 'application/json',
            },
        }).then((resp) => resp.json())
        .then((data)=> {
            setProjects(projects.filter((project) => project.id !== id)) //removendo item do array projects 
            setProjectMessage('Projeto removido com sucesso!')

        })
    }

    return (
        <div className={Styles.PjCriado}>
            <div className={Styles.titulo}>
                <h1>Meus Projetos</h1>
                <ButtonLink to='/Projetos' text='Criar Projeto' />
            </div>
            {message && <Mensagem msg={message} type='success' />}
            {ProjectMessage && <Mensagem msg={ProjectMessage} type='success' />}
            <Container customClass='start'>
                {projects.length > 0 &&
                    projects.map((project) => (
                        <ProjetoCard name={project.name}
                            id={project.id}
                            budget={project.budget}
                            category={project.categoria.name}
                            key={project.id}
                            handleRemove={RemoveProject}
                        />
                    ))
                }
                {!Removeloader && <Loading />}
                {!Removeloader && projects.length === 0 &&(
                    <p>Não há projetos cadastrados</p>
                )}
            </Container>
        </div>
    )
}

export default ProjetosCriados