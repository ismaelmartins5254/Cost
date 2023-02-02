import Styles from '../projeto/ProjetoCard.module.css'

import { BsFillTrashFill } from 'react-icons/bs'

function ServiceCard({ handleRemove, description, cost, name, id }) {

  const remove = (e) => {
    e.preventDefault()
    handleRemove(id, cost)
  }

  return (
    <div className={Styles.project_card}>
      <h4>{name}</h4>
      <p><span>Custo Total: </span>R${cost}</p>
      <p>{description}</p>
      <div className={Styles.card_action}>
        <button onClick={remove}>
          <BsFillTrashFill />
          Excluir
        </button>
      </div>
    </div>
  )
}

export default ServiceCard