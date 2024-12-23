import React from 'react'
import Header from '../Header/Header'
import DreamJob from '../LandingPage/DreamJob'
import Companies from '../LandingPage/Companies'
import JobCategory from '../LandingPage/JobCategory'
import Working from '../LandingPage/Working'
import Testimonials from '../LandingPage/Testimonials'
import Footer from '../Footer/Footer'
function HomePage() {
  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-['poppins']">
  
    <DreamJob/>
    <Companies/>
    <JobCategory/>
    <Working/>
    <Testimonials/>
   
    </div>
  )
}

export default HomePage