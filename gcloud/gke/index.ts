import * as gcp from '@pulumi/gcp';
import * as pulumi from '@pulumi/pulumi';
import * as k8s from '@pulumi/kubernetes';
import * as net from '../net';
import * as fs from 'fs';
import * as path from 'path';
import * as config from '../config';
import { named } from '../config';
import * as ejs from 'ejs';

export const cluster = new gcp.container.Cluster(named("cluster"), {
  initialNodeCount: 1,
  removeDefaultNodePool: true,
  location: "asia-southeast1-a",
  minMasterVersion: config.masterVersion,
  masterAuth: {
    username: config.username,
    password: config.password
  },
  masterAuthorizedNetworksConfig: undefined,
  ipAllocationPolicy: {},
  networkPolicy: {
    enabled: true,
    provider: "CALICO"
  },
  privateClusterConfig: {
    enablePrivateEndpoint: false,
    enablePrivateNodes: true,
    masterIpv4CidrBlock: "172.16.0.0/28"
  },
  network: net.network.selfLink,
  subnetwork: net.subnet.selfLink
}, {
  dependsOn: net.subnet,
  parent: net.subnet
});

export const nodePool = new gcp.container.NodePool(named("node-pool"), {
  cluster: cluster.name,
  initialNodeCount: config.nodeCount,
  location: cluster.location,
  nodeConfig: {
    preemptible: true,
    machineType: config.nodeMachineType,
    oauthScopes: [
      "https://www.googleapis.com/auth/compute",
      "https://www.googleapis.com/auth/devstorage.read_only",
      "https://www.googleapis.com/auth/logging.write",
      "https://www.googleapis.com/auth/monitoring",
    ],
  },
  version: config.masterVersion,
  management: {
    autoRepair: true
  }
}, {
  dependsOn: cluster,
  parent: cluster
});
