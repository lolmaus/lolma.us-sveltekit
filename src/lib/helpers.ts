import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Borrowed from shadcn-svelte or bits-ui
// Also mentioned in https://webcache.googleusercontent.com/search?q=cache:https://madprofessor.blog/articles/combining-clsx-and-twmerge-to-create-cn-func/
export const cn = (...inputs: ClassValue[]) => {
	return twMerge(clsx(inputs));
};
