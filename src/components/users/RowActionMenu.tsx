export default function RowActionMenu({ onViewDetails }: { onViewDetails: () => void }) {
    return <div className="row-menu"><button onClick={onViewDetails}>View Details</button><button>Blacklist User</button><button>Activate User</button></div>;
  }