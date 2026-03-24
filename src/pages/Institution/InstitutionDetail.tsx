import { Routes, Route, Navigate } from "react-router-dom";
import InstitutionHeader from "../../components/Institution/InstitutionHeader";
import InstitutionFeed from "../../components/Institution/tabs/InstitutionFeed";
import DepartmentsList from "../../components/Institution/tabs/DepartmentsList";
import InstitutionAbout from "../../components/Institution/tabs/InstitutionAbout";
import InstitutionMore from "../../components/Institution/tabs/InstitutionMore";

const InstitutionDetail = () => {
  return (
    // this return section will be removed in future
    <div className="flex items-center justify-center">
      <h1 className="text-2xl font-bold">Will Come Soon...</h1>
    </div>
  );

  return (
    <div className="min-h-screen space-y-5">
      <InstitutionHeader />

      <Routes>
        <Route index element={<InstitutionFeed />} />
        <Route path="departments" element={<DepartmentsList />} />
        <Route path="about" element={<InstitutionAbout />} />
        <Route path="more/*" element={<InstitutionMore />} />
        <Route path="*" element={<Navigate to="" replace />} />
      </Routes>
    </div>
  );
};

export default InstitutionDetail;
