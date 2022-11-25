import jsdom from 'jsdom';

const VEKN_URL = 'https://www.vekn.net/';

const getData = async (filter) => {
    const { JSDOM } = jsdom;
    const resp = await fetch(`${VEKN_URL}/player-registry?sort=lastname&${filter}`);
    const data = await resp.text();
    const dom = new JSDOM(data);
    const table = dom.window.document.querySelectorAll('.sectiontableentry0, .sectiontableentry1');
    let players = [];
    table.forEach((row, index) => {
        const player = {
            id: parseInt(row.querySelector('td:nth-child(1)').textContent.trim() || 0),
            name: row.querySelector('td:nth-child(2)').textContent.trim(),
            country: row.querySelector('td:nth-child(3)').textContent.trim(),
            state: row.querySelector('td:nth-child(4)').textContent.trim(),
            city: row.querySelector('td:nth-child(5)').textContent.trim(),
            score: parseInt(row.querySelector('td:nth-child(6)').textContent.trim() || 0),
            notes: row.querySelector('td:nth-child(10)').textContent.trim(),
        };
        players.push(player);
    });
    return players;
}

export default async function handler(req, res) {
  try {

    const {
        query: { filter, id }, 
        method 
    } = req;

    if (!filter && !id) {
        res.status(400).json({ success: false, message: 'No filter or id provided' });
    }
    let filtro = '';
    if (filter) {
        filtro = `name=${filter}`;
    }
    if (id) {
        filtro = `veknid=${id}`;
    }

    let test = [];

    switch (method) {
        case 'GET':
            // Get data from your database
            test = await getData(filtro);
            break;
        default:
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
    if (test.length <= 0) {
        res.status(200).json({ success: false });
    } else {
        res.status(200).json({ success: true, data: test });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, error: e });
  }
}