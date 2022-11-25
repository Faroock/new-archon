import jsdom from 'jsdom';

const VEKN_URL = 'https://www.vekn.net';

const getData = async (id) => {
    const { JSDOM } = jsdom;
    let url = `${VEKN_URL}/event-calendar/event/${id}`;
    const resp = await fetch(url);
    const data = await resp.text();
    const dom = new JSDOM(data);
    const event = dom.window.document.querySelector('.componentheading').textContent.trim();
    const date = dom.window.document.querySelector('.eventdate').textContent.trim();
    const tables = dom.window.document.querySelectorAll('table');

    let comments = [];
    comments.push(tables[0].textContent.split('\t')
    .filter((item) => item.trim().length > 2)[1]);

    const comment = tables[0].querySelectorAll('p');
    comment.forEach((row, index) => {
        const comment = row.textContent.trim();
        if (comment.length > 0) {
            comments = [...comments, ...comment.split('\n')];
        }
    });
    
    let organizer = '';
    let rounds = null;
    let timeLimit = null;
    let fee = null;
    let phone = null;
    let proxies = null;
    let venue = [];
    let website = null;
    const detail = tables[1].querySelectorAll('tr');
    detail.forEach((row, index) => {
        const header = row.querySelector('th').textContent.trim();
        const value = row.querySelector('td');
        if (header.toUpperCase() === 'ORGANIZER') {
            organizer = parseInt(value?.textContent.trim().split(' ').pop().slice(1, -1) || '0');
        }
        if (header.toUpperCase() === 'ROUNDS') {
            rounds = value?.textContent.trim() || null;
        }
        if (header.toUpperCase() === 'TIME LIMIT') {
            timeLimit = value?.textContent.trim() || null;
        }
        if (header.toUpperCase() === 'FEE') {
            fee = value?.textContent.trim() || null;
        }
        if (header.toUpperCase() === 'PHONE') {
            phone = value?.textContent.trim() || null;
        }
        if (header.trim().toUpperCase().startsWith('PROXIES')) {
            proxies = header.trim() || null;
        }
        if (header.toUpperCase() === 'VENUE') {
            venue = value?.textContent.trim().split('\n') || [];
        }
        if (header.toUpperCase() === 'WEBSITE') {
            website = value?.textContent.trim() || null;
        }
    });

    let players = [];
    const player = tables[2]?.querySelectorAll('tr') || [];
    player.forEach((row, index) => {
        if (index > 0) {
            const player = {
                position: parseInt(row.querySelector('td:nth-child(1)').textContent.trim()),
                name: row.querySelector('td:nth-child(2)').textContent.trim(),
                gw: parseInt(row.querySelector('td:nth-child(3)').textContent.trim()),
                vp: parseInt(row.querySelector('td:nth-child(4)').textContent.trim()),
                tp: parseInt(row.querySelector('td:nth-child(5)').textContent.trim()),
                final: parseInt(row.querySelector('td:nth-child(6)').textContent.trim()),
                rating: parseInt(row.querySelector('td:nth-child(7)').textContent.trim()),
            }
            players = [...players, player];
        }
    });

    return {
        event, 
        date, 
        fee,
        rounds, 
        timeLimit, 
        organizer,
        phone,
        website,
        proxies,
        venue,
        comments,
        players,
    };
}


export default async function handler(req, res) {
  try {

    const {
        query: { id }, 
        method 
    } = req;
    
    if (id === undefined) {
        res.status(400).json({ success: false, message: 'ID required' });
        return;
    }

    let test = [];

    switch (method) {
        case 'GET':
            // Get data from your database
            test = await getData(id);
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