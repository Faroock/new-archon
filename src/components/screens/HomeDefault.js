
import { useEffect, useState } from 'react';
import Boton from '@ui/Boton';
import Contenedor from '@ui/Contenedor';
import Subtitle from '@ui/Subtitle';
import Title from '@ui/Title';
import LoginVEKNID from '@components/LoginVEKNID';
import { getVeknUserById } from '@services/veknUser';

export default function HomeDefault() {
    const [ type, setType ] = useState(0);
    const [ veknUser, setVeknUser ] = useState({});
    const [ error, setError ] = useState();


    const handleCancel = (user) => {
        setType(0);
        setVeknUser(user);
    }

    useEffect(() => {
        const localveknUser = JSON.parse(localStorage.getItem('veknUser'));
        setVeknUser(localveknUser ? localveknUser : {});
        if (localveknUser?.id) {
            getVeknUserById(localveknUser.id, setVeknUser, setError);
        }
    }, []);

    useEffect(() => {
        if (veknUser?.id) {
            localStorage.setItem('veknUser', JSON.stringify(veknUser));
        }
    }, [veknUser]);


    return (
        <Contenedor>
            <Title>Bienvenido</Title>
            <Subtitle>Esta plataforma pretende ayudar a gestionar un torneo de V:TES</Subtitle>
            {type === 0 ? (
                <div>
                    <Boton onClick={()=>setType(1)}>Soy Juez</Boton>
                    <Boton  onClick={()=>setType(2)}>Soy Jugador</Boton>
                </div>
            ) : 
                <LoginVEKNID type={type} usuario={veknUser} onCancel={handleCancel} />
            }

        </Contenedor>
    )
}
