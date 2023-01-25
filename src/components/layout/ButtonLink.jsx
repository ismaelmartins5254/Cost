import Styles from './ButtonLink.module.css'
import { Link } from 'react-router-dom'

function ButtonLink({ to, text }) {
    return (
        <>
            <Link className={Styles.btn} to={to} key='newProject'>{text}
            </Link>
        </>
    )
}

export default ButtonLink