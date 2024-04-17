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
import { useAdminContext } from '../../context/AdminContext';
import { useEffect, useState } from 'react';

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
      position: 'top',
      labels: {
        boxWidth: 14,
        boxHeight: 13,
        font: {
          size: 13
        },
        color: '#000'
      }
    },
    title: {
      display: true,
      text: 'Bar Chart',
      position: 'bottom',
      color: '#000'
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: '#000',
      },
    },
    y: {
      grid: {
        display: false,
      },
      ticks: {
        color: '#000',
      },
    },
  },
};

const BarChart = () => {
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
    labels: labels.length ? labels : ['No data'],
    datasets: [
      {
        label: "Accepted",
        data: acceptedData,
        borderColor: "#4ecdc4",
        backgroundColor: "#4ecdc4",
      },
      {
        label: "Pending",
        data: pendingData,
        borderColor: "#00A8E8",
        backgroundColor: "#00A8E8",
      },
      {
        label: "Rejected",
        data: rejectedData,
        borderColor: "#DB7A6B",
        backgroundColor: "#DB7A6B",
      },
      {
        label: "Validation Error",
        data: validationErrorData,
        borderColor: "#6A8EAE",
        backgroundColor: "#6A8EAE",
      },
      {
        label: "CBP Down",
        data: cbpDownData,
        borderColor: "#004D66",
        backgroundColor: "#004D66",
      },
    ],
  };

  return <Bar options={options} data={data} style={{background:"#fff"}}/>;
};


export default BarChart;
