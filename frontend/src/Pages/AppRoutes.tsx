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
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getProfile } from '../Services/ProfileService';
import { setProfile } from '../Slices/ProfileSlice';

const AppRoutes = () => {
  const user = useSelector((state: any) => state.user);
  const profile = useSelector((state: any) => state.profile);
  const dispatch = useDispatch();

  // On app initialization (or after login), if user has a profileId and profile is empty, fetch profile.
  useEffect(() => {
    if (user?.profileId && (!profile || !profile.id)) {
      getProfile(user.profileId)
        .then((data) => {
          dispatch(setProfile(data));
        })
        .catch((err) => console.error("Failed to load profile:", err));
    }
  }, [user, profile, dispatch]);

  return (
    <BrowserRouter>
      <div className='relative'>
        <Header />
        <Divider size="xs" color="mineShaft.7" />
        <Routes>
          <Route path="/find-jobs" element={<FindJobs />} />
          <Route path="/find-talent" element={<FindTalentPage />} />
          <Route path="/jobs/:id" element={<JobDescPage />} />
          <Route path="/apply-job/:id" element={<ApplyJobPage />} />
          <Route path="/posted-job/:id" element={<PostedJobPage />} />
          <Route path="/job-history" element={<JobHistoryPage />} />
          <Route path="/post-job/:id" element={<PostJobPage />} />
          <Route path="/company/:name" element={<CompanyPage />} />
          <Route path="/signup" element={user ? <Navigate to="/" /> : <SignUpPage />} />
          <Route path="/login" element={user ? <Navigate to="/" /> : <SignUpPage />} />
          <Route path='/talent-profile/:id' element={<TalentProfilePage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path="*" element={<HomePage />} />
        </Routes> 
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default AppRoutes;
