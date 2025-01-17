export const PostedJobCard=(props:any)=>{
    return <div className="bg-mine-shaft-900 rounded-xl p-2">
        <div className="">{props.jobTitle}</div>
        <div className="">{props.location}</div>
        <div className="">{props.posted}</div>
    </div>
}