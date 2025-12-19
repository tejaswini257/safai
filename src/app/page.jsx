import { redirect } from 'next/navigation';

// This file handles the root URL: http://localhost:3000/
export default function RootPage() {
  // In a real application, you'd check auth here.
  // Since the user is likely already logged in/testing, we redirect them to the dashboard.
  redirect('/dashboard');
}

// NOTE: If you prefer a simpler static page (like the screenshot), use this:
/*
export default function RootPage() {
  return (
    <div className="p-8">
      <h1>Safai Dashboard</h1>
      <p>
        Go to <a href="/dashboard" style={{ color: 'blue' }}>Dashboard</a>
      </p>
    </div>
  );
}
*/