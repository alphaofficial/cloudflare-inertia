export const PAGE_NAMES = {
	Home: 'Home',
	About: 'About',
	Users: 'Users',
	User: 'User',
} as const;

export type PageName = (typeof PAGE_NAMES)[keyof typeof PAGE_NAMES];
