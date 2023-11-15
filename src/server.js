import express from 'express';

let articlesInfo = [{
    name: 'learn-react',
    upvotes: 0,
    comments: [],
}, {
    name: 'learn-node',
    upvotes: 0,
    comments: [],
}, {
    name: 'mongodb',
    upvotes: 0,
    comments: [],
}]

const app = express();
app.use(express.json());

app.put('/api/articles/:name/upvote', (req, res) => {
    const { name } = req.params;
    const article = articlesInfo.find(article => article.name === name);

    if (article) {
        article.upvotes += 1;
        res.status(200).send(`The ${article.name} article now has ${article.upvotes} upvotes`);
    } else{
        res.status(404).send('Article not found');
    }
});

app.post('/api/articles/:name/comments', (req, res) => {
    const { name } = req.params;
    const { username, text } = req.body;
    const article = articlesInfo.find(article => article.name === name);

    if (article) {
        article.comments.push({ username, text });
        res.status(200).send(article.comments);
    } else{
        res.status(404).send('Article not found');
    }
});

app.listen(8000, () => {
    console.log('Server is listening on port 8000!');
});