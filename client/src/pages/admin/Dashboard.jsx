/* eslint-disable no-unused-vars */
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

const Dashboard = () => {
  return (
    <div className="grid gap-6 grid-col-1 sm:grid-col-2 md:grid-col-3 lg:grid-col-4 ">
      <Card>
        <CardHeader>
          <CardTitle>Total Sales</CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
};

export default Dashboard;
