import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";


export const Get = async (request) => {
  try {
    await connectToDB()

    const prompts = await Prompt.find({}).populate('creator')

    return new Response(JSON.stringify(prompts), { status: 200 })
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 })
  }
}

export { Get as GET }

//Using  populate  simplifies the process of retrieving related data from multiple collections and can improve the performance of the application by reducing the number of database queries needed to retrieve all the necessary data.