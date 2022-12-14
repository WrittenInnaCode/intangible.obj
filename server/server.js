const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
// const cors = require('cors');
// const cloudinary = require('cloudinary');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: authMiddleware,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// require("dotenv").config();

// cloudinary.config({
// 	cloud_name: process.env.CLOUD_NAME,
// 	api_key: process.env.CLOUD_API_KEY,
// 	api_secret: process.env.CLOUD_API_SECRET
// });

// app.use(cors());
// app.delete('/:public_id', async (req, res) => {
// 	const { public_id } = req.params;
// 	try {
// 		await cloudinary.UploadStream.destroy(public_id);
// 		res.status(200).send();
// 	} catch(err) {
// 		res.status(400).send();
// 	}
// });

// app.listen(8080, () => {
// 	console.log('server running')
// })


// Serve up static assets
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../client/'));
})

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
	await server.start();
	server.applyMiddleware({ app });

	db.once('open', () => {
		app.listen(PORT, () => {
			console.log(`API server running on port ${PORT}!`);
			console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
		})
	})
};

// Call the async function to start the server
startApolloServer(typeDefs, resolvers);
