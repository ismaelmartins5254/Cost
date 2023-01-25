import Styles from './SubmitBtn.module.css'

function SubmitBtn({btntext}){
    return (
        <div >
            <button className={Styles.btn}>{btntext}</button>
        </div>
    )
}

export default SubmitBtn