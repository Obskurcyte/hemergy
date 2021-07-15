import {connectToDatabase} from "../../../lib/db";

async function handler (req, res, next) {
    if (req.method === 'POST') {
            const {projectId} = req.body

            const client = await connectToDatabase();
            const db = client.db();

        try {
            await db.collection('projects').deleteOne({title: projectId})
        } catch(err) {
            res.status(500)
            console.log(err)
        }
        res.status(200).json({message: 'Deleted place'})
    }
}

export default handler