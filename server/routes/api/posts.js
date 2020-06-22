const express = require('express');
const router = express.Router();
const mongodb = require('mongodb');
const config = require('../../config/database')


// GET POST
router.get('/', async (req,res) => {
 const posts = await loadPostsCollection();
 res.send(await posts.find({}).toArray())
})

// ADD POST
router.post('/', async (req,res) => {
 const posts = await loadPostsCollection();
  await posts.insertOne({
    text: req.body.text,
    createdAt: new Date()
  });
  res.status(201).send()
});

// DELETE POST
router.delete('/:id', async (req,res) => {
 const posts = await loadPostsCollection();
 posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
   res.status(200).send();
})

async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect(config,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );

  return client.db('full_stac_vue').collection('posts');
}


module.exports = router;
