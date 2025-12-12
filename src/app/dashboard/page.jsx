// src/app/dashboard/page.js
// This renders the content for the /dashboard URL (the home page after login)

const DashboardHomePage = () => {
  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold text-gray-800">Welcome to the Dashboard!</h2>
      <p className="mt-2 text-gray-600">
        This content is wrapped by the layout.js file with the sidebar and header.
      </p>
    </div>
  );
};

export default DashboardHomePage;