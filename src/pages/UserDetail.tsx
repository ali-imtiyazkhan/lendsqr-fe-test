import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import InfoSection from "../components/details/InfoSection";
import UserProfileCard from "../components/details/UserProfileCard";
import { loadUserDetails } from "../services/userApi";
import type { User } from "../types/users";

export default function UserDetail() {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("General Details");

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    setLoading(true);
    loadUserDetails(id)
      .then(setUser)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <p className="table-message">Loading user details...</p>;
  }

  if (!user) {
    return (
      <>
        <Link className="back" to="/users">
          ← Back to Users
        </Link>
        <p className="table-message error">User not found.</p>
      </>
    );
  }

  return (
    <>
      <Link className="back" to="/users">
        ← Back to Users
      </Link>

      <div className="details-heading">
        <h2>User Details</h2>
        <div>
          <button className="outline danger" type="button">
            BLACKLIST USER
          </button>
          <button className="outline activate" type="button">
            ACTIVATE USER
          </button>
        </div>
      </div>

      <UserProfileCard user={user} activeTab={activeTab} onTabChange={setActiveTab} />

      <section className="info-card">
        {activeTab === "General Details" && (
          <>
            <InfoSection
              title="Personal Information"
              items={[
                ["FULL NAME", user.fullName],
                ["PHONE NUMBER", user.phone],
                ["EMAIL ADDRESS", user.email],
                ["BVN", user.bvn],
                ["GENDER", user.gender],
                ["MARITAL STATUS", user.maritalStatus],
                ["CHILDREN", user.children],
                ["TYPE OF RESIDENCE", user.residenceType],
              ]}
            />
            <InfoSection
              title="Education and Employment"
              items={[
                ["LEVEL OF EDUCATION", user.educationLevel],
                ["EMPLOYMENT STATUS", user.employmentStatus],
                ["SECTOR OF EMPLOYMENT", user.employmentSector],
                ["DURATION OF EMPLOYMENT", user.employmentDuration],
                ["OFFICE EMAIL", user.officeEmail],
                ["MONTHLY INCOME", user.monthlyIncome],
                ["LOAN REPAYMENT", user.loanRepayment],
              ]}
            />
            <InfoSection
              title="Socials"
              items={[
                ["TWITTER", user.socials.twitter],
                ["FACEBOOK", user.socials.facebook],
                ["INSTAGRAM", user.socials.instagram],
              ]}
            />
            <InfoSection
              title="Guarantor"
              items={[
                ["FULL NAME", user.guarantor.fullName],
                ["PHONE NUMBER", user.guarantor.phone],
                ["EMAIL ADDRESS", user.guarantor.email],
                ["RELATIONSHIP", user.guarantor.relationship],
              ]}
            />
          </>
        )}

        {activeTab === "Documents" && (
          <InfoSection
            title="User Documents"
            items={[
              ["BVN VERIFICATION", "Verified ✓"],
              ["GOVERNMENT-ISSUED ID", "Verified ✓"],
              ["UTILITY BILL", "Pending Review ↻"],
              ["EMPLOYMENT CONTRACT", "Verified ✓"],
              ["BANK STATEMENT (6-MONTH)", "Verified ✓"],
            ]}
          />
        )}

        {activeTab === "Bank Details" && (
          <InfoSection
            title="Bank & Account Details"
            items={[
              ["BANK NAME", "Providus Bank"],
              ["ACCOUNT NUMBER", user.bankAccount],
              ["ACCOUNT NAME", user.fullName],
              ["ACCOUNT BALANCE", user.accountBalance],
              ["BVN NUMBER", user.bvn],
              ["BANK ROUTING CODE", "058-293"],
              ["BRANCH LOCATION", "Main Office, Lagos"],
            ]}
          />
        )}

        {activeTab === "Loans" && (
          <InfoSection
            title="Active & Past Loans"
            items={
              user.hasLoan
                ? [
                    ["PERSONAL LOAN AMOUNT", "₦50,000.00"],
                    ["INTEREST RATE", "10% p.a."],
                    ["LOAN STATUS", "Active"],
                    ["REPAYMENT DATE", "2026-07-15"],
                    ["PAST EDUCATION LOAN", "₦120,000.00 (Fully Repaid)"],
                  ]
                : [["LOANS STATUS", "No active loans found for this user."]]
            }
          />
        )}

        {activeTab === "Savings" && (
          <InfoSection
            title="Savings Account Info"
            items={
              user.hasSavings
                ? [
                    ["TARGET SAVINGS BALANCE", "₦150,000.00"],
                    ["SAVINGS PLAN", "Monthly Auto-save"],
                    ["ANNUAL INTEREST", "8.5%"],
                    ["MATURED FIXED DEPOSIT", "₦500,000.00 (Matured & Withdrawn)"],
                  ]
                : [["SAVINGS STATUS", "No active savings accounts found for this user."]]
            }
          />
        )}

        {activeTab === "App and System" && (
          <InfoSection
            title="System Log & Security Details"
            items={[
              ["USER SYSTEM ID", user.id],
              ["ACCOUNT PORTAL STATUS", user.status],
              ["LAST SYSTEM LOGIN", "2026-06-06 14:22:10"],
              ["LOGIN DEVICE TYPE", "Apple iPhone 13 Pro (Safari 15.4)"],
              ["CLIENT IP ADDRESS", "197.210.64.12"],
              ["APPLICATION RUNTIME VERSION", "v2.4.1-build-82"],
            ]}
          />
        )}
      </section>
    </>
  );
}
