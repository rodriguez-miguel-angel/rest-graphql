import express from 'express';
import { graphqlHTTP } from 'express-graphql';

import { schema } from './src/data/schema';

import { mongoose } from './src/data/db';

const app = express();
const PORT = 4000;

// MongoDB connection
mongoose.connection
    .once('open', () => console.log('Connected to MongoDBLab instance.'))
    .on('error', error => console.log('Error connecting to MongoDBLab:', error));


// serving static files
app.use(express.static('public'));

app.get('/', (req, res) =>
    res.send('GraphQL is running!')
);

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
}));


app.listen(PORT, () =>
    console.log(`Running a GraphQL API server at localhost:${PORT}/graphql`)
);
