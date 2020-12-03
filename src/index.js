import { makeSureCollectionExists, lookAtCollection } from "./collection";
import { login } from "./login";
import $ from "jquery";

// Enter the pod where you want to store your obelisk collection
const pod = "https://rameshtest1.solidcommunity.net"; //"https://my.pod.iri";
const collectionName = "obelisk1.ttl"; //"myObeliskCollection.ttl";
// Make sure that you are allowed to write in this container.
// Make sure it ends with a slash
const containerLocation = pod + "/voc/"; //"/public/collections/";
const documentLocation = containerLocation + collectionName;

// Let's see if you are an obelisk collector...
if (pod !== "https://my.pod.iri") {
  $("#app").text("Thanks for setting your pod IRI");
  checkoutObelisks(documentLocation);
} else {
  $("#app").text("Please set your pod IRI");
}

async function checkoutObelisks(collectionLocation) {
  $("#app").text("before login");
  await login();
  $("#app").text("after login");
  makeSureCollectionExists(collectionLocation).then((exists) => {
    if (exists) {
      lookAtCollection(collectionLocation).then((res) => {
        $("#app").text("Here is your collection: \n\n" + res);
      });
    }
  });
}
