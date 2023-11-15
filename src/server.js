import express from 'express';
import {db, connectToDb} from './db.js';

const app = express();
app.use(express.json());

app.get('/api/articles/:name', async (req, res) => {
    const { name } = req.params;

    const article = await db.collection('articles').findOne({ name });

    if(article){
        res.json(article);
    }
    else{
        res.status(404).json({ message: 'Article not found!' });
    }
});

app.put('/api/articles/:name/upvote', async (req, res) => {
    const { name } = req.params;

    await db.collection('articles').updateOne({ name }, {
        $inc: {
            upvotes: 1,
        },
    });

    const article = await db.collection('articles').findOne({ name });

    if (article) {
        res.status(200).send(`The ${article.name} article now has ${article.upvotes} upvotes`);
    } else{
        res.status(404).send('Article not found');
    }
});

app.post('/api/articles/:name/comments', async (req, res) => {
    const { name } = req.params;
    const { username, text } = req.body;

    await db.collection('articles').updateOne({ name }, {
        $push: {
            comments: { username, text },
        },
    });

    const article = await db.collection('articles').findOne({ name });

    if (article) {
        res.status(200).send(article.comments);
    } else{
        res.status(404).send('Article not found');
    }
});

connectToDb(() => {
    console.log('Successfully onnected to the database');
    app.listen(8000, () => {
        console.log('Server is listening on port 8000!');
    });
});