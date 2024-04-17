import { useEffect, useState } from 'react';
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
import { useUserContext } from '../../context/UserContext';

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
        color: '#000'
      }
    },
    title: {
      display: true,
      text: 'Line Chart ',
      color: '#000',
      position: 'bottom',
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

interface LineChartData {
  date: number;
  acceptedCount: number;
  pendingCount: number;
  rejectedCount: number;
  cbpDownCount: number;
  validationErrorCount: number;
}

const LineChart = () => {
  const { trendsData } = useUserContext();
  const [responseData, setResponseData] = useState<LineChartData[]>([]);

  useEffect(() => {
    if (trendsData && trendsData.dailyAuditData && trendsData.dailyAuditData.length > 0) {
      setResponseData(trendsData.dailyAuditData);
    }
    else if (trendsData && trendsData.trendsData) {
      const monthNames = Object.keys(trendsData.trendsData);
      const data = monthNames.map((month) => {
        const monthData = trendsData.trendsData[month];
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
  }, [trendsData]);

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

  return (
    <Line options={options} data={data} style={{background:"#fff"}}/>
  );
};

export default LineChart;
