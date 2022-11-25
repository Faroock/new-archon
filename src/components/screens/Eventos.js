import Contenedor from "@components/ui/Contenedor"
import Text from "@components/ui/Text"
import { useEffect, useState } from "react"
import styled from "styled-components";
import Switch from "react-switch";
import { getEventsFromVEKN } from "@services/events";
import Link from "next/link";
import Head from "next/head";

export const Eventos = ({match}) => {

    const [ isLocal, setIsLocal ] = useState(true);
    const [ labelSwitch, setLabelSwitch ] = useState("Locales");
    const [ listEvents, setListEvents ] = useState([]);
    const [ error, setError ] = useState();

    const handleLocal = () => {
        setLabelSwitch(!isLocal ? "Locales" : "Globales");
        setIsLocal(!isLocal);
    }

    useEffect(() => {
        getEventsFromVEKN(isLocal, setListEvents, setError);
    }, [isLocal])


    return (
        <div>
            <Head>
                <title>Eventos {labelSwitch}</title>
            </Head>
            <Check>
                <Text>Eventos locales</Text>
                <Switch 
                    onChange={handleLocal} 
                    checked={isLocal}
                />
                <div>{labelSwitch}</div>
            </Check>
            <Tabla>
                {listEvents && listEvents.map((event) => {
                    return (<Link href={`./events/${event.local_id}`}>
                        <Fila>
                            <Text key={event.fecha}>{event.fecha}</Text>
                            <Text key={event.name}>{event.name}</Text>
                        </Fila>
                    </Link>)
                })}
            </Tabla>
        </div>
    )
}

const Check = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-direction: row;
    gap: .3em;
    margin: 1em;
`;

const Tabla = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: .3em;
    margin: 1em;
`;

const Fila = styled.div`
    display: grid;
    grid-template-columns: 1fr 5fr;
    gap: .3em;
    padding: 1em;
    border: 1px solid black;
    @media (max-width: 768px) {
        grid-template-columns: 3fr 7fr;
    }
`