import request from './networkManager';
import { requestType } from './util';

const endpoint = {
  business: {
    searchBusiness: 'businesses/search',
  },
};

export async function searchBusiness(postData) {
  try {
    const response = await request(endpoint.business.searchBusiness, requestType.get, postData);
    return response;
  } catch(err) {
    return err
  }
}