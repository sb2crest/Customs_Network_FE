import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useUserContext } from '../../context/UserContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        boxWidth: 14,
        boxHeight: 13,
        font: {
          size: 13
        },
        color: '#a8a196'
      }
    },
    title: {
      display: true,
      text: 'Bar Chart',
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

const BarChart = () => {
  const { trendsData } = useUserContext();
  const [responseData, setResponseData] = useState([]);

  useEffect(() => {
    if (trendsData && trendsData.dailyAuditDTOS && trendsData.dailyAuditDTOS.length > 0) {
      setResponseData(trendsData.dailyAuditDTOS);
    }
  }, [trendsData]);

  const labels = responseData.map(dataItem => dataItem.date);
  const acceptedData = responseData.map(dataItem => dataItem.acceptedCount);
  const pendingData = responseData.map(dataItem => dataItem.pendingCount);
  const rejectedData = responseData.map(dataItem => dataItem.rejectedCount);
  const cbpDownData = responseData.map(dataItem => dataItem.cbpDownCount);

  const data = {
    labels,
    datasets: [
      {
        label: 'Accepted',
        data: acceptedData,
        borderColor: 'rgb(80 199 147)',
        backgroundColor: 'rgb(80 199 147)',
      },
      {
        label: 'Pending',
        data: pendingData,
        borderColor: 'rgb(250 145 107)',
        backgroundColor: 'rgb(250 145 107)',
      },
      {
        label: 'Rejected',
        data: rejectedData,
        borderColor: '#e53d34',
        backgroundColor: '#e53d34',
      },
      {
        label: 'CBP Down',
        data: cbpDownData,
        borderColor: '#FFD700',
        backgroundColor: '#FFD700',
      },
    ],
  };

  return (
    <Bar options={options} data={data} />
  );
};

export default BarChart;
