import React, { useEffect, useState } from "react";
import { FiTrendingDown, FiTrendingUp } from "react-icons/fi";

const StatCards = () => {
  const [stats, setStats] = useState({
    totalTenants: 0,
    totalProperties: 0,
    totalRentedProperties: 0,
    totalMaintenanceRequests: 0,
    completedMaintenanceTasks: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/dashboard");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched data:", data);

        setStats({
          totalTenants: data.totalTenants,
          totalProperties: data.totalProperties,
          totalRentedProperties: data.totalRentedProperties,
          totalMaintenanceRequests: data.totalMaintenanceRequests,
          completedMaintenanceTasks: data.completedMaintenanceTasks,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Card
        title="Total Tenants"
        value={stats.totalTenants}
        pillText="5.24%"
        trend="up"
        period="Current Active Tenants"
      />
      <Card
        title="Total Properties"
        value={stats.totalProperties}
        pillText="1.01%"
        trend="down"
        period="From Jan 1st - Jul 31st"
      />
      <Card
        title="Total Rented Properties"
        value={stats.totalRentedProperties}
        pillText="2.75%"
        trend="up"
        period="Properties Rented"
      />
      <Card
        title="Total Maintenance Requests"
        value={stats.totalMaintenanceRequests}
        pillText="4.50%"
        trend="up"
        period="Current Month"
      />
      <Card
        title="Completed Maintenance Tasks"
        value={stats.completedMaintenanceTasks}
        pillText="6.25%"
        trend="up"
        period="Current Month"
      />
    </>
  );
};

const Card = ({ title, value, pillText, trend, period }) => {
  return (
    <div className="col-span-4 p-4 rounded border border-stone-300">
      <div className="flex mb-8 items-start justify-between">
        <div>
          <h3 className="text-stone-500 mb-2 text-sm">{title}</h3>
          <p className="text-3xl font-semibold">{value}</p>
        </div>

        <span
          className={`text-xs flex items-center gap-1 font-medium px-2 py-1 rounded ${
            trend === "up"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {trend === "up" ? <FiTrendingUp /> : <FiTrendingDown />} {pillText}
        </span>
      </div>

      <p className="text-xs text-stone-500">{period}</p>
    </div>
  );
};

export default StatCards;