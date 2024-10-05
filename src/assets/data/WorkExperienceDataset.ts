import { WorkExperienceData } from "../../Models/WorkExperienceData";

const WorkExperienceDataset: WorkExperienceData[] = [
    {
        id: 1,
        title: 'Software Development Intern',
        company: 'Cyret Technologies Inc.',
        location: 'Manassas, VA',
        description: `Developed a React Native mobile app that boosted customer engagement by 30% and sales by 20%. Built APIs with Express.js, optimized PostgreSQL on OCI, cutting costs by 30%, and created an admin panel with real-time analytics.`,
        fromDate: 'May 2022',
        toDate: 'Aug 2022'
    },
    {
        id: 2,
        title: 'Graduate Teaching Assistant',
        company: 'George Mason University',
        location: 'Fairfax, VA',
        description: `Served as a Graduate Teaching Assistant for courses in Information Security, Planning Foundations, Object-Oriented Software Specification, and Secure Programming from Spring 2022 to Spring 2023, supporting student learning and assisting faculty with course administration.<br />`,
        fromDate: 'Jan 2022',
        toDate: 'May 2023'
    },
    {
        id: 3,
        title: 'Software Developer',
        company: 'Uniplus Consultants, Inc.',
        location: 'Manassas, VA',
        description: `Developed React.js and Java Spring Boot web applications, boosting user engagement by 30% and conversion rates by 20%. Deployed applications using Docker for scalable cloud and on-prem environments, cutting deployment time by 50% and improving availability by 25%. Managed Linux servers to ensure security and high availability.`,
        fromDate: 'Aug 2023',
        toDate: 'Nov 2023'
    },
    {
        id: 4,
        title: 'Software Developer',
        company: 'Int\'l Brotherhood of Electrical Workers',
        location: 'Washington, DC',
        description: `Refactored legacy applications using Angular 17 and C# .NET 8, improving performance by 30% and reducing errors by 50%. Engineered Apple Wallet Passes for events, cutting wait times by 40% and increasing attendee satisfaction by 25%. Automated scheduled tasks with custom C# Windows services, reducing manual labor by 40%, and optimized data retrieval with SQL scripts, cutting query time by 50%. Maintained ASP.NET Core applications and utilized BitBucket for version control and collaboration.`,
        fromDate: 'Dec 2023',
        toDate: 'Present'
    }
]

export default WorkExperienceDataset;