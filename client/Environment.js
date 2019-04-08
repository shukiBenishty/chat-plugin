import { execute } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { Environment, Network, RecordSource, Store, QueryResponseCache } from 'relay-runtime'
import { SubscriptionClient } from 'subscriptions-transport-ws'

const cache = new QueryResponseCache({size: 100, ttl: 100000});

const fetchQuery = async (operation, variables = {}, cacheConfig) => {

  const queryId = operation.name;
  const cachedData = cache.get(queryId, variables);
  const isMutation = operation.operationKind === 'mutation';
  const isQuery = operation.operationKind === 'query';

  const forceFetch = cacheConfig && cacheConfig.force;

  if( isQuery && cachedData != null && !forceFetch ) {
    return cachedData;
  }

  return fetch('http://localhost:4000/chat/graphql', {
    method: 'POST',
    headers: {
        'Accept':'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    })
  }).then( response => {
    return response.json()
  }).then( json => {

    if( isQuery && json ) {
      cache.set(queryId, variables, json);
    }

    if( isMutation ) {
      cache.clear();
    }

    return json;

  }).catch( error => {
    return error;
  })

};
  
const subscriptionClient = new SubscriptionClient("ws://localhost:4000/graphql", {
  reconnect: true
});


const subscriptionLink = new WebSocketLink(subscriptionClient);

// Prepare network layer from apollo-link for graphql subscriptions
const networkSubscriptions = (operation, variables) =>
  execute(subscriptionLink, {
    query: operation.text,
    variables,
  });

  
const store =  new Store(new RecordSource());


export default new Environment({
    network: Network.create(fetchQuery, networkSubscriptions), // setupSubscription),
    store: store,
  });