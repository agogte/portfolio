export interface WorkExperienceData {
    id: Number,
    title: String,
    company: String,
    location: String,
    highlights: String[],
    fromDate: String,
    toDate: String | null
}