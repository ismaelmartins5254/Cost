import Styles from './Select.module.css'

function Select({ name, options, handleOnChange, value }) {
    return (
        <div className={Styles.select_container}>
            <label htmlFor={name}>Selecione uma categoria:</label>
            <select name={name} id={name} onChange={handleOnChange} value={value || ''}>
                <option>Selecione uma opção</option>
                {options.map((option) => (
                    <option value={option.id} key={option.id}>
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default Select