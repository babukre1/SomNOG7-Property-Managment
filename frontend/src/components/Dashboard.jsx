import React from "react";
import { TopBar } from "./TopBar";
import { Grid } from "./Grid";
import { getCurrentUser } from "../utils/util";

export const Dashboard = () => {
  const user = getCurrentUser();
  console.log(user);

  return (
    <div className="bg-white rounded-lg pb-4 shadow">
      <TopBar user={user} />
      <Grid />
    </div>
  );
};
