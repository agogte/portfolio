import React from "react";
import WorkExperienceDataset from "../assets/data/WorkExperienceDataset";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

const WorkExperience = () => {
  return (
    <div
      name="WorkExperience"
      className="w-full h-screen py-28 bg-gradient-to-b from-black to-gray-800 text-white"
    >
      <div className="max-w-screen-lg mx-auto px-4">
        <div className="mb-16">
          <p className="text-5xl font-bold sm:text-4xl">Work Experience</p>
        </div>
        <VerticalTimeline>
          {WorkExperienceDataset.slice()
            .reverse()
            .map((element) => (
              <VerticalTimelineElement
                key={element.id}
                contentStyle={{
                  background: "transparent",
                  boxShadow: "none",
                }}
                contentArrowStyle={{ display: "none" }}
                iconStyle={{
                  background: "#6b7280",
                  boxShadow: "none",
                }}
              >
                <div className="bg-gray-900/80 border border-gray-700 rounded-xl p-6 space-y-4 mt-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xl font-semibold">{element.company}</p>
                      <p className="text-sm text-gray-400">
                        {element.title} · {element.location}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 sm:mt-0">
                      {element.fromDate} – {element.toDate}
                    </p>
                  </div>

                  {/* Highlights
                  <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
                    {element.highlights.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul> */}
                </div>
              </VerticalTimelineElement>
            ))}
        </VerticalTimeline>
      </div>
    </div>
  );
};

export default WorkExperience;
