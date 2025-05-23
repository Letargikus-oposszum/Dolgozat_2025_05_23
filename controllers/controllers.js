import dbPromise from "../db/db.js";

export const getnote = async (req, res) => {
  const db = await dbPromise;
  const row = await db.all("SELECT * FROM notes");

  const result = row.map(row => ({
    id: row.id,
    title: row.title,
    content: row.content,
  }));

  res.status(200).json(result);
};

export const getnoteById = async (req, res) => {
  const db = await dbPromise;
  const id = parseInt(req.params.id);
  const row = await db.get("SELECT * FROM notes WHERE id = ?", [id]);

  if (!row) return res.status(404).json({ message: "note not found" });

  res.status(200).json({
    id: row.id,
    title: row.title,
    content: row.content,
  });
};

export const createnote = async (req, res) => {
  const db = await dbPromise;
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Invalid input something" });
  }

  const result = await db.run(
    "INSERT INTO notes (title, content) VALUES (?, ?)",
    [title, content] 
  );

  res.status(201).json({
    id: result.lastID,
    title,
    content,
  });
};

export const deletenote = async (req, res) => {
  const db = await dbPromise;
  const id = parseInt(req.params.id);  

  const check = await db.get("SELECT * FROM notes WHERE id = ?", [id]);
  if (!check) {
    return res.status(404).json({ message: "note not found" });
  }

  await db.run("DELETE FROM notes WHERE id = ?", [id]);

  res.status(200).json({ message: "Delete successful" });
};

