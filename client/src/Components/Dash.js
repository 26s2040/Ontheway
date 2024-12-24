import React from 'react';
import Counter from './Counter';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h2>Welcome to the Dashboard</h2>
      <div className="counter-container">
        <Counter initialCount={0} />
      </div>
    </div>
  );
};

export default Dashboard;

