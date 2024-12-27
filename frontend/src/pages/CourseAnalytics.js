import React, { useEffect, useState } from "react";
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
  const navigate = useNavigate();

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

        const unitsResponse = await axios.get(
          `http://localhost:5000/api/units/${courseId}`
        );

        const analytics = response.data.data;
        const allUnits = unitsResponse.data;

        prepareScrollChartOptions(analytics.scrollPercentages, allUnits);
        prepareTimeChartOptions(analytics.timeSpent, allUnits);
      } catch (error) {
        console.error("Error fetching analytics data:", error.message);
      }
    };

    fetchAnalytics();
  }, [courseId]);

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
          </div>
          <div className="scrollPercentageNonVideo">
            <AgCharts options={scrollNonVideoChartOptions} />
          </div>
        </div>
      </div>

      <div className="timeSpent">
        <h1>What took you long to understand</h1>
        <div className="structureTime">
          <div className="timeSpentVideo">
              <AgCharts options={timeVideoChartOptions} />
            </div>
            <div className="timeSpentNonVideo">
              <AgCharts options={timeNonVideoChartOptions} />
            </div>
        </div>
      </div>
    </div>
  );
}

export default CourseAnalytics;