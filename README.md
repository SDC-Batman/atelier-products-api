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
Two databases considered were Postgresql and Mongodb. I chose Postgresql because the data I have is structured and highly relational. The biggest reason why I went with postgresql was because this microservice is read-only and with Postgres indexing, I could optimize my queries to be around 0.1 ms. The main trade off I made choosing Psql vs Mongo is Postgresql is not horizontally scalable. Although, with choosing Postgresql, I did not have to transform my data so much and instead added foreing keys and indexing to the tables.

<img src="screenshots/index-query-plan.png" width="500" height="200">

![psql](screenshots/index-query-plan.png)

## Local Testing
K6 was used as the testing tool. The goal was to have response time be under 50ms.

## Cloud Testing
- ### Bare
- ### With Load Balancing
- ### With Load Balancing and Caching
-
