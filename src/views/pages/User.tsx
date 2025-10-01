import { Head } from '@inertiajs/react';
import Navigation from '../components/Navigation';

interface Props {
	user: {
		id: number;
		name: string;
		email: string;
	};
}

export default function User({ user }: Props) {
	return (
		<>
			<Head title={user.name} />
			<div className="max-w-4xl mx-auto p-6">
				<Navigation />

				<h1 className="text-3xl font-light mb-6">User Profile</h1>

				<div className="bg-gray-50 p-4 border-l-4 border-gray-900">
					<h2 className="text-2xl font-light mb-4">{user.name}</h2>
					<p className="text-gray-700 mb-2">
						<strong>ID:</strong> {user.id}
					</p>
					<p className="text-gray-700">
						<strong>Email:</strong> {user.email}
					</p>
				</div>
			</div>
		</>
	);
}
