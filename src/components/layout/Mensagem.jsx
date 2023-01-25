import Styles from './Mensagem.module.css'
import { useState, useEffect } from 'react'

function Mensagem({ type, msg }) {

    const [visibi, setVisibi] = useState(false)

    useEffect(() => {
        if (!msg) {
            setVisibi(false)
            return
        }

        setVisibi(true)

        const time = setTimeout(() => {
            setVisibi(false)
        }, 3000)

        return () => clearTimeout(time)

    }, [msg])

    return (
        <>
            {visibi && (
                <div className={`${Styles.mesg} ${Styles[type]}`}>
                    {msg}
                </div>)}
        </>
    )
}

export default Mensagem