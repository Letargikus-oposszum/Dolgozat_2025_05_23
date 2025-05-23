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

  const authorsArray = await db.run("SELECT authors FROM notes");

  authorsArray.array.forEach(author => {
      if (author = authors){
        alert("There can be no notes with the same name!");
        //abortolni kellene ezt a függvényt ez után
      }
  });

  if (!title || !content) {
    return res.status(400).json({ message: "Invalid input something" });
  }

  const result = await db.run(
    "INSERT INTO notes (title, content) VALUES (?, ?)",
    [band, title, authors, releaseDate] 
  );

  res.status(201).json({
    id: result.lastID,
    title,
    content,
  });
};


export const updatenote = async (req, res) => {
  const db = await dbPromise;
  const id = parseInt(req.params.id);  // Use the database ID from the route params
  const { title, content } = req.body;

  // Validate input
  if (!title || !content) {
    return res.status(400).json({ message: "Invalid input something" });
  }

  // Check if the note with the provided ID exists in the database
  const check = await db.get("SELECT * FROM notes WHERE id = ?", [id]);
  if (!check) {
    return res.status(404).json({ message: "note not found" });
  }

  // Update the note in the database
  await db.run(
    "UPDATE notes SET band = ?, title = ?, authors = ?, releaseDate = ? WHERE id = ?",
    [band,title,authors,releaseDate, id]
  );

  // Return the updated note data in the response
  res.status(201).json({
    id: check.lastID,
    band,
    title,
    authors,
    releaseDate,
  });
};


export const deletenote = async (req, res) => {
  const db = await dbPromise;
  const id = parseInt(req.params.id);  // Use the database ID from the route params

  // Check if the note with the provided ID exists in the database
  const check = await db.get("SELECT * FROM notes WHERE id = ?", [id]);
  if (!check) {
    return res.status(404).json({ message: "note not found" });
  }

  // Delete the note from the database
  await db.run("DELETE FROM notes WHERE id = ?", [id]);

  // Respond with a success message
  res.status(200).json({ message: "Delete successful" });
};

