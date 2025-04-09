# 🎬 OTT Platform Backend Architecture (Production-Ready)

This document serves as a production-ready, scalable backend blueprint for building a Netflix-style OTT platform.

---

## 📌 1. System Overview

- Cloud-native microservice architecture  
- Node.js + TypeScript for services  
- PostgreSQL (RDS), Redis (ElastiCache)  
- S3 for storage, CloudFront for CDN  
- FFmpeg-powered transcoding with ECS Workers  
- RESTful APIs (OpenAPI Spec)  
- CI/CD with GitHub Actions  
- Terraform for infrastructure automation  

---

## 🧱 2. Folder Structure (Monorepo)

/backend ├── services/ │ 
        ├── user-service/ │ │
        ├── src/ │ 
        │ │ ├── controllers/ │ 
        │ │ ├── services/ │ 
        │ │ ├── models/ │ 
        │ │ ├── middlewares/ │ 
        │ │ ├── utils/ │ 
        │ │ ├── routes/ │
        │ │ └── index.ts │ 
        │ └── tests/ │ 
        ├── content-service/
        │  
        ├── streaming-service/ │ 
        ├── payment-service/ │ 
        └── ffmpeg-worker/ 
        ├── libs/
        │ ├── auth/ │ 
        ├── logger/ │ 
        ├── database/ 
        │ └── config/ 
        ├── infra/ │
        ├── vpc/ │ 
        ├── ecs/ │ 
        ├── rds/ │ 
        └── s3/ 
        ├── docker-compose.yml 
        └── README.md


---

## 🧪 3. Tech Stack

- Language: Node.js (TypeScript)  
- Database: PostgreSQL (Amazon RDS)  
- Cache: Redis (ElastiCache)  
- Storage: Amazon S3  
- CDN: CloudFront  
- Message Queue: Amazon SQS  
- Container Runtime: Docker + ECS Fargate  
- CI/CD: GitHub Actions  
- Infra-as-Code: Terraform  

---

## 📚 4. API Breakdown by Service

### 👤 user-service

Handles authentication, profile, sessions

| Route     | Method | Description           |
|-----------|--------|-----------------------|
| /signup   | POST   | Register new user     |
| /login    | POST   | Login, return JWT     |
| /me       | GET    | Get user profile      |

---

### 🎞️ content-service

Handles uploads, video metadata, thumbnail gen

| Route         | Method | Description                          |
|---------------|--------|--------------------------------------|
| /videos       | POST   | Upload file → send SQS for FFmpeg    |
| /videos       | GET    | Get all video metadata               |
| /videos/:id   | GET    | Detailed metadata with resolutions   |

---

### 📺 streaming-service

Handles HLS delivery and signed URLs

| Route               | Method | Description                      |
|---------------------|--------|----------------------------------|
| /stream/:id         | GET    | Generate signed CloudFront URL   |
| /stream/hls/:file   | GET    | (Optional) proxy to S3           |

---

### 💳 payment-service

Handles billing, subscriptions with Stripe

| Route         | Method | Description                        |
|---------------|--------|------------------------------------|
| /subscribe    | POST   | Stripe checkout                    |
| /plans        | GET    | Available subscription plans       |
| /webhook      | POST   | Handle Stripe events               |

---

### 🛠️ ffmpeg-worker

SQS-driven Docker worker that transcodes video

**Triggered by SQS Message:**

```json
{
  "videoId": "abc123",
  "s3Key": "uploads/filename.mp4"
}
Worker Logic:

Downloads from S3
Uses FFmpeg to generate HLS (144p to 4K)
Uploads to S3 (/hls/{videoId}/)
Notifies content-service to update metadata
🔁 5. Shared Libraries (/libs)

Library	Purpose
auth/	JWT signing/verification
logger/	Centralized Winston logger
config/	Env variable management
database/	PostgreSQL client (e.g., Prisma)
🚀 6. CI/CD (GitHub Actions)

Per-service CI pipeline:

on:
  push:
    paths:
      - "services/user-service/**"

jobs:
  build-and-deploy:
    steps:
      - Checkout
      - Set up Node
      - Docker Build → Push to ECR
      - Deploy to ECS (via Terraform or CLI)
🧱 7. Terraform Infrastructure Modules

Module	Resources
vpc/	Private + Public Subnets
ecs/	ECS Cluster + Services
rds/	PostgreSQL DB (Multi-AZ)
s3/	Uploads + HLS video storage
redis/	ElastiCache for sessions/cache
sqs/	Transcode job queues
ecr/	Docker image registry
🎥 8. Transcoding Pipeline

Video uploaded via content-service
Pushes SQS job: ffmpeg-worker
FFmpeg command generates:
master.m3u8
144p.m3u8, 360p.m3u8, 720p.m3u8, 1080p.m3u8
Upload to /hls/{videoId}/ in S3
Notify content-service to update metadata
✅ 9. Summary

Feature	Supported
Multi-resolution video	✅ via FFmpeg
Secure Streaming	✅ via signed CDN
Auth & Subscriptions	✅ JWT + Stripe
Scalability	✅ ECS + SQS
Infrastructure	✅ Terraform
Dev & CI/CD	✅ GitHub Actions
