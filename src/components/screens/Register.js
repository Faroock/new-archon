
import { useRouter } from 'next/router'
import Contenedor from "@ui/Contenedor";
import Title from "@ui/Title";
import Input from '@ui/Input';
import { useState } from "react";
import Boton from "@ui/Boton";
import { createJudge } from '../../services/judge';
import Text from '../ui/Text';

export default function Register() {
    const router = useRouter();

    const [ nickname, setNickname ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ name, setName ] = useState("");
    const [ error, setError ] = useState("");

    const handleRegister = () => {
        createJudge({nickname, email, password, name}, () => {
            router.push("/");
        }, (err) => {
            console.error(err);
            setError(err.message);
        });
    }

    return (
        <Contenedor>
            <Title>Registrate como nuevo juez</Title>
            <Input placeholder="¿Cuál es tu nombre?" value={name} onChange={(e) => setName(e.target.value)} />
            <Input placeholder="¿Cuál es tu nick?" value={nickname} onChange={(e) => setNickname(e.target.value)} />
            <Input placeholder="¿Cuál es tu correo?" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input type='password' placeholder="Establece una contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
            <div>
                <Boton onClick={handleRegister}>Registrarme</Boton>
                <Boton onClick={()=>router.back()} >Cancelar</Boton>
            </div>
            {error && <Text>{error}</Text>}
        </Contenedor>
    )
}