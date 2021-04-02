import * as gke from "./gke";
import { storageBucket as storage } from "./storage";
import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";
import { named } from "./config";

export const clusterName = gke.cluster.name;
export const clusterLocation = gke.cluster.location;
export const storageBucket = storage.name;

const app = new gcp.appengine.Application(named("app-engine"), {
  locationId: "asia-east2",
});

export const appEngineName = app.name;
