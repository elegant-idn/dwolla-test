import { DateTime } from "luxon";
import { Router } from "express";

const router = Router();

router.get("/", (req: any, res: any) => {
  const { timezone } = req.query;

  try {
    const now = DateTime.utc();
    const response: { currentTime: string; adjustedTime?: string } = {
      currentTime: now.toISO(),
    };

    if (timezone) {
      const offset = parseFloat(timezone as string);
      if (isNaN(offset) || offset < -12 || offset > 14) {
        return res.status(400).json({ error: "Invalid timezone offset" });
      }

      response.adjustedTime = now.plus({ hours: offset }).toISO();
    }

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
