//GET

import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

type Params = { params: { id: string } };

export const GET = async (request: Request, { params }: Params) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) return new Response("Prompt not found", { status: 404 });
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify(err), { status: 500 });
  }
};

//PATCH

export const PATCH = async (request: Request, { params }: Params) => {
  const { prompt, tag } = await request.json();

  try {
    await connectToDB();

    const existingPrompt = await Prompt.findById(params.id);
    if (!existingPrompt)
      return new Response("Prompt not found", { status: 404 });

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    await existingPrompt.save();
    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Failed to update the prompts", { status: 500 });
  }
};

//DELETE
