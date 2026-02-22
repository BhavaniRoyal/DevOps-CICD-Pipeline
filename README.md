![ci-cd](https://github.com/BhavaniRoyal/DevOps-CICD-Pipeline/actions/workflows/ci-cd.yml/badge.svg)
# Enterprise CI/CD Pipeline (iOS + Microservices) — Portfolio Demo

This repository demonstrates a **production-style CI/CD pipeline** that a real team could use to ship:
- **backend microservices** (containerized with Docker)
- optional **iOS app build automation** (via Fastlane — scaffold included)

It includes:
- PR checks (tests, lint, security scan)
- Docker image build + push
- Staging deploy to Kubernetes
- Manual approval gate
- Production deploy
- Slack notifications (optional)

![Enterprise CI/CD Pipeline](docs/pipeline.png)

---

## How it works (high-level)

1. **Push / Pull Request** triggers the pipeline
2. Run **unit tests + lint + security scan**
3. Build **Docker image** for a sample service
4. Push image to container registry (**GHCR** by default)
5. Deploy to **Staging** namespace on Kubernetes
6. Run basic **health checks**
7. **Manual approval gate**
8. Deploy to **Production**
9. Notify Slack (optional)

---

## Tech stack

- **GitHub Actions** (CI/CD orchestration)
- **Docker** (build & package)
- **GitHub Container Registry (GHCR)** (artifact registry)
- **Kubernetes** (staging + production)
- **kustomize-ready manifests** (plain YAML included)
- **Trivy** (container/file system security scan)
- Optional: **Fastlane** (iOS build automation)

---

## Repo structure

- `.github/workflows/ci-cd.yml` — full CI/CD workflow
- `sample-service/` — tiny Node.js service with tests
- `k8s/` — Kubernetes manifests (staging + production)
- `scripts/` — helper scripts
- `docs/` — architecture snapshot for your portfolio

---

## Quickstart (run locally)

### 1) Run the sample service
```bash
cd sample-service
npm install
npm test
npm start
# open http://localhost:3000/health
```

### 2) Build the Docker image
```bash
docker build -t sample-service:local ./sample-service
docker run -p 3000:3000 sample-service:local
```

---

## Deploy to Kubernetes (manual)

> You can use **minikube**, **kind**, or any cluster.

### Staging
```bash
kubectl apply -f k8s/staging-namespace.yaml
kubectl apply -f k8s/staging-deployment.yaml
kubectl apply -f k8s/staging-service.yaml
kubectl -n staging get pods
```

### Production
```bash
kubectl apply -f k8s/production-namespace.yaml
kubectl apply -f k8s/production-deployment.yaml
kubectl apply -f k8s/production-service.yaml
kubectl -n production get pods
```

---

## CI/CD configuration

### Required GitHub Secrets
For GHCR push from GitHub Actions, **no extra secrets** are required (uses `GITHUB_TOKEN`).

Optional:
- `SLACK_WEBHOOK_URL` — if you want Slack deployment notifications

### Kubernetes deploy from Actions
This repo includes the workflow steps, but you must add cluster credentials as secrets:
- `KUBE_CONFIG_DATA` (base64-encoded kubeconfig)

See `scripts/kubeconfig_to_base64.sh`.

---

## Portfolio-ready summary

**Enterprise CI/CD Pipeline (GitHub Actions + Docker + Kubernetes + GitOps-ready)**
- Automated tests, lint, and security scanning on every PR
- Built and published Docker images to GHCR
- Deployed to Kubernetes staging and production with manual approval gates
- Integrated notifications and health checks for reliable releases

---

## License
MIT
