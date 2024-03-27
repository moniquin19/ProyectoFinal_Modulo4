import { useState } from 'react';

const Buscador = ({ setBuscado }) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
        setBuscado(event.target.value);
    };

    return (
        <div className="mb-1">
            <input
                className='rounded'
                type="text"
                placeholder="Busca contenido feriado"
                value={inputValue}
                onChange={handleInputChange}
            />
        </div>
    );
};

export default Buscador;