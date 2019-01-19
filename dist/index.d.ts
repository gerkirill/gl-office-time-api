export declare enum OfficeLocation {
    ODS = "ODS",
    KBP = "KBP",
    HRK = "HRK"
}
export declare function fetchOfficeTimeEvents(zone: OfficeLocation, employeeId: number, fromTime: number, tillTime: number, basicAuthToken: string, timeout: number): Promise<any>;
