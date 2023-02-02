import { parse, v4 as uuidv4 } from 'uuid'

import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import Styles from './Projeto.module.css'

import Loading from '../components/layout/Loading'
import Container from '../components/layout/Container'
import Mensagem from '../components/layout/Mensagem'
import FormProjeto from '../components/projeto/FormProjeto'
import ServiceForm from '../components/services/ServiceForm'
import ServiceCard from '../components/services/ServiceCard'

function Projeto() {

  const { id } = useParams()
  const [project, setProject] = useState([])
  const [services, setServices] = useState([])
  const [messege, setMessege] = useState()
  const [type, setType] = useState()
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [showServiceForm, setShowServiceForm] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      fetch(`http://localhost:5000/Projects/${id}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      }).then((resp) => resp.json()).then((data) => {
        setProject(data)
        setServices(data.services)
      }).catch((err) => console.log(err))
    }, 300)
  }, [id])

  function creatService(project) {

    const lastService = project.services[project.services.length - 1]

    lastService.id = uuidv4()
    const lastServiceCost = lastService.cost

    const newCost = parseFloat(lastServiceCost) + parseFloat(project.cost)

    if (newCost > project.budget) {
      setMessege('Valor do serviço maior que o orçamento total')
      setType('error')
      project.services.pop()
      return false
    }

    project.cost = newCost

    fetch(`http://localhost:5000/Projects/${project.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(project)

    }).then((resp) => resp.json()).then((data) => {
      setShowServiceForm(false)
    }).catch((err) => console.log(err))
  }

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm)
  }

  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm)
  }

  function editPost(project) {

    setMessege('')

    if (project.budget < project.cost) {
      setMessege('O orçamento não pode ser menor que o custo do projeto!')
      setType('error')
      return false
    }

    fetch(`http://localhost:5000/Projects/${project.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    }).then((resp) => resp.json())
      .then((data) => {
        setProject(data)
        setShowProjectForm(false)
        setMessege('Projeto atualizado com sucesso!')
        setType('success')
      }).catch((err) => console.log(err))

  }

  function removeService(id, cost) {
    const servicesUpdated = project.services.filter(
      (service) => service.id !== id
    )

    const projectUpdated = project

    projectUpdated.services = servicesUpdated
    projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)

    fetch(`http://localhost:5000/Projects/${projectUpdated.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectUpdated)
    }).then((resp)=>resp.json()).then((data)=>{
      setProject(projectUpdated)
      setServices(servicesUpdated)
      setMessege('Serviço excluido com sucesso')
      setType('sucess')
    })

  }
  { console.log(services) }
  return (
    <>
      {project.name ?
        <div className={Styles.project_datails}>
          <Container customClass='column'>
            {messege && <Mensagem type={type} msg={messege} />}
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
            <div className={Styles.service_form_container}>
              <h2>Adicione um serviço</h2>
              <button onClick={toggleServiceForm} className={Styles.btn}>
                {!showServiceForm ? 'Adicionar serviço' : 'Fechar'}
              </button>
              <div className={Styles.project_info}>
                {
                  showServiceForm && (
                    <ServiceForm
                      handleSubmit={creatService}
                      btnText='Adicionar serviço'
                      projectData={project}
                    />
                  )
                }
              </div>
            </div>
            <h2>Serviços</h2>
            <Container customClass='start'>
              {services.length > 0 &&
                services.map((service) => (
                  <ServiceCard
                    id={service.id}
                    name={service.name}
                    cost={service.cost}
                    description={service.desciption}
                    key={service.id}
                    handleRemove={removeService}
                  />
                ))
              }{services.length === 0 &&
                <p>Não há serviços cadastrados</p>
              }
            </Container>
          </Container>
        </div>
        :
        <Loading />

      }
    </>
  )

}


export default Projeto