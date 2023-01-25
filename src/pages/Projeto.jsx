import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import Styles from './Projeto.module.css'

import Loading from '../components/layout/Loading'
import Container from '../components/layout/Container'
import FormProjeto from '../components/projeto/FormProjeto'

function Projeto() {

  const { id } = useParams()
  const [project, setProject] = useState([])
  const [showProjectForm, setShowProjectForm] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      fetch(`http://localhost:5000/Projects/${id}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      }).then((resp) => resp.json()).then((data) => {
        setProject(data)
      }).catch((err) => console.log(err))
    }, 300)
  }, [id])

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm)
  }

  function editPost(project) {

    fetch(`http://localhost:5000/Projects/${project.id}`, {
      method: 'PATH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(project),

    }).then((resp) => {
      resp.json()
      console.log(resp)
    })
      .then((data) => {
        setProject(data)

        setShowProjectForm(!showProjectForm)
      }).catch((err) => console.log(err))
  }

  return (
    <>
      {project.name ? (
        <div className={Styles.project_datails}>
          <Container customClass='column'>
            <div className={Styles.details_container}>
              <h1>Projeto: {project.name}</h1>
              <button onClick={toggleProjectForm} className={Styles.btn}>
                {!showProjectForm ? 'Editar Projeto' : 'Fechar'}
              </button>
            </div>
            <div>
              {!showProjectForm ? (
                <div className={Styles.project_info}>
                  <p>
                    <span>Categoria: </span> {project.categoria.name}
                  </p>
                  <p>
                    <span>Orçamento: </span> R${project.budget}
                  </p>
                  <p>
                    <span>Total Utilizado: </span>{project.cost}
                  </p>
                </div>
              ) : (
                <div className={Styles.project_info}>
                  <FormProjeto handleSubmit={editPost} btntext='Concluir Edição' projectData={project} />
                </div>
              )}
            </div>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  )
}

export default Projeto