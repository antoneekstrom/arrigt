import { NextApiResponse, NextApiRequest } from "next";

export default function plupp(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    plupp: Math.random()
  });
}