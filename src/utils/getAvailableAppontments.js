export const getAvailableAppointments = (existingAppointments) => {
  const availableTime = [];
  const startTimeOfDay = "2021-03-03T08:00:00+0000";
  const endTimeOfDay = "2021-03-03T17:00:00+0000";
  let currTime = startTimeOfDay;
  let currIndex = 0;

  //Sort the array of existing appointments from the earliest start time to the latest start time
  const sortedAppointments = existingAppointments.sort(
    (objA, objB) => Date.parse(objA.startTime) - Date.parse(objB.startTime)
  );

  while (currIndex < sortedAppointments.length) {
    //First if block to identify the available appointment times and add them to the availableTime array
    if (
      (new Date(sortedAppointments[currIndex].startTime) - new Date(currTime)) /
        60000 >=
      60
    ) {
      availableTime.push(
        Intl.DateTimeFormat("en-US", {
          hour: "numeric",
          minute: "numeric",
        }).format(new Date(currTime).getTime() - 7 * 3600 * 1000)
      );

      //Increase the current time by 1 hour
      currTime = new Date(currTime).setTime(
        new Date(currTime).getTime() + 60 * 60 * 1000
      );
    }

    //If the current time cannot have 1 hour of free time until the start time of the next appointment then this else if block runs.
    else if (
      (new Date(sortedAppointments[currIndex].startTime) - new Date(currTime)) /
        60000 <
      60
    ) {
      //Set the current time to be the end time of the appointment the current index is currently at.
      currTime = new Date(sortedAppointments[currIndex].endTime);

      //In the case if the any existing appointment but the last one has the latest end time that's also nearest to 5pm and also cannot form a 1 hour free time period, then we do not want to consider adding any more appointment to the array.
      if (
        (new Date(endTimeOfDay) -
          new Date(sortedAppointments[currIndex].endTime)) /
          60000 <
        60
      ) {
        break;
      }

      //Add new appointment time and increase the current time variable by 1 hour.
      else if (
        (new Date(endTimeOfDay) - new Date(currTime)) / 60000 >= 60 &&
        currIndex === sortedAppointments.length - 1
      ) {
        availableTime.push(
          Intl.DateTimeFormat("en-US", {
            hour: "numeric",
            minute: "numeric",
          }).format(new Date(currTime).getTime() - 7 * 3600 * 1000)
        );
        currTime = new Date(currTime).setTime(
          new Date(currTime).getTime() + 60 * 60 * 1000
        );
      }

      //Increase the index
      currIndex++;
    }
  }

  //If there is still enough time between the endTimeOfDay (5pm) and endTime of the last existing appointment then we continue to find the available start times that can have 1 hour period.
  while ((new Date(endTimeOfDay) - new Date(currTime)) / 60000 >= 60) {
    availableTime.push(
      Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "numeric",
      }).format(new Date(currTime).getTime() - 7 * 3600 * 1000)
    );
    currTime = new Date(currTime).setTime(
      new Date(currTime).getTime() + 60 * 60 * 1000
    );
  }

  return availableTime;
};
