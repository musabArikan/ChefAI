import express from "express";
import { getAiSuggestion } from "../services/aiService.js";

const router = express.Router();

// POST /api/ai/suggest
router.post("/suggest", async (req, res) => {
  const { prompt, menu, exclude } = req.body;
  if (!prompt || !menu) {
    return res.status(400).json({ error: "Prompt and menu are required" });
  }
  const suggestion = await getAiSuggestion(prompt, menu, exclude);
  res.json({ suggestion });
});

export default router;
