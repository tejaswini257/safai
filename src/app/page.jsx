import { redirect } from 'next/navigation';

export default function RootPage() {
  /**
   * Logical Flow:
   * 1. User hits http://localhost:3000/
   * 2. System redirects to the Sign-Up page.
   */
  redirect('/auth/sign-in'); // Change this to '/auth/sign-up' if you rename that folder
}