import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import { localStorageJwtName } from "./contexts/user-context";

const api = "https://api.poestack.com/graphql";
const local = "http://localhost:4000/graphql";

const httpLink = createHttpLink({
  uri: api,
});

const authLink = setContext((_, { headers }) => {
  let token = "";
  if (typeof window !== "undefined") {
    token = localStorage.getItem(localStorageJwtName) ?? "";
  }

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const cleanTypenameLink = new ApolloLink((operation, forward) => {
  if (operation.variables) {
    operation.variables = omitDeep(operation.variables, "__typename");
  }
  return forward(operation).map((data) => {
    return data;
  });
});

function omitDeep(obj, key) {
  const keys = Object.keys(obj);
  const newObj = {};
  keys.forEach((i) => {
    if (i !== key) {
      const val = obj[i];
      if (Array.isArray(val)) newObj[i] = omitDeepArrayWalk(val, key);
      else if (typeof val === "object" && val !== null)
        newObj[i] = omitDeep(val, key);
      else newObj[i] = val;
    }
  });
  return newObj;
}

function omitDeepArrayWalk(arr, key) {
  return arr.map((val) => {
    if (Array.isArray(val)) return omitDeepArrayWalk(val, key);
    else if (typeof val === "object") return omitDeep(val, key);
    return val;
  });
}

const client = new ApolloClient({
  ssrMode: typeof window === "undefined",
  link: ApolloLink.from([cleanTypenameLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;
