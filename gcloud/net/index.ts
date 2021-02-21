import { named } from '../config';
import * as gcp from '@pulumi/gcp';

export const network = new gcp.compute.Network(named("network"), {
  autoCreateSubnetworks: false
});

export const subnet = new gcp.compute.Subnetwork(named("subnet"), {
  ipCidrRange: "10.2.0.0/16",
  region: "asia-southeast1",
  network: network.id
}, {
  dependsOn: network,
  parent: network
});

export const router = new gcp.compute.Router(named("router"), {
  region: subnet.region,
  network: network.id,
  bgp: {
    asn: 64514
  }
});

export const NAT = new gcp.compute.RouterNat(named("router-nat"), {
  router: router.name,
  region: router.region,
  natIpAllocateOption: "AUTO_ONLY",
  sourceSubnetworkIpRangesToNat: "ALL_SUBNETWORKS_ALL_IP_RANGES",
  logConfig: {
    enable: true,
    filter: "ERRORS_ONLY"
  }
}, {
  dependsOn: router
});
