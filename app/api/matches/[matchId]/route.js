import { matches } from "../../../lib/constants";


export async function GET(request, { params }) {
  const { matchId } = params;
  const match=matches.find(item => item.id === matchId);
  return Response.json(match);
}