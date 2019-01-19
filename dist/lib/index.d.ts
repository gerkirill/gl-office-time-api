import { Response } from 'node-fetch';
export interface OfficeTimeEvent {
    timestamp: string;
    locationid: number;
    direction: PassDirection;
    area: string;
    working: boolean;
}
export declare enum PassDirection {
    in = "in",
    out = "out"
}
export declare enum OfficeLocation {
    ODS = "ODS",
    KBP = "KBP",
    HRK = "HRK"
}
export declare class FetchStatusError extends Error {
    response: Response;
    constructor(message: string, response: Response);
}
export declare function fetchOfficeTimeEvents(zone: OfficeLocation, employeeId: number, fromTime: number, tillTime: number, basicAuthToken: string, timeout: number): Promise<OfficeTimeEvent[]>;
