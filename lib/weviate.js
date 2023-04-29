// import { Client } from 'weaviate-client';
import weaviate, { WeaviateClient }  from 'weaviate-ts-client';
const { COHERE_API_KEY } = process.env

// Add your Cohere API key here
// const cohereApiKey = 
const cohereApiKey = 'oaWH3l3y69pFBlH1WAoWa9aqkcybJz3BZPtci79E';
// const cohereApiKey = COHERE_API_KEY;
// Connect to the Weaviate demo database containing 10M wikipedia vectors
// This uses a public READ-ONLY Weaviate API key
const client = weaviate.client({
  scheme: 'https',
  host: 'cohere-demo.weaviate.network',
  // port: 443,
  apiKey:  new weaviate.ApiKey('76320a90-53d8-42bc-b41d-678647c6672e'),
  headers: {
    'X-Cohere-Api-Key': cohereApiKey,
  },
  // additionalHeaders: new Headers({
  //   'X-Cohere-Api-Key': cohereApiKey || '', // Make sure the header is always set
  // }),
});

export default client;
