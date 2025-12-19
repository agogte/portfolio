import { WorkExperienceData } from "../../Models/WorkExperienceData";

const WorkExperienceDataset: WorkExperienceData[] = [
  {
    id: 1,
    title: "Software Developer",
    company: "Ranjana’s Beauty Academy",
    location: "Mumbai, India",
    fromDate: "Jun 2020",
    toDate: "Jun 2021",
    highlights: [
      "Built and deployed a full-stack appointment scheduling platform used in daily operations.",
      "Implemented real-time notifications using AWS SNS for reliable event delivery."
    ]
  },
  {
    id: 2,
    title: "Software Development Intern",
    company: "Cyret Technologies Inc.",
    location: "Manassas, VA",
    fromDate: "May 2022",
    toDate: "Aug 2022",
    highlights: [
      "Developed a React Native mobile app increasing engagement by 30% and sales by 20%.",
      "Built and optimized backend APIs and databases, reducing infrastructure costs by 30%."
    ]
  },
  {
    id: 3,
    title: "Graduate Teaching Assistant",
    company: "George Mason University",
    location: "Fairfax, VA",
    fromDate: "Jan 2022",
    toDate: "May 2023",
    highlights: [
      "Supported instruction for secure programming and software engineering courses.",
      "Mentored students on object-oriented design and secure coding practices."
    ]
  },
  {
    id: 4,
    title: "Software Developer",
    company: "Uniplus Consultants, Inc.",
    location: "Manassas, VA",
    fromDate: "Aug 2023",
    toDate: "Nov 2023",
    highlights: [
      "Built React and Spring Boot services, improving user engagement by 30%.",
      "Implemented Docker-based CI/CD pipelines, cutting deployment time by 50%."
    ]
  },
  {
    id: 5,
    title: "Software Engineer II",
    company: "International Brotherhood of Electrical Workers",
    location: "Washington, DC",
    fromDate: "Dec 2023",
    toDate: "Present",
    highlights: [
      "Architected event-driven microservices, increasing throughput by 40% and reducing latency by 35%.",
      "Achieved 99.99% uptime through blue/green deployments and production-grade CI/CD.",
      "Owned system architecture, releases, and reliability in production."
    ]
  }
];

export default WorkExperienceDataset;
