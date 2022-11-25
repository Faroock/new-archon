import Text from "@ui/Text";
import Input from "@ui/Input";
import Boton from "@ui/Boton";
import Forgot from "@ui/Forgot";
import Link from "next/link";
import { useEffect, useState } from "react";
import styled from 'styled-components';
import { getVeknUser } from "@services/veknUser";
import Contenedor from "@ui/Contenedor";

export default function LoginVEKNID({type, usuario, onCancel}) {
    
    const [ veknUser, setVeknUser ] = useState(usuario);
    const [ username, setUsername ] = useState(usuario?.id);
    const [ itsMe, setItsMe ] = useState(false);
    const [ password, setPassword ] = useState('');
    const [ listUser, setListUser ] = useState([]);
    const [ error, setError ] = useState();

    const handleNotMe = () => {
        setItsMe(false);
        setUsername('');
        setVeknUser();
        localStorage.removeItem('veknUser');
    }

    const handleMe = () => {
        setItsMe(true);
        setUsername(veknUser.id);
        setVeknUser(veknUser);
        localStorage.setItem('veknUser', JSON.stringify(veknUser));
    }

   
    useEffect(() => {
        const user = typeof username === 'number' ? usuario : listUser?.find(user => user.id == username);
        if (user) {
            setVeknUser(user);
        } else {
            setVeknUser();
            getVeknUser(username, setListUser, setError);
        }
    }, [username]);

    return (
        <Contenedor>
            {veknUser && veknUser.id ? (
                <Tabla>
                    <Right><Text>VEKN ID:</Text></Right><Text>{veknUser.id}</Text>
                    <Right><Text>Nombre:</Text></Right><Text>{veknUser.name}</Text>
                    <Right><Text>País:</Text></Right><Text>{veknUser.country}</Text>
                    <Right><Text>Ciudad:</Text></Right><Text>{veknUser.city}</Text>
                    <Right><Text>Ptos VEKN:</Text></Right><Text>{veknUser.score}</Text>
                    {veknUser.notes !== "" && <><Right><Text>Título</Text></Right><Text>{veknUser.notes}</Text></>}
                </Tabla>
            ) :
            (<Input list="veknUsers" placeholder="VEKN ID (o nombre si no te lo sabes)" value={username} onChange={(e) => setUsername(e.target.value)} />)}
            <datalist id='veknUsers'>
                {listUser && listUser.map((vekn) => {
                        return <option key={vekn.id} value={vekn.id}>{vekn.name}</option>
                    })
                }
            </datalist>
            {type === 1 && (
                <Input type='password' placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
            )}
            <div>
                {veknUser && veknUser.id && (<><Boton onClick={handleMe}>¡Llévame al torneo!</Boton>
                <Boton onClick={handleNotMe}>No soy yo</Boton></>)}
                <Boton onClick={()=>onCancel(veknUser)}>Cancelar</Boton>
            </div>
        </Contenedor>
        // <div>
        //     {type === 1 ?
        //         <>
        //             <Text>Ingresa para gestionar tu torneo</Text>
        //             <Input list="user" placeholder="VEKN ID" value={username} onChange={handleUsername} />
        //             <Input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
        //             <datalist id="user">
        //                 {judge && judge.map((j) => {
        //                     return <option 
        //                     data-id={j.id}
        //                     key={j.id}
        //                     value={j.nickname}
        //                     >
        //                         {j.name}
        //                     </option>
        //                 })}
        //             </datalist>
        //             <div>
        //                 <Boton>Entrar</Boton>
        //                 <Boton  onClick={onCancel}>Cancelar</Boton>
        //             </div>
        //             <Forgot><Link href="/register">¿No te sabes tu VEKN ID?</Link></Forgot>
        //             <Forgot><Link href="/recover">¿Olvidaste tu contraseña?</Link></Forgot>
        //         </>
        //     : type === 2 ?
        //         <>
        //             <Input type="text" placeholder="ID del torneo" />
        //             <div>
        //                 <Boton>Entrar</Boton>
        //                 <Boton  onClick={onCancel}>Cancelar</Boton>
        //             </div>
        //             <Link href="/player">
        //                 <Forgot>¿No te sabes el ID del torneo?</Forgot>
        //             </Link>
        //         </>
        //     : null}
        // </div>
    )
}

const Tabla = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 1rem;
`;

const Right = styled.div`
    text-align: right;
`;