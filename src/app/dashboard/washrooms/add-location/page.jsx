import { redirect } from 'next/navigation';

export default function Page() {
    // Server-side redirect to the actual add-washroom page
    redirect('/dashboard/washrooms/add-washroom');
}