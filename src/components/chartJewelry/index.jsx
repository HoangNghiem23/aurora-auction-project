import React, { useEffect, useRef, useState } from "react";
import api from "../../config/axios";
import { Chart } from "chart.js";

function ChartJewelry() {
  const [data, setData] = useState([]);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const fecth = async () => {
    try {
      const response = await api.get("/admin/countJewelry");
      console.log(response.data.data);
      setData(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fecth();
  }, []);
  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      chartInstance.current = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: ["jewelryIsSold", "jewelryNotSold"],
          datasets: [
            {
              data: [data.jewelryIsSold, data.jewelryNotSold],
              backgroundColor: ["#FF6384", "#36A2EB"],
            },
          ],
        },
      });
    }
  }, [data]);
  return (
    <div>
      <canvas ref={chartRef} id="myChart"></canvas>
    </div>
  );
}

export default ChartJewelry;
