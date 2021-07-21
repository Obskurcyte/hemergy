import {MongoClient} from "mongodb";

export async function connectToDatabase() {
   const client = await MongoClient.connect('mongodb+srv://hadrien:Hello13012@cluster0.zoj5p.mongodb.net/hemergy?retryWrites=true&w=majority')
    return client;
}
