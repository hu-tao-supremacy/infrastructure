import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";
import { named } from "../config";

export const storageBucket = new gcp.storage.Bucket(named("storage-bucket"), {
  cors: [
    {
      maxAgeSeconds: 3600,
      methods: ["GET", "HEAD", "PUT", "POST", "DELETE"],
      origins: ["https://api.onepass.app", "https://graph.onepass.app"],
      responseHeaders: ["*"],
    },
  ],
  location: "ASIA-SOUTHEAST1",
  uniformBucketLevelAccess: true,
});
