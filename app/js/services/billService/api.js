'use strict';
import http from 'axios';
import R from 'ramda';

const get = R.composeP(R.prop('data'), url => http.get(url));

const getBill = () => get('https://still-scrubland-9880.herokuapp.com/bill.json');

export default {
  getBill,
};
