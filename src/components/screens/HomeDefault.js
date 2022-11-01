import Link from 'next/link';
import { useEffect, useState } from 'react';
import Boton from '@ui/Boton';
import Contenedor from '@ui/Contenedor';
import Forgot from '@ui/Forgot';
import Input from '@ui/Input';
import Subtitle from '@ui/Subtitle';
import Text from '@ui/Text';
import Title from '@ui/Title';
import { getJudge } from '../../services/judge';

export default function HomeDefault() {
    const [ type, setType ] = useState(0);
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const [ judge, setJudge ] = useState();
    useEffect(() => {
        getJudge(username, setJudge, console.error);
    }, [username]);

    const handleUsername = (e) => {
        setUsername(e.target.value);
    }
    console.log(navigator.language || navigator.userLanguage)

    return (
        <Contenedor>
            <Title>Bienvenido</Title>
            <Subtitle>Esta plataforma pretende ayudar a gestionar un torneo de V:TES</Subtitle>
            {type === 0 && (
                <div>
                    <Boton onClick={()=>setType(1)}>Soy Juez</Boton>
                    <Boton  onClick={()=>setType(2)}>Soy Jugador</Boton>
                </div>
            )}
            {type === 1 ?
                <>
                    <Text>Ingresa para gestionar tu torneo</Text>
                    <Input list="user" placeholder="Nombre de usuario" value={username} onChange={handleUsername} />
                    <Input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <datalist id="user">
                        {judge && judge.map((j) => {
                            return <option 
                            data-id={j.id}
                            key={j.id}
                            value={j.nickname}
                            >
                                {j.name}
                            </option>
                        })}
                    </datalist>
                    <div>
                        <Boton>Entrar</Boton>
                        <Boton  onClick={()=>setType(0)}>Cancelar</Boton>
                    </div>
                    <Forgot><Link href="/register">¿No estás registrado?</Link></Forgot>
                    <Forgot><Link href="/recover">¿Olvidaste tu contraseña?</Link></Forgot>
                </>
            : type === 2 ?
                <>
                    <Input type="text" placeholder="ID del torneo" />
                    <div>
                        <Boton>Entrar</Boton>
                        <Boton  onClick={()=>setType(0)}>Cancelar</Boton>
                    </div>
                    <Link href="/player">
                        <Forgot>¿No te sabes el ID del torneo?</Forgot>
                    </Link>
                </>
            : null}
        </Contenedor>
    )
}
