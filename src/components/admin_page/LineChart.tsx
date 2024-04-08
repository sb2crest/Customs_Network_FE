import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useAdminContext } from '../../context/AdminContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        boxWidth: 10,
        boxHeight: 10,
        font: {
          size: 12
        },
        color: '#fff'
      }
    },
    title: {
      display: true,
      text: 'Line Chart ',
      color: '#fff',
      position: 'bottom',
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: '#fff',
      },
    },
    y: {
      grid: {
        display: false,
      },
      ticks: {
        color: '#fff',
      },
    },
  },
};

const LineChart = () => {
  const { adminTrendsData } = useAdminContext();
  const [responseData, setResponseData] = useState([]);

  useEffect(() => {
    if (adminTrendsData && adminTrendsData.totalTransactionCountDtos) {
      setResponseData(adminTrendsData.totalTransactionCountDtos);
    }
    else if (adminTrendsData && adminTrendsData.trendsData) {
      const monthNames = Object.keys(adminTrendsData.trendsData);
      const data = monthNames.map((month) => {
        const monthData = adminTrendsData.trendsData[month];
        return {
          date: month,
          acceptedCount: monthData.acceptedCount,
          pendingCount: monthData.pendingCount,
          rejectedCount: monthData.rejectedCount,
          cbpDownCount: monthData.cbpDownCount,
        };
      });
      setResponseData(data);
    }
  }, [adminTrendsData]);

  const labels = responseData.map((dataItem) => dataItem.date);
  const acceptedData = responseData.map((dataItem) => dataItem.acceptedCount);
  const pendingData = responseData.map((dataItem) => dataItem.pendingCount);
  const rejectedData = responseData.map((dataItem) => dataItem.rejectedCount);
  const cbpDownData = responseData.map((dataItem) => dataItem.cbpDownCount);
  const validationErrorData = responseData.map((dataItem) => dataItem.validationErrorCount);

  const data = {
    labels,
    datasets: [
      {
        label: 'Accepted',
        data: acceptedData,
        borderColor: '#38E54D',
        backgroundColor: '#38E54D',
      },
      {
        label: "Pending",
        data: pendingData,
        borderColor: "#CD5C08",
        backgroundColor: "#CD5C08",
      },
      {
        label: "Rejected",
        data: rejectedData,
        borderColor: "#bf302f",
        backgroundColor: "#bf302f",
      },
      {
        label: "Validation Error",
        data: validationErrorData,
        borderColor: "#F8DE22",
        backgroundColor: "#F8DE22",
      },
      {
        label: "CBP Down",
        data: cbpDownData,
        borderColor: "#12CAD6",
        backgroundColor: "#12CAD6",
      },
    ],
  };

  return (
    <Line options={options} data={data} />
  );
};

export default LineChart;
