import { TariffProfile } from './tariff.profile.interface';
import {Events} from './events.interface';
import {SmsStatus} from './sms.status.interface';

export interface Usage {
  data: {
    upUsed: number;
    downUsed: number;
    limit: number;
    unit: string;
  };
  sms: {
    sent: number;
    received: number;
    receivedLimit: number;
    sentLimit: number;
    unit: string;
  };
}

export interface Network {
  currentOperator: string;
  networkInformation: string;
  currentProvisioningStatus: string;
  currentNetworkSpeed: string;
  ipAddress: string;
  ggsnIpAddress: string;
  sgsnIpAddress: string;
  msc: number;
  lastLocation: string;
  lastSeen: number;
}

export interface Service {
  isImeiLock: boolean;
  isSmsMoAllowed: boolean;
  isSmsMtAllowed: boolean;
  is3gAllowed: boolean;
  is4gAllowed: boolean;

}

export interface SearchResult {
  count: number;
  refreshTime: number;
  simId: number;
  clientName: string;
  createdDate: number;
  productionDate: number;
  imsi: number;
  iccid: string;
  msisdn: number;
  imei: number;
  tariffProfileId: number;
  clientOrgCountry: string;
  issuerOrgCountry: string;
  endpointId: string;
  isActive?: boolean;
  usage: Usage;
  network: Network;
  service: Service;
  events?: Events[];
  subOrgId: number;
  tariffProfile?: TariffProfile[];
  smsStatusLog?: SmsStatus[];
}


export const ResultHeaders = [
  'ICCID', 'CLIENT', 'COUNTRY', 'LAST SEARCH DONE', ''
];
