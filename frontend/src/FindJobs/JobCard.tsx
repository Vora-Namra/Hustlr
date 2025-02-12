import { IconBookmark, IconBookmarkFilled, IconClockHour3 } from '@tabler/icons-react';
import { Button, Divider, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import { timeAgo } from '../Services/Utilities';
import { useDispatch, useSelector } from 'react-redux';
import { setProfile } from '../Slices/ProfileSlice';
import { updateProfile } from '../Services/ProfileService';

function JobCard(props: any) {
  const dispatch = useDispatch();
  const profile = useSelector((state: any) => state.profile);

  const handleSavedJob = () => {
    // Check if the profile exists and has an id.
    if (!profile || !profile.id) {
      console.error("Profile id is null or undefined. Make sure the profile is loaded before saving a job.");
      // Optionally, you can show a notification to the user:
      // errorNotification("Profile Error", "Your profile is not loaded. Please refresh or log in again.");
      return;
    }

    // Make sure savedJobs is an array of strings.
    let savedJobs: string[] = profile.savedJobs ? [...profile.savedJobs] : [];
    if (savedJobs.includes(props.id)) {
      savedJobs = savedJobs.filter((id) => id !== props.id);
    } else {
      savedJobs = [...savedJobs, props.id];
    }
    const updatedProfile = { ...profile, savedJobs };

    // Update the profile via API, then update the Redux store.
    updateProfile(updatedProfile)
      .then((res) => {
        dispatch(setProfile(res));
      })
      .catch((err) => {
        console.error("Error updating profile:", err);
      });
  };

  return (
    <div className="bg-mine-shaft-900 p-4 w-72 flex flex-col gap-2 rounded-xl">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <div className="p-2 bg-mine-shaft-800 rounded-md">
            <img
              className="h-7"
              src={`/Icons/${props.company}.png`}
              alt={`${props.company} logo`}
              onError={(e) => {
                e.currentTarget.src = '/Icons/default.png';
              }}
            />
          </div>
          <div>
            <div className="font-semibold">{props.jobTitle}</div>
            <div className="text-sm">
              {props.company} &bull; {props.applicants ? props.applicants.length : 0} Applicants
            </div>
          </div>
        </div>
        <div>
          {profile.savedJobs && profile.savedJobs.includes(props.id) ? (
            <IconBookmarkFilled
              className="text-bright-sun-400 cursor-pointer"
              stroke={1.5}
              onClick={handleSavedJob}
            />
          ) : (
            <IconBookmark
              className="text-mine-shaft-300 hover:text-bright-sun-400 cursor-pointer"
              stroke={1.5}
              onClick={handleSavedJob}
            />
          )}
        </div>
      </div>

      <div className="mt-1 gap-2 flex [&>div]:py-1 [&>div]:px-2 [&>div]:bg-mine-shaft-800 [&>div]:text-bright-sun-400 [&>div]:rounded-lg text-xs">
        <div>{props.experience}</div>
        <div>{props.jobType}</div>
        <div>{props.location}</div>
      </div>

      <Text className="!text-xs !my-1 !text-mine-shaft-300 !text-justify" lineClamp={4}>
        {props.about}
      </Text>
      <Divider size="xs" color="mineShaft.7" />
      <div className="flex justify-between">
        <div className="font-semibold text-mine-shaft-200">&#8377;{props.packageOffered} LPA</div>
        <div className="flex gap-1 text-xs items-center text-mine-shaft-400">
          <IconClockHour3 className="h-5 w-5" stroke={1.5} />
          Posted {timeAgo(props.postTime)}
        </div>
      </div>
      <Link to={`/jobs/${props.id}`}>
        <Button fullWidth color="brightSun.4" variant="outline">
          View Job
        </Button>
      </Link>
    </div>
  );
}

export default JobCard;
