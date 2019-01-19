import { fetchOfficeTimeEvents, OfficeLocation } from '../dist';

(async () => {
  const r = await fetchOfficeTimeEvents(OfficeLocation.ODS, 190, Date.now()-3600*24*3, Date.now(), '<token_here>', 10000);
  console.log(r);
})();