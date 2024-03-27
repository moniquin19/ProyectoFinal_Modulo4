import { useState, useEffect } from 'react';
import Buscador from './Buscador';
import { Container, Button, Table } from 'react-bootstrap';

const MiApi = () => {
    const [feriados, setFeriados] = useState([]);
    const [filtro, setFiltro] = useState([]);
    const [buscado, setBuscado] = useState('');
    const [ordenAsc, setOrdenAsc] = useState(true);

    const url = 'https://www.feriadosapp.com/api/laws.json';

    const getData = async () => {
        const response = await fetch(url);
        const res = await response.json();
        console.log(res)
        setFeriados(res.data)
        setFiltro(res.data)
    };

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        const feriadosFiltrados = feriados.filter(feriado => feriado.content.toLowerCase().includes(buscado.toLowerCase()));
        setFiltro(feriadosFiltrados);
    }, [buscado, feriados]);

    const handleSortById = () => {
        const sortedFeriados = [...filtro].sort((a, b) => {
            if (ordenAsc) {
                return a.id.localeCompare(b.id);
            } else {
                return b.id.localeCompare(a.id);
            }
        });
        setFiltro(sortedFeriados);
        setOrdenAsc(!ordenAsc);
    };




    return (
        <Container className='text-center'>
            <h2 className="text-center">Feriados</h2>
            <Buscador setBuscado={setBuscado} />
            <Button className='mb-2' variant='secondary' onClick={handleSortById}>
                    Ordenar por ID {ordenAsc ? 'ascendente' : 'descendente'}
                </Button>


            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Contenido</th>
                        <th>Enlace</th>
                    </tr>
                </thead>
                <tbody>
                    {filtro.map(feriado => (
                        <tr key={feriado.id}>
                            <td>{feriado.id}</td>
                            <td>{feriado.title}</td>
                            <td>{feriado.content}</td>
                            <td>
                                <a href={feriado.link} target="_blank">Enlace</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>

    );
};

export default MiApi;
