
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import FindJobs from './FindJobs';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import FindTalentPage from './FindTalentPage';
import TalentProfilePage from './TalentProfilePage';
import PostJobPage from './PostJobPage';
import JobDescPage from './JobDescPage';
import ApplyJobPage from './ApplyJobPage';
import { CompanyPage } from './CompanyPage';
import { PostedJobPage } from './PostedJobPage';
import { JobHistoryPage } from './JobHistoryPage';
import { SignUpPage } from './SignUpPage';
import { ProfilePage } from './ProfilePage';
import { Divider } from '@mantine/core';
import HomePage from './HomePage';
import { getItem } from '../Services/LocalStorageService';
import { useSelector } from 'react-redux';

const AppRoutes=()=>{
    const user = useSelector((state:any)=>state.user);
    // const user = getItem("user");
   return <BrowserRouter>
      <div className='relative'>
      <Header/>
      <Divider size="xs" color="mineShaft.7" />
        <Routes>
          <Route path="/find-jobs" element={<FindJobs/>} />
          <Route path="/find-talent" element={<FindTalentPage/>} />
          <Route path="/jobs" element={<JobDescPage/>} />
          <Route path="/apply-job" element={<ApplyJobPage/>} />
          <Route path="/posted-job" element={<PostedJobPage/>} />
          <Route path="/job-history" element={<JobHistoryPage/>} />
          <Route path="/post-job" element={<PostJobPage/>} />
          <Route path="/company" element={<CompanyPage/>} />
          <Route path="/signup" element={user?<Navigate to="/"/>:<SignUpPage/>} />
          <Route path="/login" element={user?<Navigate to="/"/>:<SignUpPage/>} />
          <Route path='/talent-profile' element={<TalentProfilePage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
       <Footer/> 
       </div>
      </BrowserRouter>
}

export default AppRoutes;
