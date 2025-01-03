import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AgCharts } from "ag-charts-react";

function GeneralAnalytics() {
  const [scrollChartOptions, setScrollChartOptions] = useState(null);
  const [timeChartOptions, setTimeChartOptions] = useState(null);
  const [personalisedTexts, setPersonalisedTexts] = useState([]);
  const [scrollGeneralMessage, setScrollGeneralMessage] = useState("");
  const [timeGeneralMessage, setTimeGeneralMessage] = useState("");
  const navigate = useNavigate();

  /**
   * Calculates the average of an array of numeric values.
   * @param {Array<number>} values - Array of numeric values.
   * @returns {number} The calculated average. Returns 0 if the array is empty.
   */
  const calculateAverageForText = useCallback((values) => {
    if (!values.length) return 0;
    const total = values.reduce((sum, value) => sum + value, 0);
    return total / values.length;
  }, []);
  
  /**
   * Retrieves a personalized message based on the average value and type.
   * @param {number} average - Calculated average value.
   * @param {string} type - The type of personalized message.
   * @param {Array} texts - Array of personalized texts.
   * @returns {string} Personalized message.
   */
  const getPersonalizedMessage = useCallback((average, type) => {
    const message = personalisedTexts.find(
      (text) =>
        text.type === type &&
        average >= text.average[0] &&
        average <= text.average[1]
    );
    if (!message) return "No personalized message available.";
    const roundedAverage = Math.round(average);
    return `${message.firstPartText} ${roundedAverage} ${message.secondPartText}`;
  }, [personalisedTexts]);

  /**
   * Fetches and processes analytics data for all courses, including scroll percentages and time spent, 
   * grouped by units with and without videos. Updates chart options state.
   * @param {Array} courses - List of all courses.
   * @param {Array} units - List of all units.
   * @param {Array} scrollData - User scroll analytics for all units.
   * @param {Array} timeSpentData - User time spent analytics for all units.
   */
  useEffect(() => {
    const fetchGeneralAnalytics = async () => {
      try {
        const token = localStorage.getItem("token");
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const userId = decodedToken.id;

        const coursesResponse = await axios.get("http://localhost:5000/api/courses");
        const unitsResponse = await axios.get("http://localhost:5000/api/units");
        const scrollResponse = await axios.get(
          "http://localhost:5000/api/data-visualisation/analytics/scroll",
          { params: { userId }, headers: { Authorization: `Bearer ${token}` } }
        );
        const timeResponse = await axios.get(
            "http://localhost:5000/api/data-visualisation/analytics/time-spent",
            { params: { userId }, headers: { Authorization: `Bearer ${token}` } }
          );

        const textsResponse = await axios.get("http://localhost:5000/api/personalised-texts")

        setPersonalisedTexts(textsResponse.data);
        const courses = coursesResponse.data;
        const units = unitsResponse.data;
        const scrollData = scrollResponse.data.data;
        const timeSpentData = timeResponse.data.data;

        const averageScrollGeneral = calculateAverageForText(
          scrollData.map((entry) => entry.scrollPercentage)
        );
        const averageTimeGeneral = calculateAverageForText(
          timeSpentData.map((entry) => entry.timeSpent)
        );

        const scrollMessage = getPersonalizedMessage(
          averageScrollGeneral,
          "averageScrollGeneral"
        );
        const timeMessage = getPersonalizedMessage(
          averageTimeGeneral,
          "averageTimeGeneral"
        );

        setScrollGeneralMessage(scrollMessage);
        setTimeGeneralMessage(timeMessage);

        /**
         * Processes scroll percentage data for each course and groups it into units with and without videos.
         * @param {Array} courses - Array of all courses.
         * @param {Array} units - Array of all units.
         * @param {Array} scrollData - Array of scroll percentage records for all units.
         * @returns {Array} Array of objects containing course name and grouped scroll averages for units with and without videos.
         */
        const groupedScrollData = courses.map((course) => {
            const courseUnits = units.filter((unit) => unit.courseId === course._id);
            
            const courseScrollData = scrollData.filter(scroll => 
                courseUnits.some(unit => unit._id === scroll.unitId)
            );
            
            const scrollWithVideo = courseScrollData
                .filter(scroll => scroll.videoIncluded)
                .map(scroll => scroll.scrollPercentage);
            
            const scrollWithoutVideo = courseScrollData
                .filter(scroll => !scroll.videoIncluded)
                .map(scroll => scroll.scrollPercentage);

            const withVideoAvg = calculateAverage(scrollWithVideo);
            const withoutVideoAvg = calculateAverage(scrollWithoutVideo);

            return {
                courseName: course.title,
                withVideo: withVideoAvg,
                withoutVideo: withoutVideoAvg,
            };
            });

            /**
             * Processes time spent data for each course and groups it into units with and without videos.
             * @param {Array} courses - Array of all courses.
             * @param {Array} units - Array of all units.
             * @param {Array} timeSpentData - Array of time spent records for all units.
             * @returns {Array} Array of objects containing course name and grouped time spent averages for units with and without videos.
             */
            const groupedTimeData = courses.map((course) => {
                const courseUnits = units.filter((unit) => unit.courseId === course._id);

                const courseTimeData = timeSpentData.filter(time => 
                    courseUnits.some(unit => unit._id === time.unitId)
                );
                
                const timeWithVideo = courseTimeData
                    .filter(time => time.videoIncluded)
                    .map(time => time.timeSpent);
                
                const timeWithoutVideo = courseTimeData
                    .filter(time => !time.videoIncluded)
                    .map(time => time.timeSpent);

                return {
                    courseName: course.title,
                    withVideo: calculateAverage(timeWithVideo),
                    withoutVideo: calculateAverage(timeWithoutVideo),
                };
            });

            const scrollOptions = {
                data: groupedScrollData,
                height: 600,
                title: {
                    text: "Average Scroll Percentage per Course (Grouped by Video)",
                    fontSize: 20,
                },
                series: [
                    {
                    type: "bar",
                    direction: "horizontal",
                    xKey: "courseName",
                    yKey: "withVideo",
                    yName: "With Video",
                    fill: "#007bff",
                    label: {
                        formatter: (params) => `${Math.round(params.value)}%`,
                    },
                    },
                    {
                    type: "bar",
                    direction: "horizontal",
                    xKey: "courseName",
                    yKey: "withoutVideo",
                    yName: "Without Video",
                    fill: "#FF9999",
                    label: {
                        formatter: (params) => `${Math.round(params.value)}%`,
                    },
                    },
                ],
                axes: [
                    {
                    type: "category",
                    position: "left",
                    title: {
                        text: "Courses",
                    },
                    },
                    {
                    type: "number",
                    position: "bottom",
                    title: {
                        text: "Average Scroll Percentage",
                    },
                    min: 0,
                    max: 100,
                    },
                ],
                legend: {
                    enabled: true,
                    position: "right",
                },
            };

            const timeOptions = {
                data: groupedTimeData,
                height: 400,
                padding: {
                left: 80,
                right: 0,
                top: 0,
                bottom: 0
                },
                title: {
                text: "Average Time Spent per Course (Grouped by Video)",
                fontSize: 20,
                },
                series: [
                    {
                    type: "bar",
                    xKey: "courseName",
                    yKey: "withVideo",
                    yName: "With Video",
                    fill: "#007bff",
                    label: {
                        formatter: (params) => `${Math.round(params.value)}s`,
                    },
                    },
                    {
                    type: "bar",
                    xKey: "courseName",
                    yKey: "withoutVideo",
                    yName: "Without Video",
                    fill: "#FF9999",
                    label: {
                        formatter: (params) => `${Math.round(params.value)}s`,
                    },
                    },
                ],
                axes: [
                {
                    type: "category",
                    position: "bottom",
                    title: {
                    text: "Courses",
                    },
                    label: {
                    rotation: 335
                    }
                },
                {
                    type: "number",
                    position: "left",
                    title: {
                    text: "Average Time Spent (seconds)",
                    },
                    min: 0,
                },
                ],
                legend: {
                enabled: true,
                position: "right",
                },
            };

        setScrollChartOptions(scrollOptions);
        setTimeChartOptions(timeOptions);
      } catch (error) {
        console.error("Error fetching general analytics data:", error.message);
      }
    };

    fetchGeneralAnalytics();
  }, [calculateAverageForText, getPersonalizedMessage]);

  /**
   * Calculates the average of an array of numeric values.
   * @param {Array<number>} values - Array of numeric values.
   * @returns {number} The calculated average. Returns 0 if the array is empty.
   */
  const calculateAverage = (values) => {
    if (values.length === 0) return 0;
    const total = values.reduce((sum, value) => sum + value, 0);
    return total / values.length;
  };

  if (!scrollChartOptions || !timeChartOptions) return <p>Loading analytics...</p>;

  /**
   * Handles "Exit" button click.
   */
  const handleExit = () => {
    navigate('/');
  };

  return (
    <div className="generalAnalytics">
      <button className="exitButtonAnalytics" onClick={handleExit}>
        X
      </button>
      <h1>General Analytics</h1>

      <div className="generalScrollBehaviour">
        <AgCharts options={scrollChartOptions} />
        <p>{scrollGeneralMessage}</p>
      </div>

      <div className="generalTimeBehaviour">
        <AgCharts options={timeChartOptions} />
        <p>{timeGeneralMessage}</p>
      </div>
    </div>
  );
}

export default GeneralAnalytics;