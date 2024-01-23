export const Sidebar = () => {
  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 bg-light"
      style={{ width: "280px", height: "100vh", overflowY: "auto" }}
    >
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <a href="#" className="nav-link text-dark">
            Dashboard
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-dark">
            Account
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-dark">
            Transactions
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-dark">
            Saving Goals
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-dark">
            Installments
          </a>
        </li>
      </ul>
    </div>
  );
};
