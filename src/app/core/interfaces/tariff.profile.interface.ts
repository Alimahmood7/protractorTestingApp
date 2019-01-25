
export interface Service {
    tariffRate: number;
    volume: string;
    currency: string;
    type: string;
    unit: string;
}

export interface Operator {
    name: string;
    mncs: string;
    id: number;
    rateZoneName: string;
}

export interface Coverage {
    countryId: string;
    isoCode: string;
    mcc: string;
    name: string;
    Operators: Operator[];
}

export interface TariffProfile {
    rateZone: string;
    services: Service[];
    operators: string[];
}

