// todo: user id by name / email
// idea: glo cli client

const fetch = require('node-fetch');
import { RequestInit, Response } from 'node-fetch';

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


export async function fetchOfficeTimeEvents(
  zone: OfficeLocation,
  employeeId: number,
  fromTime: number,
  tillTime: number,
  basicAuthToken: string,
  timeout: number
  ): Promise<OfficeTimeEvent[]> {
  const requestUrl = 
    `https://portal-ua.globallogic.com/officetime/json/events.php?` + 
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
    const err = new FetchStatusError('response was not OK. Status:' + resp.status +' Text:' + respText, resp);
    throw err;
  }
  return JSON.parse(respText);
}
