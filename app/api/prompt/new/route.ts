import { connectToDB } from "@/utils/database";

export const POST = async (req: Request, res: Response) => {
  const { userId, promptId, content } = await req.json();

  try {
    await connectToDB();
  } catch (err) {
    console.log(err);
  }
};
