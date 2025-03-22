import { Edit } from "lucide-react";
import Divider from "../Common/Divider";

const userData = {
  id: "1",
  first_name: "Test",
  last_name: "McTesterson",
  email: "test@test.com",
  username: "test",
  created_at: "2021-10-10",
};

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div className="w-full flex">
    <div className="w-1/3 text-primary-50">{label}</div>
    <div className="w-2/3">{value}</div>
  </div>
);

const SectionHeader = ({ title }: { title: string }) => (
  <div className="flex items-center justify-between">
    <h3 className="text-primary-400 text-lg my-2 font-semibold">{title}</h3>
    <button className="relative flex text-xs text-secondary-400 font-semibold border border-secondary-400 px-2 py-1 rounded-md shadow-[0_0_8px_rgba(255,111,238,0.6)] hover:shadow-[0_0_10px_rgba(255,111,238,0.6)] hover:text-white">
      <Edit className="absolute left-2 top-1.5" size={12} />
      <span className="pl-5">Edit</span>
    </button>
  </div>
);

const UserDetails = () => {
  const personalDetails = [
    { label: "First Name:", value: userData.first_name },
    { label: "Last Name:", value: userData.last_name },
    { label: "Username:", value: userData.username },
    { label: "Email:", value: userData.email },
  ];

  const accountDetails = [
    { label: "Created:", value: "21st April 2024" },
    { label: "Membership:", value: "Basic" },
  ];

  return (
    <div className="w-full" data-testid="user-details">
      <SectionHeader title="Personal Details" />
      {personalDetails.map(({ label, value }) => (
        <DetailRow key={label} label={label} value={value} />
      ))}

      <Divider classNames="my-4" />

      <SectionHeader title="Account Details" />
      {accountDetails.map(({ label, value }) => (
        <DetailRow key={label} label={label} value={value} />
      ))}
    </div>
  );
};

export default UserDetails;
