import { Head } from '@inertiajs/react';
import Navigation from '../components/Navigation';

interface Props {
	title: string;
	description: string;
}

export default function About({ title, description }: Props) {
	return (
		<>
			<Head title="About" />
			<div className="max-w-4xl mx-auto p-6">
				<Navigation />

				<h1 className="text-3xl font-light mb-6">{title}</h1>
				<p className="text-gray-700 mb-6">{description}</p>
			</div>
		</>
	);
}
