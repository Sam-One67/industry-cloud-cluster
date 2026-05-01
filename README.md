# Advanced 3-Tier Microservices Deployment on AWS (K3s)

---

## Summary Of This Project 
This project implements a **3-tier microservices architecture** on an **AWS EC2** instance using a lightweight **K3s (Kubernetes)** cluster. 

The objective was to move beyond simple container orchestration (e.g., Docker Compose) and build a setup that more closely resembles a real-world production deployment. The application is split into three independent services:

*   **Frontend:** React application for the user interface.
*   **Backend:** Node.js / Express API for business logic.
*   **Database:** MongoDB with persistent storage for data integrity.

Each service is containerized and deployed separately, allowing for independent scaling, better fault isolation, and easier maintenance. A major focus was working directly with **Kubernetes primitives**, providing a deeper understanding of networking, service discovery, and resource management.

---

## World Architecture

![Project Diagram](./architecture_4k_3.jpg)

The system is designed with a clear separation of concerns, where each layer runs in its own isolated environment inside the cluster.

### Key Components:
*   **Infrastructure:** AWS EC2 instance hosting the cluster.
*   **Orchestration:** K3s (lightweight Kubernetes distribution).
*   **Storage:** Persistent Volume Claims (PVC) for MongoDB data durability.
*   **Containerization:** Custom Docker images optimized for each service.
*   **Networking:** 
    *   **NodePort:** For external access to the web UI.
    *   **ClusterIP:** For secure, internal communication between services.

---

## Design Approach

### 1. Cloud Infrastructure
The application is deployed on AWS with **Security Groups** configured as a fundamental firewall layer:
*   Only the **Frontend (NodePort: 30001)** is publicly accessible.
*   Backend and Database services are restricted to **internal cluster communication** only.
*   This minimal attack surface ensures better security for sensitive data.

### 2. Multi-Tier Architecture
*   **Frontend Layer:** React-based UI exposed via a Kubernetes Service.
*   **Backend Layer:** Node.js/Express API handling API requests and database interactions.
*   **Data Layer:** MongoDB deployed with persistent storage to ensure data survives pod restarts or failures.

### 3. Manual Deployment Strategy
All resources were deployed using **plain Kubernetes manifests**. This approach was intentional to maintain full granular control over:
*   Resource limits (CPU / Memory).
*   Pod-to-service communication logic.
*   Health checks (Liveness & Readiness probes).
*   Deep debugging and troubleshooting of cluster internals.

---

## ⚙️ Implementation Workflow

### 1. Containerization
*   Created optimized Docker images for frontend and backend tiers.
*   Used environment variables for flexible service configuration.
*   Validated container stability locally before cluster migration.

### 2. Kubernetes Deployment
*   **Namespace Isolation:** Kept resources logically grouped and organized.
*   **Database First:** Deployed MongoDB with PVC before scaling dependent services.
*   **Service Mapping:** Utilized labels and selectors for seamless internal service discovery.
*   **External Access:** Exposed the frontend via NodePort 30001 for public validation.

---

## 📂 Repository Structure
```bash
├── k8s/                  # Kubernetes manifests
│   ├── frontend-deployment.yaml
│   ├── backend-deployment.yaml
│   ├── mongo-deployment.yaml
│   ├── mongo-pvc.yaml
│   └── services.yaml
├── frontend/             # React app + Dockerfile
├── backend/              # Node.js API + Dockerfile
└── README.md             # Project documentation
```
## 🌏 Possible Improvements
*   **Infrastructure as Code:** Provision infrastructure using **Terraform**.
*   **Automation:** Set up automated **CI/CD pipelines** with **GitHub Actions**.
*   **Traffic Management:** Replace NodePort with an **Ingress Controller + SSL/TLS termination**.
*   **Observability:** Add monitoring and alerting using **Prometheus and Grafana**.

---

## 👨‍💻 Engineering Lead
**Muhammad Ahmed**  
*Cloud & DevOps Engineer*  

[![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](YOUR_LINK_HERE) 
[![Portfolio](https://img.shields.io/badge/Portfolio-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)](YOUR_LINK_HERE) 
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:muhammaad.ahmaad123@gmail.com)
