import http from 'k6/http';
import {sleep} from 'k6';

const API_BASE_URL = 'https://localhost:3000/products/4/styles'

export const options = {
  insecureSkipTLSVerify: true,
  noConnectionReuse: false,
  stages: [
    {duration: '1m', target: 100}, // simulate ramp-up of traffic from 1-100 in 5m
    {duration: '5m', target: 1000},
    {duration: '2m', target: 0},
  ],
  thresholds: {
    http_req_duration: ['p(95)<1500'], // 99% of rqs must be complete below 1.5s
  },
};

export default () => {

  let response = http.get("http://localhost:3000/products/1234/styles");

  sleep(1);
}