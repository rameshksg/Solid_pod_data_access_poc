import { getParentResource, getResourceSlug, explainError } from "./utils";
import { getWebid } from "./login";
import auth from "solid-auth-client";

function customCollection(webid) {
  return `
    @prefix : <#>.
    @prefix obelisk: <http://w3id.org/obelisk/ns/> .
    @prefix me: <${webid}> .
        
    :myFirstObelisk a obelisk:Obelisk ;
        obelisk:ownedBy me: ;
        obelisk:heigth "15.0" .
    `;
}

function lookAtCollection(collectionLocation) {
  return auth
    .fetch(collectionLocation)
    .then(data => {
      console.log("What a nice obelisk collection!");
      return data.text();
    })
    .then(res => {
      console.log(res);
      return res;
    })
    .catch(error => {
      console.log(error);
    });
}

async function makeSureCollectionExists(collectionLocation) {
  return auth
    .fetch(collectionLocation)
    .then(async data => {
      if (data.status === 404) {
        // If you don't have a collection, we'll create it for you
        const creationstatus = await createCollection(
          getParentResource(collectionLocation),
          getResourceSlug(collectionLocation)
        );
        if (creationstatus === 201) {
          return true;
        } else {
          $("#app").html(
            "Received <b>error code " +
              creationstatus +
              "</b> when creating the collection. \n" +
              explainError(creationstatus)
          );
          return false;
        }
      } else {
        // The collection is already there
        return true;
      }
    })
    .catch(error => {
      console.log(error);
    });
}

async function createCollection(container, collectionSlug) {
  console.log("You don't have an obelisk collection yet? Let's fix this!");

  const queryParam = {
    method: "POST",
    headers: {
      "Content-Type": "text/turtle",
      Slug: collectionSlug
    },
    // Look at collection.js to see how the vocabulary is used
    body: customCollection(await getWebid())
  };

  console.log("Creating collection under container " + container);
  return auth
    .fetch(container, queryParam)
    .then(response => {
      console.log(response.statusText);
      return response.status;
    })
    .catch(error => {
      console.log(error);
    });
}

export { customCollection, lookAtCollection, makeSureCollectionExists };
