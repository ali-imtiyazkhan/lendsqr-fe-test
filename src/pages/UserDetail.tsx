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

      <UserProfileCard user={user} />

      <section className="info-card">
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
      </section>
    </>
  );
}
