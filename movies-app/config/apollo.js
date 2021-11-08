import { ApolloClient, InMemoryCache } from "@apollo/client";
// import { createHttpLink } from "@apollo/client";

// const LOCAL_SYSTEM_IP_ADDRESS = "192.168.1.190"; //'192.168.178.241';192.168.1.190
// const PORT = "4000";

const client = new ApolloClient({
  uri: `https://orchestrator-server.herokuapp.com`,
  cache: new InMemoryCache(),
});

export default client;
