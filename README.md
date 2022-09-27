 # Atelier Product Profile Microservice
---
 Atelier product profile is a microservice that was scaled on AWS EC2 instance using 2 host servers, caching and load balancing.

 ## Tech Stack
 ---
Development: ![node](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) ![express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)\
Database: ![postgresql](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)\
Cloud Side: ![nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white) ![aws](https://img.shields.io/badge/Amazon_AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white)

# Details
---
For testing, the most complex select query in this microservice, styles, is chosen. Tests are benchmarked at 1000 clients per second.

## DataBase Selection:
Two databases considered were Postgresql and Mongodb. I chose Postgresql because the data I have is structured and highly relational. The biggest reason why I went with postgresql was because this microservice is read-only and with Postgres indexing, I could optimize my queries to be around 0.1 ms.

<img src="screenshots/index-query-plan.png" width="500" height="200">

## Local Testing
K6 was used as the testing tool. The goal was to have average response time to be under 50ms.

<img src="screenshots/styles-local-load-test-k6.png" width="500" height="200">

## Cloud Testing
- ### One Host
Microservice was deployed to an Amazon EC2 instance that was located in the US West coast. Before caching, and with only one host 1000 rps had a high latency at around ~3326ms and ~1.3% of the requests were timing out.

<img src="screenshots/styles-1000-b4-loadbalance.png">

- ### After Load Balancing With Two Hosts
Adding a second server and balancing the load using the server with least connection method drastically changed the latency, bringing it down to ~460ms. Though the error rate was still high.

<img src="screenshots/styles-1000-loadbalance.png">

Changed the load balancer's configuration to keep 20 connections alive at a time, even though it brought down the error rate, it was still above the desired min, 1%.

<img src="screenshots/styles-keepalive-1000.png">

- ### After Adding Caching

Finally added caching using Nginx. As a result, queries response latency went down to ~62ms and error rate to 0%.


<img src="screenshots/styles-after-caching.png">

# Feature Improvements
---
Possible next steps to increase the throughput would be to add more servers. Another step would be to upgrade to more powerful machines.

# Dependencies
---
Needs npm install.
Check out package.jsonfor further details.
