

import dbPromise from "../db/db";

const seed = async () => {
    const db = await dbPromise;
    const notes = [
      {title:"Trash",content:"Don't forget to take out the trash"},
      {title:"Shopping",content:"Buy some milk and bread"},
      {title:"Car washing",content:"Wash the Car"},
      {title:"Hairdresser",content:"On may 25th you have an appointment to your hairdresser"},
    ];
    
    try {
      for (const entry of notes) {
        await db.run(`
          INSERT INTO notes (title,content)
          VALUES (?, ?)`, 
          [entry.title, entry.content,]);
      }
      console.log("notes seeded successfully!");
    } catch (err) {
      console.error("Error seeding notes:", err);
    }
  };
    
