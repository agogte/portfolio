import React from 'react'
import WorkExperienceDataset from '../assets/data/WorkExperienceDataset'
import { VerticalTimeline, VerticalTimelineElement} from 'react-vertical-timeline-component'


const WorkExperience = () => {
  return (
    <div name="WorkExperience" className='w-full h-auto md:h-screen py-10 bg-gradient-to-b to-gray-800 from-black text-white'>
        <div className='max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full'>
        <div className='pb-8'>
          <p className='text-5xl font-bold inline sm:text-4xl'> Work Experience</p>
          <br /><br /><br />
        </div>
        <VerticalTimeline>
        {
            WorkExperienceDataset.slice().reverse().map((element, index) => {
            return (
                <VerticalTimelineElement key={element.id} className="relative">
                <div className="flex flex-row justify-start">
                    <div className="relative w-12 flex flex-col items-center">
                    {index !== WorkExperienceDataset.length - 1 && (
                        <div className="h-full w-0.5 bg-gray-300 absolute top-0" />
                    )}
                    <div className="w-6 h-6 bg-gray-400 rounded-full mb-4 z-10"></div>
                    </div>

                    <div className="ml-4">
                    <div className="flex flex-row justify-between items-center">
                        <p className="text-2xl font-bold">{element.company}</p>
                        <p className="text-lg">{element.fromDate} - {element.toDate}</p>
                    </div>
                    <p className="text-xl text-gray-400">{element.title}</p>
                    <p className="text-md">{element.description}</p>
                    </div>
                </div>
                </VerticalTimelineElement>
            );
            })
        }
        </VerticalTimeline>

        </div>
    </div>
  )
}

export default WorkExperience