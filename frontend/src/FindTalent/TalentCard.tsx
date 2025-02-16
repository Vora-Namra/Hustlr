import { IconCalendarMonth, IconHeart, IconMapPin } from '@tabler/icons-react';
import { Avatar, Button, Divider, Modal, Text } from '@mantine/core';
import { Link, useParams } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useRef, useState } from 'react';
import { DateInput, TimeInput } from '@mantine/dates';
import { getProfileByApplicantId } from '../Services/ProfileService';
import { changeAppStatus } from '../Services/JobService';
import { errorNotification, successNotification } from '../Services/NotificationService';
import { formatInterviewTime, openResume } from '../Services/Utilities';

function TalentCard(props: any) {
  const {id} = useParams();
  const [opened, { open, close }] = useDisclosure(false);
  const [profile, setProfile] = useState<any>(null);
  const [app,{open:openApp,close:closeApp}] = useDisclosure(false); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [time,setTime] = useState<any>(null);
  const ref = useRef<HTMLInputElement>(null);

  
  const handleOffer=(status:string)=>{
    let interview = {
      id:id,
      applicantId: props.applicantId, 
      applicationStatus: status,
      interviewTime: date?.toISOString() 
    };
    if(status=="INTERVIEWING"){
      const [hours,minutes]= time.split(":").map(Number);
      date?.setHours(hours,minutes);
      
      interview={...interview, interviewTime:date?.toISOString() };
    }
      
    changeAppStatus(interview).then((res)=>{
      if(status=="INTERVIEWING")successNotification('Interview Scheduled', 'Interview Scheduled Successfully');
      else if(status=="OFFERED")successNotification("Offered","Offer has been sent Successfully.");
      else successNotification("Rejected","Applicant Had been Rejected.");
      window.location.reload();
      close();
    }).catch((err)=>{
      errorNotification('Error', err.response?.data?.errorMessage || 'Operation failed');
    })
  }

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const data = props.applicantId 
          ? await getProfileByApplicantId(props.applicantId)
          : props;
        setProfile(data);
        setError(null);
      } catch (err: any) {
        console.error('Error loading profile:', err);
        setError(err.response?.data?.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [props.applicantId, props]);



  if (loading) {
    return (
      <div className="bg-mine-shaft-900 p-4 w-96 flex flex-col gap-2 rounded-xl border border-transparent animate-pulse">
        <div className="h-6 bg-mine-shaft-800 rounded w-3/4"></div>
        <div className="h-4 bg-mine-shaft-800 rounded w-1/2"></div>
        <div className="h-24 bg-mine-shaft-800 rounded mt-2"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-mine-shaft-900 p-4 w-96 flex flex-col gap-2 rounded-xl border border-red-500/30">
        <Text color="red" size="sm">Error: {error}</Text>
      </div>
    );
  }

  return (
    <div className="bg-mine-shaft-900 p-4 w-96 flex flex-col gap-2 rounded-xl border border-transparent hover:border-bright-sun-400 transition-all duration-300">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <div className="p-2 bg-mine-shaft-800 rounded-full">
            <Avatar 
              size="lg" 
              src={profile?.picture 
                ? `data:image/jpeg;base64,${profile.picture}`
                : '/avatar.png'
              }
              alt="Profile picture"
            />
          </div>
          <div>
            <div className="font-semibold text-lg">
              {props.name || 'No name available'}
            </div>
            <div className="text-sm text-mine-shaft-300">
              {[profile?.jobTitle, profile?.company].filter(Boolean).join(' • ') || 'No position information'}
            </div>
          </div>
        </div>
        <div>
          <IconHeart className="text-mine-shaft-300 pr-2 cursor-pointer" />
        </div>
      </div>

      <div className="gap-2 flex flex-wrap">
        {profile?.skills?.map((skill: string, index: number) => (
          <div
            key={index}
            className="p-2 py-1 bg-mine-shaft-800 text-bright-sun-400 rounded-lg text-xs"
          >
            {skill}
          </div>
        ))}
      </div>

      <Text className="!text-xs !my-1 !text-mine-shaft-300 !text-justify" lineClamp={4}>
        {profile?.about || 'No description available'}
      </Text>

      <Divider size="xs" color="mineShaft.7" />

      {props.invited ? (
        <div className='flex gap-1 text-mine-shaft-200 text-sm items-center'>
          <IconCalendarMonth stroke={1.5} /> 
          Interview : {formatInterviewTime(props.interviewTime)}
        </div>
      ) : (
        <div className="flex justify-between">
          <div className="font-semibold text-mine-shaft-200">
            {props.expectedCtc || 'CTC not specified'}
          </div>
          <div className="flex gap-1 text-xs items-center text-mine-shaft-400">
            <IconMapPin className="h-5 w-5" stroke={1.5} />
            {profile?.location || 'Location not specified'}
          </div>
        </div>
      )}

      <Divider size="xs" color="mineShaft.7" />

      <div className="flex [&>*]:w-1/2 [&>*]:p-1">
        {!props.invited ? (
          <>
            <Link to={`/talent-profile/${profile?.id}`}>
              <Button color="brightSun.4" fullWidth variant="outline">
                Profile
              </Button>
            </Link>
            <div>
              {props.posted ? (
                <Button 
                  onClick={open} 
                  rightSection={<IconCalendarMonth className="w-5 h-5" />} 
                  color="brightSun.4" 
                  fullWidth 
                  variant="light"
                >
                  Schedule
                </Button>
              ) : (
                <Button color="brightSun.4" fullWidth variant="light">
                  Message
                </Button>
              )}
            </div>
          </>
        ) : (
         props.invited && <>
            <div>
              <Button color="brightSun.4" onClick={()=>handleOffer("OFFERED")} fullWidth variant="outline">
                Accept
              </Button>
            </div>
            <div>
              <Button color="brightSun.4" onClick={()=>handleOffer("REJECTED")} fullWidth variant="outline">
                Reject
              </Button>
            </div>
          </>
        )}
      </div>
      {(props.invited || props.posted)&&<Button color="brightSun.4" fullWidth variant="filled" autoContrast onClick={openApp}>
                View Application
              </Button>}

      <Modal opened={opened} onClose={close} title="Schedule Interview" centered>
        <div className='flex flex-col gap-4'>
          <DateInput 
            minDate={new Date()} 
            value={date} 
            onChange={setDate} 
            label="Date" 
            placeholder="Enter Date" 
          />
          <TimeInput 
            label="Time" 
            ref={ref} 
            value={time}
            onChange={(event)=>setTime(event.currentTarget.value)}
            onClick={() => ref.current?.showPicker()} 
          />
          <Button color="brightSun.4" onClick={()=>handleOffer("INTERVIEWING")} fullWidth variant="light">
            Schedule
          </Button>
        </div>
      </Modal>
      <Modal opened={app} onClose={closeApp} title="Application" centered>
        <div className='flex flex-col gap-4'>
          <div>Email: &emsp; <a className='text-bright-sun-400 hover:underline cursor-pointer text-center' href={`mailto:${props.email}`}>{props.email}</a></div>
          <div>
            Website: &emsp; <a target='_blank' className='text-bright-sun-400 hover:underline cursor-pointer text-center' href={props.website}>{props.website}</a>
          </div>
        <div>
          Resume: &emsp; <span className='text-bright-sun-400 hover:underline cursor-pointer text-center' onClick={()=>openResume(props.resume)}>{props.name}</span>
        </div>
        <div>
          Cover Letter:  &emsp; <div>{props.coverLetter}</div>
        </div>
        </div>
      </Modal>
    </div>
  );
}

export default TalentCard;