import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AgCharts } from "ag-charts-react";

/**
 * Renders analytics for a specific course.
 * @returns {JSX.Element} The CourseAnalytics component displaying charts.
 */
function CourseAnalytics() {
  const { courseId } = useParams();
  const [courseName, setCourseName] = useState("");
  const [scrollVideoChartOptions, setScrollVideoChartOptions] = useState(null);
  const [scrollNonVideoChartOptions, setScrollNonVideoChartOptions] = useState(null);
  const [timeVideoChartOptions, setTimeVideoChartOptions] = useState(null);
  const [timeNonVideoChartOptions, setTimeNonVideoChartOptions] = useState(null);
  const [personalisedTexts, setPersonalisedTexts] = useState([]);
  const [scrollNonVideoMessage, setScrollNonVideoMessage] = useState("");
  const [scrollVideoMessage, setScrollVideoMessage] = useState("");
  const [timeVideoMessage, setTimeVideoMessage] = useState("");
  const [timeNonVideoMessage, setTimeNonVideoMessage] = useState("");
  const [lastViewedMessage, setLastViewedMessage] = useState("");
  const navigate = useNavigate();

  /**
   * Calculates the number of days since the last unit in the specified course was viewed.
   * 
   * @param {string} courseId - The ID of the course to check.
   * @returns {Promise<number|null>} The number of days since the last view, or null if no activity is found.
   */
  const calculateDaysSinceLastViewed = useCallback(async (courseId) => {
    try {
      const token = localStorage.getItem("token");
      const userActivitiesResponse = await axios.get(
        `http://localhost:5000/api/user-activity`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      const userActivities = userActivitiesResponse.data;
  
      const filteredActivities = userActivities.filter(
        (activity) => activity.courseId === courseId
      );
  
      if (filteredActivities.length === 0) return null;
  
      const mostRecentDate = filteredActivities
        .map((activity) => activity.viewedAt.split("T")[0]) 
        .sort((a, b) => new Date(b) - new Date(a))[0];
  
      const today = new Date();
      const lastViewedDate = new Date(mostRecentDate);
      const timeDifference = today - lastViewedDate;
  
      return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    } catch (error) {
      console.error("Error calculating days since last viewed:", error);
      return null;
    }
  }, []);    

  /**
   * Calculates the average time spent on non-video units for a given dataset.
   * 
   * @param {Array} timeData - Array of time spent data for units.
   * @param {Array} allUnits - Array of all units to filter non-video units.
   * @returns {number} The average time spent on non-video units. Returns 0 if no non-video units are found.
   */
  const calculateAverageTimeSpentNonVideo = useCallback((timeData, allUnits) => {
    const nonVideoUnits = allUnits.filter((unit) => !unit.videoURL);
  
    if (nonVideoUnits.length === 0) return 0;
  
    let totalTime = 0;
    let countedUnits = 0;
  
    nonVideoUnits.forEach((unit) => {
      const timeItem = timeData.find((data) => data.unitId === unit._id);
      if (timeItem && typeof timeItem.timeSpent === "number") {
        totalTime += timeItem.timeSpent;
        countedUnits++;
      }
    });
  
    return countedUnits > 0 ? totalTime / countedUnits : 0;
  }, []);  

  /**
   * Calculates the average scroll percentage for non-video units.
   * 
   * @param {Array} scrollData - Array of scroll data for units.
   * @param {Array} allUnits - Array of all units to filter non-video units.
   * @returns {number} The average scroll percentage for non-video units. Returns 0 if no non-video units are found.
   */
  const calculateAverageScrollNonVideo = useCallback((scrollData, allUnits) => {
    const nonVideoUnits = allUnits.filter((unit) => !unit.videoURL);
  
    if (nonVideoUnits.length === 0) return 0;
  
    let totalScroll = 0;
    let countedUnits = 0;
  
    nonVideoUnits.forEach((unit) => {
      const scrollItem = scrollData.find((data) => data.unitId === unit._id);
      if (scrollItem && typeof scrollItem.scrollPercentage === "number") {
        totalScroll += scrollItem.scrollPercentage;
        countedUnits++;
      }
    });
  
    return countedUnits > 0 ? totalScroll / countedUnits : 0;
  }, []);  

  /**
   * Calculates the average time spent on video units.
   * 
   * @param {Array} timeData - Array of time spent data for units.
   * @param {Array} allUnits - Array of all units to filter video units.
   * @returns {number} The average time spent on video units. Returns 0 if no video units are found.
   */
  const calculateAverageTimeSpentVideo = useCallback((timeData, allUnits) => {
    const videoUnits = allUnits.filter((unit) => unit.videoURL);
  
    if (videoUnits.length === 0) return 0;
  
    let totalTime = 0;
    let countedUnits = 0;
  
    videoUnits.forEach((unit) => {
      const timeItem = timeData.find((data) => data.unitId === unit._id);
      if (timeItem && typeof timeItem.timeSpent === "number") {
        totalTime += timeItem.timeSpent;
        countedUnits++;
      }
    });
  
    return countedUnits > 0 ? totalTime / countedUnits : 0;
  }, []);  

  /**
   * Calculate the average scroll percentage for video units in the current course.
   * @param {Array} scrollData - Array of scroll analytics for all units.
   * @param {Array} allUnits - Array of all units for the course.
   * @returns {number} The average scroll percentage.
   */
  const calculateAverageScrollVideo = useCallback((scrollData, allUnits) => {
    const videoUnits = allUnits.filter(
      (unit) => unit.videoURL
    );
    
    if (videoUnits.length === 0) return 0;

    let totalScroll = 0;
    let countedUnits = 0;

    videoUnits.forEach((unit) => {
      const scrollItem = scrollData.find((data) => data.unitId === unit._id);
      if (scrollItem && typeof scrollItem.scrollPercentage === 'number') {
        totalScroll += scrollItem.scrollPercentage;
        countedUnits++;
      }
    });

    return countedUnits > 0 ? totalScroll / countedUnits : 0;
  }, []);

  /**
   * Get a personalized message based on the average value and type.
   * @param {number} average - The calculated average value.
   * @param {string} type - The type of personalized message.
   * @returns {string} The personalized message.
   */
  const getPersonalizedMessageScroll = useCallback((average, type) => {
  
    const message = personalisedTexts.find((text) => {
      if (!Array.isArray(text.average) || text.average.length !== 2) {
        console.log("Invalid average range:", text);
        return false;
      }
      const [min, max] = text.average;
      const isMatch = text.type === type && average >= min && average <= max;
      return isMatch;
    });
  
    if (!message) {
      console.error("No matching personalised message found.", {
        average,
        type,
        personalisedTexts,
      });
      return "No personalised message available.";
    }
  
    const roundedAverage = Math.round(average);
    return `${message.firstPartText} ${roundedAverage}% ${message.secondPartText}`;
  }, [personalisedTexts]);
  
  /**
   * Retrieves a personalized message based on the average value and type.
   * 
   * @param {number} average - The calculated average value.
   * @param {string} type - The type of personalized message to retrieve.
   * @returns {string} A personalized message corresponding to the provided average and type.
   */
  const getPersonalizedMessageTime = useCallback((average, type) => {
  
    const message = personalisedTexts.find((text) => {
      if (!Array.isArray(text.average) || text.average.length !== 2) {
        console.log("Invalid average range:", text);
        return false;
      }
      const [min, max] = text.average;
      const isMatch = text.type === type && average >= min && average <= max;
      return isMatch;
    });
  
    if (!message) {
      console.error("No matching personalised message found.", {
        average,
        type,
        personalisedTexts,
      });
      return "No personalised message available.";
    }
  
    const roundedAverage = Math.round(average);
    return `${message.firstPartText} ${roundedAverage} ${message.secondPartText}`;
  }, [personalisedTexts]);

  /**
   * useEffect to fetch analytics data for a specific course and prepare chart options.
   * Fetches course details, analytics data, and unit details. The data is used to prepare scroll percentage and time spent chart options.
   * @param {String} courseId - The ID of the course to fetch analytics for.
   */
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem("token");
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const userId = decodedToken.id;

        const courseResponse = await axios.get(
          `http://localhost:5000/api/courses/${courseId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCourseName(courseResponse.data.title);

        const response = await axios.get(
          `http://localhost:5000/api/data-visualisation/analytics/${courseId}`,
          { params: { userId }, headers: { Authorization: `Bearer ${token}` } }
        );

        const textsResponse = await axios.get("http://localhost:5000/api/personalised-texts");
        setPersonalisedTexts(textsResponse.data);

        const unitsResponse = await axios.get(
          `http://localhost:5000/api/units/${courseId}`
        );

        const analytics = response.data.data;
        const allUnits = unitsResponse.data;

        const averageScrollVideo = calculateAverageScrollVideo(
          analytics.scrollPercentages,
          allUnits
        );
        const message = getPersonalizedMessageScroll(averageScrollVideo, "averageScrollVideo");
        setScrollVideoMessage(message);

        const averageScrollNonVideo = calculateAverageScrollNonVideo(
          analytics.scrollPercentages,
          allUnits
        );
        const nonVideoMessage = getPersonalizedMessageScroll(averageScrollNonVideo, "averageScrollNonVideo");
        setScrollNonVideoMessage(nonVideoMessage);

        const averageTimeSpentVideo = calculateAverageTimeSpentVideo(
          analytics.timeSpent,
          allUnits
        );
        const videoTimeMessage = getPersonalizedMessageTime(averageTimeSpentVideo, "averageTimeSpentVideo");
        setTimeVideoMessage(videoTimeMessage);

        const averageTimeSpentNonVideo = calculateAverageTimeSpentNonVideo(
          analytics.timeSpent,
          allUnits
        );
        const nonVideoTimeMessage = getPersonalizedMessageTime(averageTimeSpentNonVideo, "averageTimeSpentNonVideo");
        setTimeNonVideoMessage(nonVideoTimeMessage);

        const daysSinceLastViewed = await calculateDaysSinceLastViewed(courseId);
        if (daysSinceLastViewed !== null) {
          const lastViewedMessage = getPersonalizedMessageTime(
            daysSinceLastViewed,
            "averageDaysBetween"
          );
          setLastViewedMessage(lastViewedMessage);
        }

        prepareScrollChartOptions(analytics.scrollPercentages, allUnits);
        prepareTimeChartOptions(analytics.timeSpent, allUnits);
      } catch (error) {
        console.error("Error fetching analytics data:", error.message);
      }
    };

    fetchAnalytics();
  }, [courseId, calculateAverageScrollVideo, getPersonalizedMessageScroll, getPersonalizedMessageTime, calculateAverageScrollNonVideo, calculateAverageTimeSpentVideo, calculateAverageTimeSpentNonVideo, calculateDaysSinceLastViewed]);

  /**
   * Prepares chart options for scroll percentage data grouped by units with and without videos.
   * @param {Array} scrollPercentage - Array of scroll percentage data for units.
   * @param {Array} allUnits - Array of all units for the course.
  */
  const prepareScrollChartOptions = (scrollPercentage, allUnits) => {
    const unitData = allUnits.map((unit) => {
      const existingData = scrollPercentage.find((d) => d.unitId === unit._id);
      return {
        unitTitle: unit.title,
        scrollPercentage: existingData ? existingData.scrollPercentage : 0,
        videoIncluded: existingData ? existingData.videoIncluded : false,
      };
    });

    const videoUnits = unitData.filter((unit) => unit.videoIncluded);
    const nonVideoUnits = unitData.filter((unit) => !unit.videoIncluded);

    const videoOptions = {
      data: videoUnits,
      title: {
        text: "Scroll percentage for units with video",
        fontSize: 20,
      },
      series: [
        {
          type: "bar",
          direction: "horizontal",
          xKey: "unitTitle",
          yKey: "scrollPercentage",
          fill: "#99CCFF",
          label: {
            formatter: (params) =>
              params.value ? `${Math.round(params.value)}%` : "",
          },
        },
      ],
      axes: [
        {
          type: "category",
          position: "left",
          title: {
            text: "Units with video",
          },
        },
        {
          type: "number",
          position: "bottom",
          title: {
            text: "Scroll Percentage",
          },
          min: 0,
          max: 100,
        },
      ],
      legend: {
        enabled: false,
      },
    };

    const nonVideoOptions = {
      data: nonVideoUnits,
      title: {
        text: "Scroll percentage for units without video",
        fontSize: 20,
      },
      series: [
        {
          type: "bar",
          direction: "horizontal",
          xKey: "unitTitle",
          yKey: "scrollPercentage",
          fill: "#FF9999",
          label: {
            formatter: (params) =>
              params.value ? `${Math.round(params.value)}%` : "",
          },
        },
      ],
      axes: [
        {
          type: "category",
          position: "left",
          title: {
            text: "Units without video",
          },
        },
        {
          type: "number",
          position: "bottom",
          title: {
            text: "Scroll Percentage",
          },
          min: 0,
          max: 100,
        },
      ],
      legend: {
        enabled: false,
      },
    };

    setScrollVideoChartOptions(videoOptions);
    setScrollNonVideoChartOptions(nonVideoOptions);
  };

  /**
   * Prepares chart options for time spent data grouped by units with and without videos.
   * @param {Array} timeSpentData - Array of time spent data for units.
   * @param {Array} allUnits - Array of all units for the course.
  */
  const prepareTimeChartOptions = (timeSpentData, allUnits) => {
    const unitData = allUnits.map((unit) => {
      const existingData = timeSpentData.find((d) => d.unitId === unit._id);
      return {
        unitTitle: unit.title,
        timeSpent: existingData ? existingData.timeSpent : 0,
        videoIncluded: existingData ? existingData.videoIncluded : false,
      };
    });

    const videoUnits = unitData.filter((unit) => unit.videoIncluded);
    const nonVideoUnits = unitData.filter((unit) => !unit.videoIncluded);

    const maxTimeSpent = Math.max(
      ...unitData.map((unit) => unit.timeSpent),
      0
    );

    const videoOptions = {
      data: videoUnits,
      title: {
        text: "Time Spent on units with Video",
        fontSize: 20,
      },
      series: [
        {
          type: "bar",
          direction: "vertical",
          xKey: "unitTitle",
          yKey: "timeSpent",
          fill: "#99CCFF",
          label: {
            formatter: (params) =>
              params.value ? `${Math.round(params.value)}s` : "",
          },
        },
      ],
      axes: [
        {
          type: "category",
          position: "bottom",
          title: {
            text: "Units with video",
          },
        },
        {
          type: "number",
          position: "left",
          title: {
            text: "Time Spent (seconds)",
          },
          min: 0,
          max: maxTimeSpent,
        },
      ],
      legend: {
        enabled: false,
      },
    };

    const nonVideoOptions = {
      data: nonVideoUnits,
      title: {
        text: "Time Spent on units without Video",
        fontSize: 20,
      },
      series: [
        {
          type: "bar",
          direction: "vertical",
          xKey: "unitTitle",
          yKey: "timeSpent",
          fill: "#FF9999",
          label: {
            formatter: (params) =>
              params.value ? `${Math.round(params.value)}s` : "",
          },
        },
      ],
      axes: [
        {
          type: "category",
          position: "bottom",
          title: {
            text: "Units without video",
          },
        },
        {
          type: "number",
          position: "left",
          title: {
            text: "Time Spent (seconds)",
          },
          min: 0,
          max: maxTimeSpent, 
        },
      ],
      legend: {
        enabled: false,
      },
    };

    setTimeVideoChartOptions(videoOptions);
    setTimeNonVideoChartOptions(nonVideoOptions);
  };

  if (
    !scrollVideoChartOptions ||
    !scrollNonVideoChartOptions ||
    !timeVideoChartOptions ||
    !timeNonVideoChartOptions
  )
  return <p>Loading analytics...</p>;

  /**
   * Handles "Exit" button click.
   */
  const handleExit = () => {
    navigate('/');
  };

  return (
    <div className="analyticsCourse">
      <button className="exitButtonAnalytics" onClick={handleExit}>
        X
      </button>
      <h1>{courseName}</h1>
      <div className="scrollPercentage">
        <h1>Your scroll behaviour</h1>
        <div className="structureScroll">
          <div className="scrollPercentageVideo">
            <AgCharts options={scrollVideoChartOptions} />
            <p>{scrollVideoMessage}</p>
          </div>
          <div className="scrollPercentageNonVideo">
            <AgCharts options={scrollNonVideoChartOptions} />
            <p>{scrollNonVideoMessage}</p>
          </div>
        </div>
      </div>

      <div className="timeSpent">
        <h1>What took you long to understand</h1>
        <div className="structureTime">
          <div className="timeSpentVideo">
              <AgCharts options={timeVideoChartOptions} />
              <p>{timeVideoMessage}</p>
            </div>
            <div className="timeSpentNonVideo">
              <AgCharts options={timeNonVideoChartOptions} />
              <p>{timeNonVideoMessage}</p>
            </div>
        </div>
      </div>
      <div className="timePassed">
        <h1>When was the last time you checked a unit?</h1>
        <p>{lastViewedMessage}</p>
      </div>
    </div>
  );
}

export default CourseAnalytics;