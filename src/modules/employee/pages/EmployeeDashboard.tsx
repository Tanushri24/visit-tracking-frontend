  import React, { useState } from "react";
  import {
    Eye, DollarSign, MapPin,
    Clock, TrendingUp, Search
  } from "lucide-react";

  // TYPES
  type Schedule = {
    place: string;
    task: string;
    time: string;
  };

  type Expense = {
    type: string;
    amount: string;
  };

  type Visit = {
    company: string;
    purpose: string;
    location: string;
    date: string;
    followUp: string;
    stage: string;
    outcome: string;
  };

  type TabType = "visit" | "schedule" | "expense";

  const EmployeeDashboard: React.FC = () => {

    const [activeTab, setActiveTab] = useState<TabType>("visit");
    const [search, setSearch] = useState("");

    const [scheduleList, setScheduleList] = useState<Schedule[]>([]);
    const [scheduleForm, setScheduleForm] = useState<Schedule>({
      place: "", task: "", time: ""
    });

    const [expenseList, setExpenseList] = useState<Expense[]>([]);
    const [expenseForm, setExpenseForm] = useState<Expense>({
      type: "", amount: ""
    });

    const [visitList, setVisitList] = useState<Visit[]>([]);
    const [visitForm, setVisitForm] = useState<Visit>({
      company: "",
      purpose: "",
      location: "",
      date: "",
      followUp: "",
      stage: "Lead",
      outcome: "No Outcome"
    });

    const funnelStages = ["Lead", "Discussion", "Proposal", "Negotiation", "Won", "Lost"];

    const stats = [
      {
        title: "Today's Visits",
        value: visitList.length,
        change: "+10%",
        icon: <Eye className="w-5 h-5 text-blue-600" />
      },
      {
        title: "Pending Follow-ups",
        value: visitList.filter(v => v.followUp).length,
        change: "+2",
        icon: <Clock className="w-5 h-5 text-red-600" />
      },
      {
        title: "Monthly Expense",
        value: `₹${expenseList.reduce((t, e) => t + Number(e.amount), 0)}`,
        change: "-5%",
        icon: <DollarSign className="w-5 h-5 text-green-600" />
      },
      {
        title: "Distance Covered",
        value: "120 KM",
        change: "+12%",
        icon: <MapPin className="w-5 h-5 text-purple-600" />
      }
    ];

  const inputStyle =
    "w-full border border-gray-200 p-2 sm:p-2.5 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder:text-gray-400";

  return (
    <div className="p-3 sm:p-6 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Employee Dashboard</h1>
          <p className="text-xs sm:text-sm text-gray-500">Welcome 👋</p>
        </div>

        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="w-full pl-9 pr-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* KPI CARDS */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">
  {stats.map((item, i) => (
    <div
      key={i}
      className="relative group bg-white rounded-2xl p-5 border border-gray-200 shadow-sm hover:border-blue-200 transition-all overflow-hidden"
    >
      {/* Purple left border with rounded corners */}
      <div className="absolute left-0 top-0 h-full w-2 rounded-l-2xl bg-blue-500"></div>

      {/* Soft pastel overlay on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-blue-50 via-purple-50 to-pink-50 opacity-0 group-hover:opacity-50 transition-all pointer-events-none"></div>

      <div className="relative flex justify-between items-center">
        <div>
          <p className="text-xs sm:text-sm text-gray-500">{item.title}</p>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900">{item.value}</h3>
          <p className="text-xs sm:text-sm text-green-600 flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3" />
            {item.change}
          </p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
          {item.icon}
        </div>
      </div>
    </div>
  ))}
</div>
      {/* TABS */}
      <div className="flex flex-wrap gap-4 border-b mb-6">
        {(["visit", "schedule", "expense"] as TabType[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 text-xs sm:text-sm font-semibold transition-all ${
              activeTab === tab
                ? "border-b-2 border-blue-600 text-blue-600"
                : "border-b-2 border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab === "visit" && "Start Visit"}
            {tab === "schedule" && "My Schedule"}
            {tab === "expense" && "My Expense"}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">

        {/* LEFT */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">

          {activeTab === "visit" && (
            <Card title="Start Visit">
              <input className={inputStyle} placeholder="Company"
                value={visitForm.company}
                onChange={(e) => setVisitForm({ ...visitForm, company: e.target.value })}
              />
              <input className={inputStyle} placeholder="Purpose"
                value={visitForm.purpose}
                onChange={(e) => setVisitForm({ ...visitForm, purpose: e.target.value })}
              />
              <input className={inputStyle} placeholder="Location"
                value={visitForm.location}
                onChange={(e) => setVisitForm({ ...visitForm, location: e.target.value })}
              />
              <Button onClick={() => {
                if (!visitForm.company) return;
                setVisitList([...visitList, visitForm]);
              }}>
                Save Visit
              </Button>
            </Card>
          )}

          {activeTab === "schedule" && (
            <Card title="My Schedule">
              <input className={inputStyle} placeholder="Place"
                value={scheduleForm.place}
                onChange={(e) => setScheduleForm({ ...scheduleForm, place: e.target.value })} />
              <input className={inputStyle} placeholder="Task"
                value={scheduleForm.task}
                onChange={(e) => setScheduleForm({ ...scheduleForm, task: e.target.value })} />

              <Button onClick={() => {
                setScheduleList([...scheduleList, scheduleForm]);
              }}>
                Add Schedule
              </Button>
            </Card>
          )}

          {activeTab === "expense" && (
            <Card title="My Expense">
              <input className={inputStyle} placeholder="Type"
                value={expenseForm.type}
                onChange={(e) => setExpenseForm({ ...expenseForm, type: e.target.value })} />
              <input className={inputStyle} placeholder="Amount"
                value={expenseForm.amount}
                onChange={(e) => setExpenseForm({ ...expenseForm, amount: e.target.value })} />

              <Button onClick={() => {
                setExpenseList([...expenseList, expenseForm]);
              }}>
                Add Expense
              </Button>
            </Card>
          )}

        </div>

        {/* RIGHT */}
        <div className="space-y-4 sm:space-y-6">
          <Card title="Performance">
            <Progress label="Visits" value={80} />
            <Progress label="Follow-ups" value={60} />
            <Progress label="Conversion" value={40} />
          </Card>

          <Card title="Funnel Summary">
            {funnelStages.map(stage => {
              const count = visitList.filter(v => v.stage === stage).length;
              return (
                <div key={stage} className="flex justify-between text-sm">
                  <span>{stage}</span>
                  <span>{count}</span>
                </div>
              );
            })}
          </Card>
        </div>

      </div>
    </div>
  );
};

// 🔥 PREMIUM CARD
const Card: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="relative group">
    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-20 group-hover:opacity-40 blur-[2px] transition"></div>
    <div className="relative bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.05)] group-hover:shadow-[0_8px_30px_rgba(59,130,246,0.25)] transition space-y-4">
      <h3 className="font-semibold text-gray-800 text-sm sm:text-base">{title}</h3>
      {children}
    </div>
  </div>
);

const Button: React.FC<{ children: React.ReactNode; onClick?: () => void }> = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="w-full py-2 text-sm sm:text-base rounded-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition shadow-md"
  >
    {children}
  </button>
);

const Progress: React.FC<{ label: string; value: number }> = ({ label, value }) => (
  <div>
    <div className="flex justify-between text-xs mb-1">
      <span>{label}</span>
      <span>{value}%</span>
    </div>
    <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all" style={{ width: `${value}%` }} />
    </div>
  </div>
);

export default EmployeeDashboard;