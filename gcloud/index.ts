import * as gke from "./gke";
import { storageBucket as storage } from "./storage";

export const clusterName = gke.cluster.name;
export const clusterLocation = gke.cluster.location;
export const storageBucket = storage.name;
