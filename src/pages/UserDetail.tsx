import UserProfileCard from "../components/details/UserProfileCard";
import InfoSection from "../components/details/InfoSection";

export default function UserDetails({ onBack }: { onBack: () => void }) {
  return (
    <>
      <button className="back" onClick={onBack}>← Back to Users</button>
      <div className="details-heading"><h2>User Details</h2><div><button className="outline danger">BLACKLIST USER</button><button className="outline activate">ACTIVATE USER</button></div></div>
      <UserProfileCard />
      <section className="info-card">
        <InfoSection title="Personal Information" items={[["FULL NAME","Grace Effiom"],["PHONE NUMBER","07060780922"],["EMAIL ADDRESS","graceeffiom@gmail.com"],["BVN","07060780922"],["GENDER","Female"],["MARITAL STATUS","Single"],["CHILDREN","None"],["TYPE OF RESIDENCE","Parent’s Apartment"]]} />
        <InfoSection title="Education and Employment" items={[["LEVEL OF EDUCATION","B.Sc"],["EMPLOYMENT STATUS","Employed"],["SECTOR OF EMPLOYMENT","FinTech"],["DURATION OF EMPLOYMENT","2 years"],["OFFICE EMAIL","graceeffiom@lendsqr.com"],["MONTHLY INCOME","₦200,000.00 - ₦400,000.00"],["LOAN REPAYMENT","40,000"]]} />
        <InfoSection title="Socials" items={[["TWITTER","@grace_effiom"],["FACEBOOK","Grace Effiom"],["INSTAGRAM","@grace_effiom"]]} />
        <InfoSection title="Guarantor" items={[["FULL NAME","Grace Effiom"],["PHONE NUMBER","07060780922"],["EMAIL ADDRESS","graceeffiom@gmail.com"],["RELATIONSHIP","Sister"]]} />
      </section>
    </>
  );
}