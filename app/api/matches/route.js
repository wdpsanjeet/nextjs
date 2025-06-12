import { matches } from "../../lib/constants";


export async function GET() {
  return Response.json(matches);
}