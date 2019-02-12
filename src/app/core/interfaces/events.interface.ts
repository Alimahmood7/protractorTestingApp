export interface Events {
    id: number;
    shortDescription?: string;
    description: string;
    timestamp: number;
    type: number;
    metadata?: {
        data: string;
    };
}
