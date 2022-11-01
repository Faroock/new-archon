import dbConnect from "@lib/dbConnect";
import Judge from "@models/judge";

const newData = async (judge) => {
    const { name, email, password, nickname } = judge;
    const newJudge = new Judge({
        name,
        email,
        password,
        nickname,
    });
    return newJudge.save();
}

const getData = async (filter = {}) => {
    const resp = await Judge.find({ 
        $or: [
            {nickname: {$regex: new RegExp(`.*${filter}.*`, "i")}},
            {name: {$regex: new RegExp(`.*${filter}.*`, "i")}},
            {email: {$regex: new RegExp(`.*${filter}.*`, "i")}},
        ]
    });
    return resp.map((judge) => {
        return {
            id: judge._id.toString(),
            name: judge.name,
            email: judge.email,
            password: judge.password,
            nickname: judge.nickname,
        }
    });
}

const delData = async (id) => {
    return Judge.deleteOne({ _id: id });
}

const updateData = async (id, judge) => {
    const { name, email, password, nickname } = judge;
    return Judge.updateOne({ _id: id }, { name, email, password, nickname });
}

export default async function handler(req, res) {
  try {
    await dbConnect();
    const {
        query: { id, filter }, 
        method 
    } = req;
    let test = [];

    switch (method) {
        case 'GET':
            // Get data from your database
            test = await getData(filter);
            break;
        case 'PUT':
            // Update or create data in your database
            test = await newData(req.body);
            break;
        case 'POST':
            // Update or create data in your database
            test = await updateData(id, req.body);
            break;
        case 'DELETE':
            // Delete data from your database
            test = await delData(id);
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
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