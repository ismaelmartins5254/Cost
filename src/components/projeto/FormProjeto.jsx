import { useEffect, useState } from "react"

import Input from "../form/Input"
import Select from "../form/Select"
import SubmitBtn from "../form/SubmitBtn"

function FormProjeto({ handleSubmit, projectData, btntext }) {

    const [categorias, setCategorias] = useState([])
    const [project, setProject] = useState(projectData || {})

    useEffect(() => {
        fetch('http://localhost:5000/categorias', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }

        }).then((resp) => resp.json())
            .then((data) => {
                setCategorias(data)
            }).catch((err) => console.log(err))
    }, [])

    const Submit = (e) => {
        e.preventDefault()
        handleSubmit(project)
    }

    function handleChange(e) {
        setProject({ ...project, [e.target.name]: e.target.value })
    }

    function handleSelect(e) {
        setProject({
            ...project, categoria: {
                id: e.target.value,
                name: e.target.options[e.target.selectedIndex].text,
            },

        })
    }

    return (
        <form onSubmit={Submit}>
            <div>
                <Input type='text'
                    text='nome do projeto'
                    name='name'
                    placeholder='digite o nome do projeto'
                    handleOnChange={handleChange}
                    value={project.name? project.name : ''} />
            </div>
            <div>
                <Input type='number'
                    text='Orçamento do Projeto'
                    name='budget'
                    placeholder='digite o orçamento disponivel R$' handleOnChange={handleChange}
                    value={project.budget? project.budget : ''}
                />
            </div>
            <div>
                <Select name='categoria_id'
                    text='Selecione uma categoria'
                    options={categorias}
                    handleOnChange={handleSelect}
                    value={project.categoria ? project.categoria.id : ''}
                />
            </div>
            <div>
                <SubmitBtn btntext={btntext} />
            </div>
        </form>
    )
}

export default FormProjeto