import { IconBriefcase, IconMapPin, IconPremiumRights, IconRecharging } from "@tabler/icons-react"

const card=[
    {name:"Location", icon:IconMapPin, value:"New York"},
    {name:"Experience", icon:IconBriefcase, value:"Expert"},
    {name:"Salary", icon:IconPremiumRights, value:"48 LPA"},
    {name:"Job Type", icon:IconRecharging, value:"Full Time"},
]
const skills=['React', 'Spring Boot', 'Java', 'Python', 'Node.js', 'MongoDB', 'Express', 'Django', 'PostgreSQL']
const desc="<h4>About The Job</h4><p>Here at UIHUT, we are a passionate, fun-loving, growing team. We are looking for passionate programmers who want to solve technical challenges and learn and incorporate new technologies into their skillset to join our team and grow with us. In this role, you would use various tech stacks, including Laravel, Node JS (Adonis JS), Vue JS, React JS, Nuxt JS, Redis, MySQL, MongoDB, and CSS. You will be engaged across the software development life cycle to create and modify platforms and capabilities in a collaborative and agile environment.</p><h4>Responsibilities</h4><ul><li>Design, build, test, and deploy software applications and features</li><li>Carry software products through the software development life cycle (SDLC)</li><li>Write clean, concise, and efficient code</li><li>Manage code documentation and version control</li><li>Troubleshoot and debug software</li><li>Participate in on-call rotation to respond to production issues</li></ul><h4>Qualifications and Skill Sets</h4><ul><li>3+ years of professional experience working on this field</li><li>Bachelor's degree in computer science, software engineering, or related field</li><li>Proficiency in at least one programming language (e.g., Java, C#, C++)</li><li>Back-end development expertise</li><li>Strong problem-solving and communication skills</li><li>Experience with build tools such as Gradle and Maven</li><li>Good working knowledge of the Linux operating system</li></ul>"

const experience = [
    {
      id: 1,
      title: "Software Engineer",
      company: "TechCorp Solutions",
      location: "San Francisco, CA",
      startDate: "January 2021",
      endDate: "Present",
      description: "Developing and maintaining scalable web applications using React, Node.js, and PostgreSQL.",
    },
    {
      id: 2,
      title: "Frontend Developer Intern",
      company: "Creative Innovations",
      location: "New York, NY",
      startDate: "June 2020",
      endDate: "December 2020",
      description: "Designed and implemented responsive user interfaces using HTML, CSS, and JavaScript.",
    },
    {
      id: 3,
      title: "Junior Software Developer",
      company: "NextGen Systems",
      location: "Austin, TX",
      startDate: "July 2018",
      endDate: "May 2020",
      description: "Assisted in the development of backend services using Java and Spring Boot.",
    },
  ];
export  {card, skills, desc,experience};