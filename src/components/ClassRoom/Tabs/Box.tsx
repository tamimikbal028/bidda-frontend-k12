import { useState } from "react";
import BoxesList from "../box/BoxesList";
import CreateBoxForm from "../box/CreateBoxForm";
import InactiveBoxesList from "../box/InactiveBoxesList";
import SubmitToBox from "../box/SubmitToBox";
import BoxNavBar from "../box/BoxNavBar";

const Box = () => {
  const [activeTab, setActiveTab] = useState<
    "boxes" | "create" | "inactive" | "submit"
  >("boxes");

  return (
    <div className="space-y-4">
      {/* Tab Navigation */}
      <BoxNavBar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Tab Content */}
      <div>
        {activeTab === "boxes" && <BoxesList />}
        {activeTab === "create" && <CreateBoxForm />}
        {activeTab === "submit" && <SubmitToBox />}
        {activeTab === "inactive" && <InactiveBoxesList />}
      </div>
    </div>
  );
};

export default Box;
