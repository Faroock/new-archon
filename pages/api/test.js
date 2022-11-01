import dbConnect from "@lib/dbConnect";
import Test from "@models/test";

const newData = async (test) => {
    const { name, email, password } = test;
    const newTest = new Test({
        name,
        email,
        password
    });
    return newTest.save();
}

const getData = async (filter = {}) => {
    const resp = await Test.find(filter);
    return resp.map((test) => {
        return {
            id: test._id.toString(),
            name: test.name,
            email: test.email,
            password: test.password,
            date: test.date,
        }
    });
}

const delData = async (id) => {
    return Test.deleteOne({ _id: id });
}

const updateData = async (id, test) => {
    const { name, email, password } = test;
    console.log({ id, name, email, password });
    return Test.updateOne({ _id: id }, { name, email, password });
}

export default async function handler(req, res) {
  try {
    await dbConnect();
    const {
        query: { id }, 
        method 
    } = req;
    let test;

    switch (method) {
        case 'GET':
            // Get data from your database
            test = await getData();
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
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
    res.status(200).json({ success: true, data: test });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, error: e });
  }
}