import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import './styles/global.css';

createInertiaApp({
	resolve: (name) => {
		const pages = import.meta.glob('./pages/**/*.tsx', { eager: true });
		return pages[`./pages/${name}.tsx`] as any;
	},
	setup({ el, App, props }) {
		const root = createRoot(el);
		root.render(<App {...props} />);
	},
});
