import jsdom from 'jsdom';
import { encriptar } from 'utils/utils';

const VEKN_URL = 'https://www.vekn.net';

const getData = async (country) => {
    const { JSDOM } = jsdom;
    const mesActual = parseInt(new Date().toISOString().slice(5, 7));
    const anioActual = parseInt(new Date().toISOString().slice(0, 4));
    const mesAnterior = mesActual - 1 === 0 ? 12 : mesActual - 1;
    const anioAnterior = mesActual - 1 === 0 ? anioActual - 1 : anioActual;
    const mesSiguiente = mesActual + 1 === 13 ? 1 : mesActual + 1;
    const anioSiguiente = mesActual + 1 === 13 ? anioActual + 1 : anioActual;
    const fechaActual = `${anioActual}-${String(mesActual).padStart(2,0)}`;
    const fechaAnterior = `${anioAnterior}-${String(mesAnterior).padStart(2,0)}`;
    const fechaSiguiente = `${anioSiguiente}-${String(mesSiguiente).padStart(2,0)}`;
    let url = `${VEKN_URL}/event-calendar?date=${fechaActual}`;
    if (country) {
        url = `${url}&country=${country}`;
    }
    const resp = await fetch(url);
    const data = await resp.text();
    const dom = new JSDOM(data);
    let events = [];
    const tabla = dom.window.document.querySelectorAll('.cal-week');
    let periodo = fechaAnterior;
    let aux = false;
    tabla.forEach((row, index) => {
        const fila = row.querySelectorAll('td');
        fila.forEach((columna, idx) => {
            if (columna.classList.contains('cal-this')) {
                aux = true;
                periodo = fechaActual;
            } else if (aux) {
                aux = false;
                periodo = fechaSiguiente;
            }
            const registro = columna.textContent.trim().split('\n');
            const evento = columna.querySelectorAll('a[href^="/event-calendar/event/"]');
            if (evento.length > 0) {
                evento.forEach((ev, id) => {
                    const event = {
                        id: parseInt(ev.href.split('/').pop()),
                        fecha: `${periodo}-${String(registro[0]).padStart(2,0)}`,
                        name: ev.textContent.trim().replaceAll('\"', "'"),
                        url: ev.href,
                        local_id: encriptar(ev.href.split('/').pop())
                    };
                    if (`${periodo}-${String(registro[0]).padStart(2,0)}` >= (new Date().toISOString().slice(0, 10))) {
                        events.push(event);
                    }
                });
            }
        });
    });

    return events;
}

const getIp = async () => {
    const resp = await fetch('http://ip-api.com/json');
    const data = await resp.json();
    return data;
}

export default async function handler(req, res) {
  try {

    const {
        query: { local }, 
        method 
    } = req;

    let test = [];
    const { query, country, countryCode, region } = await getIp();

    switch (method) {
        case 'GET':
            // Get data from your database
            const code = local === 'true' ? countryCode : null;
            test = await getData(code);
            break;
        default:
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
    if (test.length <= 0) {
        res.status(200).json({ success: false });
    } else {
        res.status(200).json({ success: true, ip: query, data: test });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, error: e });
  }
} 