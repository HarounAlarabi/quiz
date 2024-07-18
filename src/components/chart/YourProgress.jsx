import React, { useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
import { useQuiz } from "../contexts/QuizContexts";

function YourProgress() {
  const { maxPoints, dispatch, pointsRecord } = useQuiz();
  const chartRef = useRef(null);

  const pointsTotal = pointsRecord.map((record) => record.points);

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  if (!pointsTotal || pointsTotal.length === 0) {
    return <div className="record">No data to display</div>;
  }

  const pointsPercentage = pointsTotal.map(
    (point) => (point / maxPoints) * 100
  );

  const data = {
    labels: pointsTotal.map((_, index) => `RDS ${index + 1}`),
    datasets: [
      {
        label: "Your Progress",
        data: pointsPercentage,
        borderColor: "orange",
        backgroundColor: "rgba(255, 165, 0, 0.2)",
        borderWidth: 2,
        pointBackgroundColor: "white",
        pointBorderColor: "orange",
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
        tension: 0.4,
        showLine: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "white",
        },
      },
      y: {
        min: 10,
        max: 100,
        ticks: {
          stepSize: 10,
          color: "white",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.raw.toFixed(2)}%`;
          },
        },
      },
    },
  };

  return (
    <>
      <div className="recodrs-con">
        <h2>Your Progress</h2>
        <div className="records">
          <Line data={data} options={options} ref={chartRef} />
        </div>
      </div>
      <button
        className="btn btn-restart "
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart
      </button>
    </>
  );
}

export default YourProgress;
