import img_loading from '../../imagens/loading.svg'

import Styles from './Loading.module.css'

function Loading() {
    return (
        <div className={Styles.loader_container}>
            <img className={Styles.loader_img} src={img_loading} alt="costs loading " />
        </div>
    )
}

export default Loading