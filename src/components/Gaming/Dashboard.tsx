import DailyXPClaim from "./Dashboard/DailyXPClaim";

const Dashboard = () => {
  return (
    <div className="space-y-5 pb-10">
      <div className="flex flex-col gap-5">
        <DailyXPClaim />
      </div>
    </div>
  );
};

export default Dashboard;
