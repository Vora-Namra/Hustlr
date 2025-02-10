const formatDate = (dateString:string)=>{
    const date =new Date(dateString);
    const options={year:'numeric'as const,month:'short'as const};
    return date.toLocaleDateString('en-US',options);
}


 function timeAgo(dateInput: Date | string | number): string {
    const now = new Date();
    const past = new Date(dateInput);
    const secondsElapsed = Math.floor((now.getTime() - past.getTime()) / 1000);
  
    if (secondsElapsed < 60) {
      return secondsElapsed + " seconds ago";
    }
  
    const minutesElapsed = Math.floor(secondsElapsed / 60);
    if (minutesElapsed < 60) {
      return minutesElapsed + " minutes ago";
    }
  
    const hoursElapsed = Math.floor(minutesElapsed / 60);
    if (hoursElapsed < 24) {
      return hoursElapsed + " hours ago";
    }
  
    const daysElapsed = Math.floor(hoursElapsed / 24);
    if (daysElapsed < 30) {
      return daysElapsed + " days ago";
    }
  
    const monthsElapsed = Math.floor(daysElapsed / 30);
    if (monthsElapsed < 12) {
      return monthsElapsed + " months ago";
    }
  
    const yearsElapsed = Math.floor(monthsElapsed / 12);
    return yearsElapsed + " years ago";
  }

export {formatDate,timeAgo};