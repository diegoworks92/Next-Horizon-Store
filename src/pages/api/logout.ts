import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // borrar la cookie de acceso
  res.setHeader(
    "Set-Cookie",
    "accessToken=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Strict"
  );
  res.status(200).json({ message: "Logged out" });
}
