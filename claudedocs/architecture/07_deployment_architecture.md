# 배포 아키텍처

## 1. 배포 개요

### 1.1 배포 전략
- **환경**: Development, Staging, Production 3단계
- **방식**: Docker 컨테이너 기반
- **오케스트레이션**: Docker Compose (초기) → Kubernetes (확장 시)
- **CI/CD**: GitHub Actions
- **무중단 배포**: Blue-Green 또는 Rolling Update

### 1.2 인프라 요구사항

#### 최소 사양 (초기 단계)
- **Web/API Server**: 2 vCPU, 4GB RAM
- **Database**: 2 vCPU, 4GB RAM, 50GB SSD
- **Redis**: 1 vCPU, 2GB RAM
- **대역폭**: 100Mbps

#### 권장 사양 (프로덕션)
- **Web/API Server**: 4 vCPU, 8GB RAM (Auto-scaling)
- **Database**: 4 vCPU, 8GB RAM, 100GB SSD
- **Redis**: 2 vCPU, 4GB RAM
- **Load Balancer**: 필수
- **대역폭**: 1Gbps

## 2. Docker 컨테이너화

### 2.1 Frontend Dockerfile
```dockerfile
# frontend/Dockerfile
FROM node:18-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --only=production

FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

### 2.2 Backend Dockerfile (NestJS)
```dockerfile
# backend/Dockerfile
FROM node:18-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --only=production

FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

USER nestjs
EXPOSE 4000

CMD ["node", "dist/main"]
```

### 2.3 Docker Compose (개발 환경)
```yaml
# docker-compose.yml
version: '3.8'

services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile.dev
    ports:
      - "3000:3000"
    volumes:
      - ./frontend:/app
      - /app/node_modules
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
    depends_on:
      - backend

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile.dev
    ports:
      - "4000:4000"
    volumes:
      - ./backend:/app
      - /app/node_modules
    environment:
      - DATABASE_URL=postgresql://postgres:password@postgres:5432/watersafety
      - REDIS_URL=redis://redis:6379
      - JWT_SECRET=dev-secret-key
    depends_on:
      - postgres
      - redis

  postgres:
    image: postgres:15-alpine
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=watersafety
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./nginx/ssl:/etc/nginx/ssl:ro
    depends_on:
      - frontend
      - backend

volumes:
  postgres_data:
  redis_data:
```

### 2.4 Docker Compose (프로덕션)
```yaml
# docker-compose.prod.yml
version: '3.8'

services:
  frontend:
    image: ghcr.io/watersafety/frontend:latest
    restart: always
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_API_URL=https://api.watersafety.org/api/v1
    deploy:
      replicas: 2
      resources:
        limits:
          cpus: '2'
          memory: 4G

  backend:
    image: ghcr.io/watersafety/backend:latest
    restart: always
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
      - REDIS_URL=${REDIS_URL}
      - JWT_SECRET=${JWT_SECRET}
    deploy:
      replicas: 2
      resources:
        limits:
          cpus: '2'
          memory: 4G

  nginx:
    image: nginx:alpine
    restart: always
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.prod.conf:/etc/nginx/nginx.conf:ro
      - /etc/letsencrypt:/etc/letsencrypt:ro
    depends_on:
      - frontend
      - backend
```

## 3. Nginx 설정

### 3.1 Reverse Proxy 설정
```nginx
# nginx/nginx.prod.conf
upstream frontend {
    least_conn;
    server frontend:3000;
}

upstream backend {
    least_conn;
    server backend:4000;
}

# HTTP to HTTPS 리다이렉트
server {
    listen 80;
    server_name watersafety.org www.watersafety.org;
    return 301 https://$server_name$request_uri;
}

# HTTPS 서버
server {
    listen 443 ssl http2;
    server_name watersafety.org www.watersafety.org;

    # SSL 인증서
    ssl_certificate /etc/letsencrypt/live/watersafety.org/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/watersafety.org/privkey.pem;

    # SSL 설정
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # 보안 헤더
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;

    # Gzip 압축
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml text/javascript application/json application/javascript application/xml+rss;

    # API 요청
    location /api/ {
        proxy_pass http://backend/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # 프론트엔드 요청
    location / {
        proxy_pass http://frontend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # 정적 파일 캐싱
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        proxy_pass http://frontend;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

## 4. CI/CD 파이프라인

### 4.1 GitHub Actions Workflow
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches:
      - main

env:
  REGISTRY: ghcr.io
  FRONTEND_IMAGE: ghcr.io/${{ github.repository }}/frontend
  BACKEND_IMAGE: ghcr.io/${{ github.repository }}/backend

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'

      - name: Install dependencies
        run: |
          cd frontend && npm ci
          cd ../backend && npm ci

      - name: Run tests
        run: |
          cd frontend && npm test
          cd ../backend && npm test

      - name: Run linter
        run: |
          cd frontend && npm run lint
          cd ../backend && npm run lint

  build-and-push:
    needs: test
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write

    steps:
      - uses: actions/checkout@v4

      - name: Log in to Container Registry
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Build and push Frontend
        uses: docker/build-push-action@v5
        with:
          context: ./frontend
          push: true
          tags: |
            ${{ env.FRONTEND_IMAGE }}:latest
            ${{ env.FRONTEND_IMAGE }}:${{ github.sha }}

      - name: Build and push Backend
        uses: docker/build-push-action@v5
        with:
          context: ./backend
          push: true
          tags: |
            ${{ env.BACKEND_IMAGE }}:latest
            ${{ env.BACKEND_IMAGE }}:${{ github.sha }}

  deploy:
    needs: build-and-push
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to server
        uses: appleboy/ssh-action@v1.0.0
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            cd /opt/watersafety
            docker-compose pull
            docker-compose up -d --no-deps --build
            docker image prune -f

      - name: Health check
        run: |
          sleep 10
          curl -f https://watersafety.org/api/health || exit 1

      - name: Notify success
        if: success()
        uses: 8398a7/action-slack@v3
        with:
          status: success
          text: '✅ Deployment successful!'
          webhook_url: ${{ secrets.SLACK_WEBHOOK }}

      - name: Notify failure
        if: failure()
        uses: 8398a7/action-slack@v3
        with:
          status: failure
          text: '❌ Deployment failed!'
          webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

## 5. 데이터베이스 마이그레이션

### 5.1 마이그레이션 전략
```bash
# 배포 전 마이그레이션 실행
# .github/workflows/deploy.yml 에 추가

- name: Run database migrations
  run: |
    ssh ${{ secrets.SERVER_USER }}@${{ secrets.SERVER_HOST }} \
      'cd /opt/watersafety/backend && \
       docker-compose exec -T backend npx prisma migrate deploy'
```

### 5.2 Rollback 전략
```bash
# 이전 버전으로 롤백
docker-compose down
docker-compose up -d --no-deps --build \
  -e TAG=previous-stable-version

# 마이그레이션 롤백 (Prisma는 자동 롤백 미지원)
# 수동으로 SQL 스크립트 실행 필요
```

## 6. 모니터링 및 로깅

### 6.1 Prometheus + Grafana
```yaml
# docker-compose.monitoring.yml
version: '3.8'

services:
  prometheus:
    image: prom/prometheus:latest
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus/prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus_data:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'

  grafana:
    image: grafana/grafana:latest
    ports:
      - "3001:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
    volumes:
      - grafana_data:/var/lib/grafana
      - ./grafana/dashboards:/etc/grafana/provisioning/dashboards

  node-exporter:
    image: prom/node-exporter:latest
    ports:
      - "9100:9100"

volumes:
  prometheus_data:
  grafana_data:
```

### 6.2 Prometheus 설정
```yaml
# prometheus/prometheus.yml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

scrape_configs:
  - job_name: 'frontend'
    static_configs:
      - targets: ['frontend:3000']

  - job_name: 'backend'
    static_configs:
      - targets: ['backend:4000']

  - job_name: 'postgres'
    static_configs:
      - targets: ['postgres-exporter:9187']

  - job_name: 'redis'
    static_configs:
      - targets: ['redis-exporter:9121']

  - job_name: 'node'
    static_configs:
      - targets: ['node-exporter:9100']
```

### 6.3 애플리케이션 메트릭 (NestJS)
```typescript
// backend/src/metrics/prometheus.service.ts
import * as promClient from 'prom-client';

export class PrometheusService {
  private readonly register = new promClient.Registry();

  constructor() {
    // 기본 메트릭 수집
    promClient.collectDefaultMetrics({ register: this.register });

    // 커스텀 메트릭
    this.createCustomMetrics();
  }

  private createCustomMetrics() {
    // HTTP 요청 카운터
    const httpRequestCounter = new promClient.Counter({
      name: 'http_requests_total',
      help: 'Total number of HTTP requests',
      labelNames: ['method', 'route', 'status']
    });

    // HTTP 요청 지속 시간
    const httpRequestDuration = new promClient.Histogram({
      name: 'http_request_duration_seconds',
      help: 'Duration of HTTP requests in seconds',
      labelNames: ['method', 'route', 'status'],
      buckets: [0.1, 0.5, 1, 2, 5]
    });

    this.register.registerMetric(httpRequestCounter);
    this.register.registerMetric(httpRequestDuration);
  }

  getMetrics() {
    return this.register.metrics();
  }
}
```

### 6.4 로그 수집 (ELK Stack - 선택사항)
```yaml
# docker-compose.logging.yml
version: '3.8'

services:
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.11.0
    environment:
      - discovery.type=single-node
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
    ports:
      - "9200:9200"
    volumes:
      - elasticsearch_data:/usr/share/elasticsearch/data

  logstash:
    image: docker.elastic.co/logstash/logstash:8.11.0
    volumes:
      - ./logstash/logstash.conf:/usr/share/logstash/pipeline/logstash.conf
    depends_on:
      - elasticsearch

  kibana:
    image: docker.elastic.co/kibana/kibana:8.11.0
    ports:
      - "5601:5601"
    environment:
      - ELASTICSEARCH_HOSTS=http://elasticsearch:9200
    depends_on:
      - elasticsearch

volumes:
  elasticsearch_data:
```

## 7. 백업 전략

### 7.1 데이터베이스 백업
```bash
#!/bin/bash
# scripts/backup-database.sh

BACKUP_DIR="/backups/database"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/watersafety_$DATE.sql.gz"

# 백업 실행
docker exec postgres pg_dump -U postgres watersafety | gzip > $BACKUP_FILE

# 7일 이상 된 백업 삭제
find $BACKUP_DIR -name "*.sql.gz" -mtime +7 -delete

# S3에 업로드
aws s3 cp $BACKUP_FILE s3://watersafety-backups/database/

echo "Backup completed: $BACKUP_FILE"
```

### 7.2 Cron 설정
```cron
# 매일 새벽 2시에 백업
0 2 * * * /opt/watersafety/scripts/backup-database.sh

# 매주 일요일 새벽 3시에 전체 백업
0 3 * * 0 /opt/watersafety/scripts/backup-full.sh
```

## 8. 스케일링 전략

### 8.1 수평 스케일링 (Docker Swarm)
```yaml
# docker-compose.swarm.yml
version: '3.8'

services:
  backend:
    image: ghcr.io/watersafety/backend:latest
    deploy:
      replicas: 3
      update_config:
        parallelism: 1
        delay: 10s
      restart_policy:
        condition: on-failure
      resources:
        limits:
          cpus: '2'
          memory: 4G
        reservations:
          cpus: '1'
          memory: 2G
```

### 8.2 Kubernetes 설정 (확장 시)
```yaml
# k8s/backend-deployment.yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: backend
  template:
    metadata:
      labels:
        app: backend
    spec:
      containers:
      - name: backend
        image: ghcr.io/watersafety/backend:latest
        ports:
        - containerPort: 4000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: backend-secrets
              key: database-url
        resources:
          limits:
            cpu: "2"
            memory: "4Gi"
          requests:
            cpu: "1"
            memory: "2Gi"
        livenessProbe:
          httpGet:
            path: /health
            port: 4000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /health
            port: 4000
          initialDelaySeconds: 5
          periodSeconds: 5

---
apiVersion: v1
kind: Service
metadata:
  name: backend-service
spec:
  selector:
    app: backend
  ports:
  - protocol: TCP
    port: 80
    targetPort: 4000
  type: LoadBalancer

---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: backend-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: backend
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
```

## 9. 호스팅 옵션

### 9.1 Option 1: Naver Cloud Platform
- **장점**: 한국 시장 최적화, 24/7 한국어 지원
- **서비스**: Server, Object Storage, Cloud DB, Load Balancer
- **비용**: 월 약 50만원 (초기 구성 기준)

### 9.2 Option 2: AWS (Seoul Region)
- **장점**: 글로벌 표준, 풍부한 생태계
- **서비스**: EC2, RDS, S3, CloudFront, ALB
- **비용**: 월 약 60만원 (초기 구성 기준)

### 9.3 Option 3: DigitalOcean / Vultr
- **장점**: 비용 효율적, 간단한 관리
- **서비스**: Droplets, Managed Database, Spaces
- **비용**: 월 약 30만원 (초기 구성 기준)

## 10. SSL/TLS 인증서

### 10.1 Let's Encrypt (무료)
```bash
# Certbot 설치 및 인증서 발급
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx

# 인증서 발급
sudo certbot --nginx -d watersafety.org -d www.watersafety.org

# 자동 갱신 설정
sudo certbot renew --dry-run
```

### 10.2 인증서 자동 갱신
```cron
# 매월 1일 자동 갱신
0 0 1 * * /usr/bin/certbot renew --quiet && systemctl reload nginx
```

## 11. 재해 복구 계획 (Disaster Recovery)

### 11.1 백업 정책
- **데이터베이스**: 일일 풀백업, 시간별 증분 백업
- **파일**: S3에 버전 관리 활성화
- **설정**: Git 버전 관리

### 11.2 복구 절차
1. 백업에서 데이터베이스 복원
2. 최신 애플리케이션 이미지 배포
3. S3에서 파일 복원
4. 서비스 상태 확인

## 12. 체크리스트

### 12.1 배포 전 확인사항
- [ ] 환경 변수 설정 완료
- [ ] SSL 인증서 설정
- [ ] 데이터베이스 마이그레이션 테스트
- [ ] 백업 시스템 구성
- [ ] 모니터링 대시보드 설정
- [ ] 로그 수집 시스템 구성
- [ ] 보안 그룹 / 방화벽 설정
- [ ] 도메인 DNS 설정
- [ ] 성능 테스트 완료
- [ ] 롤백 계획 수립

## 13. 다음 단계

- [08_development_roadmap.md](./08_development_roadmap.md): 개발 단계별 계획
