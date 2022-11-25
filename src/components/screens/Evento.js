import EventDetails from "@components/EventDetails";
import { getEventDetailsFromVEKN } from "@services/events";
import { getVeknUserById } from "@services/veknUser";
import { useEffect, useState } from "react";

export default function Evento({id_event}) {
    const [ evento, setEvento ] = useState();
    const [ error, setError ] = useState();
    const [ judge, setJudge ] = useState();
    
    useEffect(() => {
        if (id_event) {
            getEventDetailsFromVEKN(id_event, setEvento, setError);
        }
    }, [id_event]);

    useEffect(() => {
        if (evento?.organizer) {
            const { organizer } = evento;
            getVeknUserById(organizer, setJudge, setError);
        }
    }, [evento]);

    return (
        <>
            <EventDetails evento={evento} judge={judge} />
        </>
    )
}