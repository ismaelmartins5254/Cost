import Styles from './ProjetoCard.module.css'

import {BsPencil, BsFillTrashFill} from 'react-icons/bs'
import { Link } from 'react-router-dom'

function ProjetoCard({id, name, budget, category, handleRemove}){

    const Remove = (e) =>{
        e.preventDefault()
        handleRemove(id)
    }

    return(
        <div className={Styles.project_card}>
            <h4>{name}</h4>
            <p>
                <span>Orçamento: </span>{budget}
            </p>
            <p className={Styles.category_text}>
                <span className={`${Styles[category.toLowerCase()]}`}></span> {category}
            </p>
            <div className={Styles.card_action}>
                <Link to={`/project/${id}`}>
                    <BsPencil/> Editar
                </Link>
                <button onClick={Remove}>
                    <BsFillTrashFill/> Excluir
                </button>
            </div>
        </div>
    )
}

export default ProjetoCard