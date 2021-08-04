import {connectToDatabase} from "../../../lib/db";
import mongodb from 'mongodb';

async function handler (req, res, next) {


    if (req.method === 'POST') {
        const {id, contribution} = req.body;

        const client = await connectToDatabase();
        const db = client.db();

        console.log(id)
        let existingProject
        try  {
            existingProject = await db.collection('validatedProjects').findOne({
                _id: mongodb.ObjectId(id)
            });


            await db.collection('validatedProjects').updateOne({
                _id: mongodb.ObjectId(id)
            }, {
                $set: {
                    contributors: existingProject.contributors + 1,
                    contribution: parseInt(existingProject.contribution) + parseInt(contribution)
                }
            })

        } catch(err) {
            console.log(err)
        }


        res.status(201).json({
            existingProject
        })
        client.close()
    }

}

export default handler