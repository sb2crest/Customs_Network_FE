import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

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
      position: "top",
      labels: {
        boxWidth: 14,
        boxHeight: 13,
        font: {
          size: 13,
        },
        color: "#fff",
      },
    },
    title: {
      display: true,
      text: "Bar Chart",
      position: "bottom",
      color: "#fff",
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: "#fff",
      },
    },
    y: {
      grid: {
        display: false,
       
      },
      ticks: {
        color: "#fff",
      },
    },
  },
};

interface BarChartProps {
  responseData: BarChartData[];
}

interface BarChartData {
  date: number;
  acceptedCount: number;
  pendingCount: number;
  rejectedCount: number;
  cbpDownCount: number;
  validationErrorCount: number;
}

const PortBarChart = ({ portTrendsResponseData }: BarChartProps) => {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    const labels = portTrendsResponseData.map((dataItem) => dataItem.date);
    const acceptedData = portTrendsResponseData.map((dataItem) => dataItem.acceptedCount);
    const pendingData = portTrendsResponseData.map((dataItem) => dataItem.pendingCount);
    const rejectedData = portTrendsResponseData.map((dataItem) => dataItem.rejectedCount);
    const cbpDownData = portTrendsResponseData.map((dataItem) => dataItem.cbpDownCount);
    const validationErrorData = portTrendsResponseData.map((dataItem) => dataItem.validationErrorCount);

    const data = {
      labels: labels.length ? labels : ['No data'],
      datasets: [
        {
          label: "Accepted",
          data: portTrendsResponseData.length ? acceptedData : [0], 
          borderColor: "#38E54D",
          backgroundColor: "#38E54D",
        },
        {
          label: "Pending",
          data: pendingData,
          borderColor: "#CD5C08",
          backgroundColor: "#CD5C08",
        },
        {
          label: "Rejected",
          data: portTrendsResponseData.length ? rejectedData : [0],
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

    setChartData(data);
  }, [portTrendsResponseData]);

  return chartData ? <Bar options={options} data={chartData} /> : null;
};

export default PortBarChart;
