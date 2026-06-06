import { WorkExperienceData } from "../../Models/WorkExperienceData";

const WorkExperienceDataset: WorkExperienceData[] = [
  {
    id: 1,
    title: "Software Developer",
    company: "Ranjana's Beauty Academy",
    location: "Mumbai, India",
    fromDate: "Jun 2020",
    toDate: "Jun 2021",
    highlights: [
      "Engineered and launched a full-stack appointment scheduling platform using Angular and Node.js, automating booking workflows end-to-end and reducing manual administrative effort 50% across 1,000+ monthly bookings.",
      "Built an event-driven notification system using Amazon SNS, achieving 99%+ message delivery reliability and reducing missed appointments 30% through real-time confirmation and reminder workflows."
    ]
  },
  {
    id: 2,
    title: "Software Developer",
    company: "Uniplus Consultants, Inc.",
    location: "Manassas, VA",
    fromDate: "Aug 2023",
    toDate: "Dec 2023",
    highlights: [
      "Designed and operated auto-scaling AWS infrastructure (EC2, S3, ECS, Route 53, CloudWatch) supporting unpredictable workload bursts, improving system availability to 99.9%+ and reducing manual recovery efforts 40%.",
      "Built Docker-based Jenkins CI/CD pipelines with automated integration test gates, cutting deployment cycles from days to hours and enabling zero-downtime releases across multiple production environments.",
      "Enforced least-privilege IAM policies and hardened security group configurations, reducing security misconfigurations 60% and establishing scalable RBAC patterns adopted across the engineering organization."
    ]
  },
  {
    id: 3,
    title: "Software Engineer II",
    company: "International Brotherhood of Electrical Workers",
    location: "Washington, DC",
    fromDate: "Dec 2023",
    toDate: "Present",
    highlights: [
      "Owned end-to-end architecture and delivery of a distributed event-driven microservices platform processing 10k+ transactions using Azure Functions, Message Queue, Custom API Gateway, and C#/.NET, increasing system throughput 40% and reducing P95 latency 35% under heavy transactional production loads.",
      "Architected horizontally scalable ETL/ELT data pipelines using RabbitMQ, achieving zero message loss and full audit traceability across 3–5× traffic spikes serving hundreds of thousands of concurrent users.",
      "Drove a platform-wide SQL Server optimization initiative, reducing query latency 50% through indexing, stored procedure tuning, and query rewrites, directly improving SLA compliance for downstream services.",
      "Built and owned end-to-end observability infrastructure using Prometheus, Grafana, and Application Insights with structured JSON logging — tracking P95 latency, cache performance, and custom alert thresholds to enable proactive incident detection and reduce MTTR 55% across 15+ distributed microservices.",
      "Shipped zero-downtime Blue/Green deployment architecture via GitHub Actions and Azure DevOps CI/CD with Docker and Kubernetes, achieving 99.99% uptime across mission-critical backend systems.",
      "Integrated LLM-powered tooling (Claude) into the engineering SDLC for automated code review, test generation, and design validation, reducing post-release defects 25% and compressing review cycles by 40%."
    ]
  }
];

export default WorkExperienceDataset;
