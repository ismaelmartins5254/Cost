import Styles from './Input.module.css'

function Input({ name, text, type, placeholder, handleOnChange, value }) {
    return (
        <div className={Styles.inputsForm_container}>
            <label htmlFor={name} >{text}:</label>
            <input type={type} placeholder={placeholder} name={name} id={name} onChange={handleOnChange} value={value} />
        </div>
    )
}

export default Input