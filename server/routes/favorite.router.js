const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

// return all favorite images
router.get('/', (req, res) => {
  const dbQuery = `SELECT * FROM "favorites";`;
  pool
  .query(dbQuery)
  .then((result) => {
    res.send(result.rows);
  })
  .catch((error) => {
    console.log('Error querying DB.', error);
    res.sendStatus(500);
  });
});

// add a new favorite
router.post('/', (req, res) => {
  const queryText = `INSERT INTO "favorites" ("image", "category_id")
                     VALUES ($1, $2);`;
  const newAnimal = req.data;
  pool
  .query(queryText, newAnimal)
  .then((result) => {
    res.sendStatus(201);
  })
  .catch((error) => {
    console.log('Error adding favorite.', error);
    res.sendStatus(500);
  });
});

// update a favorite's associated category
router.put('/:id', (req, res) => {
  // req.body should contain a category_id to add to this favorite image
  const queryText = `UPDATE "favorites" SET "category_id" = $1 WHERE "id" = $2;`;
  const updateFavorite = req.data
  pool
  .query(queryText, [updateFavorite[0], updateFavorite[1]])
  res.sendStatus(200);
});

// delete a favorite
router.delete('/:id', (req, res) => {
  const queryText = `DELETE FROM "favorites" WHERE "id" = $1;`;
  
  pool
  .query(queryText, [req.params.id])
  .then((result) => {
    res.sendStatus(201);
  })
  .catch((error) => {
    console.log('Error deleting entry.', error);
    res.sendStatus(500);
  });
});

module.exports = router;
