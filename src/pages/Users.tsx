// import { useState } from "react";
// import { users } from "../data/users";
// import StatCard from "../components/cards/StatCard";
// import UsersTable from "../components/tables/UsersTable";
// import FilterPanel from "../components/panels/FilterPanel";

// export default function Users({ onViewDetails }: { onViewDetails: () => void }) {
//   const [filterOpen, setFilterOpen] = useState(false);

//   return (
//     <>
//       <h2 className="page-title">Users</h2>
//       <section className="stats">
//         <StatCard label="USERS" value="2,453" tone="pink" />
//         <StatCard label="ACTIVE USERS" value="2,453" tone="purple" />
//         <StatCard label="USERS WITH LOANS" value="12,453" tone="orange" />
//         <StatCard label="USERS WITH SAVINGS" value="102,453" tone="red" />
//       </section>
//       <section className="table-card">
//         {filterOpen && <FilterPanel />}
//         <UsersTable users={users} onFilter={() => setFilterOpen(!filterOpen)} onViewDetails={onViewDetails} />
//       </section>
//       <div className="pagination"><span>Showing <b>100</b> out of 100</span><div><button>‹</button><span>1</span><span>2</span><span>3</span><span>...</span><span>15</span><span>16</span><button>›</button></div></div>
//     </>
//   );
// }