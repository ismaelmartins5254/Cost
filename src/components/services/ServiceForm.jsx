import { useState } from 'react'

import Input from '../form/Input'
import SubmitBtn from '../form/SubmitBtn'

function ServiceForm({handleSubmit, btnText, projectData}) {

    const [service, setService] = useState({})

    function submit(e){
        e.preventDefault()
        projectData.services.push(service)
        handleSubmit(projectData)
    }

    function handleChange(e){
        setService({...service, [e.target.name]: e.target.value})
    }

    return (
        <form onSubmit={submit}>
            <Input 
                type='text'
                text='Nome do serviço'
                name='name'
                placeholder='Insira o nome do serviço'
                handleOnChange={handleChange}
            />
            <Input 
                type='number'
                text='Custo do serviço'
                name='cost'
                placeholder='Insira o valor do serviço'
                handleOnChange={handleChange}
            />
            <Input 
                type='text'
                text='descrição do serviço'
                name='desciption'
                placeholder='Descreva o serviço'
                handleOnChange={handleChange}
            />
            <SubmitBtn btntext= {btnText}/>
        </form>
    )
}

export default ServiceForm