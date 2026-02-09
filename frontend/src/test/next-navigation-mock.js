import { vi } from 'vitest';

export const useRouter = vi.fn(() => ({ push: vi.fn() }));
export const useSearchParams = vi.fn(() => new URLSearchParams());
export const usePathname = vi.fn(() => '/');
