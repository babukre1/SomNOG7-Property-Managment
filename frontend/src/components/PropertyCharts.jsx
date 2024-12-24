import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Box, Card, CardContent, Typography } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function PropertyCharts({ properties }) {
  // Data preparation for Status Chart
  const statusCounts = properties.reduce(
    (counts, property) => {
      counts[property.status]++;
      return counts;
    },
    { Pending: 0, Approved: 0, Rejected: 0 }
  );

  const propertyTypeCounts = properties.reduce(
    (counts, property) => {
      counts[property.propertyType]++;
      return counts;
    },
    { Residential: 0, Commercial: 0, Agricultural: 0, Industrial: 0 }
  );

  const statusData = {
    labels: ["Pending", "Approved", "Rejected"],
    datasets: [
      {
        label: "Property Status",
        data: Object.values(statusCounts),
        backgroundColor: ["#fbbf24", "#22c55e", "#ef4444"],
      },
    ],
  };

  const typeData = {
    labels: ["Residential", "Commercial", "Agricultural", "Industrial"],
    datasets: [
      {
        label: "Property Types",
        data: Object.values(propertyTypeCounts),
        backgroundColor: ["#60a5fa", "#f87171", "#a3e635", "#c084fc"],
      },
    ],
  };

  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
      {/* Status Chart */}
      <Card>
        <CardContent>
          <Typography variant="h6" component="div" align="center" gutterBottom>
            Properties by Status
          </Typography>
          <Bar data={statusData} options={{ responsive: true }} />
        </CardContent>
      </Card>

      {/* Type Chart */}
      <Card>
        <CardContent>
          <Typography variant="h6" component="div" align="center" gutterBottom>
            Properties by Type
          </Typography>
          <Pie data={typeData} options={{ responsive: true }} />
        </CardContent>
      </Card>
    </Box>
  );
}

export default PropertyCharts;
