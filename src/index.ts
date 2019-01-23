// todo: user id by name / email
// idea: glo cli client

const fetch = require('node-fetch');
import { RequestInit, Response } from 'node-fetch';


const JSON_API_URL = 'https://portal-ua.globallogic.com/officetime/json';
/*
 // const json = JSON.parse('[{"timestamp":"2018\/07\/09 08:46:33","locationid":16,"direction":"in","area":"ODS4","working":true},{"timestamp":"2018\/07\/09 09:41:07","locationid":17,"direction":"out","area":"ODS4","working":true}]');
        return {
*/
export interface OfficeTimeEvent {
  timestamp: string, // e.g. "2018/07/09 08:46:33"
  locationid: number, // e.g. 16
  direction: PassDirection, // in / out
  area: string, // e.g. "ODS4"
  working: boolean
}

export interface Employee {
  zone: OfficeLocation,
  uid: number, // e.g.
  'last_name': string // e.g. 'Baranov',
  'first_name': string // e.g. 'Yaroslav'
}

export enum PassDirection {
  in = 'in',
  out = 'out'
}

export enum OfficeLocation {
  ODS = 'ODS',
  KBP = 'KBP',
  HRK = 'HRK'
}

export class FetchStatusError extends Error {
  response: Response;

  constructor(message: string, response: Response) {
    super(message);
    this.response = response;
  }
}

export class OfficeTimeUnauthorizedError extends FetchStatusError {
    constructor(message: string, response: Response) {
    super(message, response);
  }
}


export async function fetchOfficeTimeEvents(
  zone: OfficeLocation,
  employeeId: number,
  fromTime: number,
  tillTime: number,
  basicAuthToken: string,
  timeout: number
  ): Promise<OfficeTimeEvent[]> {
  const requestUrl = 
    `${JSON_API_URL}/events.php?` + 
    `zone=${zone}&employeeId=${employeeId}&from=${fromTime}&till=${tillTime}`;
  
  const requestOptions: RequestInit = {
    headers: {
      'Authorization': `Basic ${basicAuthToken}` 
    },
    'timeout': timeout
  }

  const resp: Response = await fetch(requestUrl, requestOptions);
  const respText = await resp.text();
  if (!resp.ok) {
    if (resp.status === 401) {
      throw new OfficeTimeUnauthorizedError('Office Time returns 401 Unauthorized.', resp);
    } else {
      throw new FetchStatusError('response was not OK. Status:' + resp.status +' Text:' + respText, resp);
    }
  }
  return JSON.parse(respText);
}

export async function getEmployees(basicAuthToken: string, timeout: number): Promise<Employee[]> {
  const requestOptions: RequestInit = {
    headers: {
      'Authorization': `Basic ${basicAuthToken}` 
    },
    'timeout': timeout
  }
  const resp: Response = await fetch(`${JSON_API_URL}/employees.php`, requestOptions);
  const respText = await resp.text();
  if (!resp.ok) {
    if (resp.status === 401) {
      throw new OfficeTimeUnauthorizedError('Office Time returns 401 Unauthorized.', resp);
    } else {
      throw new FetchStatusError('response was not OK. Status:' + resp.status +' Text:' + respText, resp);
    }
  }
  return JSON.parse(respText);
}

