import Boton from "@components/ui/Boton";
import Contenedor from "@components/ui/Contenedor";
import Input from "@components/ui/Input";
import Text from "@components/ui/Text";
import Title from "@components/ui/Title";
import { getVeknUser } from "@services/veknUser";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Forgot = () => {
    const router = useRouter();

    const [ name, setName ] = useState('');
    const [ error, setError ] = useState('');
    const [ listUser, setListUser ] = useState([]);
    const [ veknUser, setVeknUser ] = useState({});

    const handleName = (e) => {
        setName(e.target.value);
    }

    const handleRecover = () => {
        localStorage.setItem('veknUser', JSON.stringify(veknUser));

        console.log(listUser);
    }

    useEffect(() => {
        setVeknUser({});
        const user = listUser?.find(user => user.id == name);
        console.log({name, user});
        if (user) {
            setVeknUser(user);
        } else {
            getVeknUser(name, setListUser, setError);
        }
    }, [name]);

    console.log({veknUser});

    return (
        <Contenedor>
            <Title>Recuperar VEKN ID</Title>
            <Input list='veknUsers' placeholder="¿Cuál es tu nombre?" value={name} onChange={handleName} />
            <datalist id='veknUsers'>
                {listUser && listUser.map((vekn) => {
                        return <option key={vekn.name} value={vekn.id}>{vekn.name}</option>
                    })
                }
            </datalist>
            {veknUser && veknUser.id && 
                (<>
                    <Text>VEKN ID: {veknUser.id}</Text>
                    <Text>Nombre: {veknUser.name}</Text>
                    <Text>País: {veknUser.country}</Text>
                    <Text>Ciudad: {veknUser.city}</Text>
                    <Text>VEKN Ptos: {veknUser.score}</Text>
                    {veknUser.notes && <Text>Cargo: {veknUser.notes}</Text>}
                </>
                )}
            <div>
                <Boton onClick={handleRecover}>¡Sí, soy yo!</Boton>
                <Boton onClick={()=>router.back()} >Cancelar</Boton>
            </div>
            {error && <Text>{error}</Text>}
        </Contenedor>
    )
}

export default Forgot