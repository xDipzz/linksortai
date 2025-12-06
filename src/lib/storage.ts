// Storage utility for managing bookmarks, categories, and settings in localStorage

export interface Bookmark {
  id: string;
  title: string;
  url: string;
  description?: string;
  categoryId?: string;
  tags: string[];
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  createdAt: string;
}

export interface Settings {
  viewMode: "grid" | "list";
}

const STORAGE_KEYS = {
  BOOKMARKS: "linksortai_bookmarks",
  CATEGORIES: "linksortai_categories",
  SETTINGS: "linksortai_settings",
};

// Generate unique ID
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Default categories
const DEFAULT_CATEGORIES: Category[] = [
  { id: "cat-1", name: "Development", color: "#3B82F6", createdAt: new Date().toISOString() },
  { id: "cat-2", name: "Design", color: "#EC4899", createdAt: new Date().toISOString() },
  { id: "cat-3", name: "Business", color: "#10B981", createdAt: new Date().toISOString() },
  { id: "cat-4", name: "Entertainment", color: "#F59E0B", createdAt: new Date().toISOString() },
  { id: "cat-5", name: "Learning", color: "#8B5CF6", createdAt: new Date().toISOString() },
];

// Default bookmarks
const DEFAULT_BOOKMARKS: Bookmark[] = [
  {
    id: "bm-1",
    title: "React Documentation",
    url: "https://react.dev",
    description: "The official React documentation with guides and API reference",
    categoryId: "cat-1",
    tags: ["react", "javascript", "frontend"],
    isFavorite: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "bm-2",
    title: "Tailwind CSS",
    url: "https://tailwindcss.com",
    description: "A utility-first CSS framework for rapid UI development",
    categoryId: "cat-2",
    tags: ["css", "styling", "design"],
    isFavorite: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "bm-3",
    title: "GitHub",
    url: "https://github.com",
    description: "The world's leading software development platform",
    categoryId: "cat-1",
    tags: ["git", "code", "collaboration"],
    isFavorite: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "bm-4",
    title: "Dribbble",
    url: "https://dribbble.com",
    description: "Discover the world's top designers & creatives",
    categoryId: "cat-2",
    tags: ["design", "inspiration", "portfolio"],
    isFavorite: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "bm-5",
    title: "Product Hunt",
    url: "https://producthunt.com",
    description: "The best new products in tech",
    categoryId: "cat-3",
    tags: ["startup", "products", "tech"],
    isFavorite: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "bm-6",
    title: "Coursera",
    url: "https://coursera.org",
    description: "Learn online with courses from top universities",
    categoryId: "cat-5",
    tags: ["education", "courses", "learning"],
    isFavorite: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Initialize storage with defaults if empty
function initializeStorage(): void {
  if (!localStorage.getItem(STORAGE_KEYS.CATEGORIES)) {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(DEFAULT_CATEGORIES));
  }
  if (!localStorage.getItem(STORAGE_KEYS.BOOKMARKS)) {
    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(DEFAULT_BOOKMARKS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify({ viewMode: "grid" }));
  }
}

// Bookmarks
export function getBookmarks(): Bookmark[] {
  initializeStorage();
  const data = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
  return data ? JSON.parse(data) : [];
}

export function addBookmark(bookmark: Omit<Bookmark, "id" | "createdAt" | "updatedAt">): Bookmark {
  const bookmarks = getBookmarks();
  const newBookmark: Bookmark = {
    ...bookmark,
    id: generateId(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  bookmarks.unshift(newBookmark);
  localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
  return newBookmark;
}

export function updateBookmark(id: string, updates: Partial<Bookmark>): Bookmark | null {
  const bookmarks = getBookmarks();
  const index = bookmarks.findIndex((b) => b.id === id);
  if (index === -1) return null;

  bookmarks[index] = {
    ...bookmarks[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
  return bookmarks[index];
}

export function deleteBookmark(id: string): boolean {
  const bookmarks = getBookmarks();
  const filtered = bookmarks.filter((b) => b.id !== id);
  if (filtered.length === bookmarks.length) return false;
  localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(filtered));
  return true;
}

export function toggleFavorite(id: string): Bookmark | null {
  const bookmarks = getBookmarks();
  const bookmark = bookmarks.find((b) => b.id === id);
  if (!bookmark) return null;
  return updateBookmark(id, { isFavorite: !bookmark.isFavorite });
}

export function searchBookmarks(query: string, categoryId?: string): Bookmark[] {
  const bookmarks = getBookmarks();
  let results = bookmarks;

  if (categoryId) {
    results = results.filter((b) => b.categoryId === categoryId);
  }

  if (query.trim()) {
    const lowerQuery = query.toLowerCase();
    results = results.filter(
      (b) =>
        b.title.toLowerCase().includes(lowerQuery) ||
        b.description?.toLowerCase().includes(lowerQuery) ||
        b.url.toLowerCase().includes(lowerQuery) ||
        b.tags.some((t) => t.toLowerCase().includes(lowerQuery))
    );
  }

  return results;
}

// Categories
export function getCategories(): Category[] {
  initializeStorage();
  const data = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
  return data ? JSON.parse(data) : [];
}

export function addCategory(category: Omit<Category, "id" | "createdAt">): Category {
  const categories = getCategories();
  const newCategory: Category = {
    ...category,
    id: generateId(),
    createdAt: new Date().toISOString(),
  };
  categories.push(newCategory);
  localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  return newCategory;
}

export function deleteCategory(id: string): boolean {
  const categories = getCategories();
  const filtered = categories.filter((c) => c.id !== id);
  if (filtered.length === categories.length) return false;
  localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(filtered));

  // Remove category from bookmarks
  const bookmarks = getBookmarks();
  const updatedBookmarks = bookmarks.map((b) =>
    b.categoryId === id ? { ...b, categoryId: undefined } : b
  );
  localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(updatedBookmarks));

  return true;
}

// Settings
export function getSettings(): Settings {
  initializeStorage();
  const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
  return data ? JSON.parse(data) : { viewMode: "grid" };
}

export function updateSettings(updates: Partial<Settings>): Settings {
  const settings = getSettings();
  const newSettings = { ...settings, ...updates };
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(newSettings));
  return newSettings;
}

// Stats
export function getStats() {
  const bookmarks = getBookmarks();
  const categories = getCategories();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tagCounts: Record<string, number> = {};
  bookmarks.forEach((b) => {
    b.tags.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  const popularTags = Object.entries(tagCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  return {
    totalBookmarks: bookmarks.length,
    totalCategories: categories.length,
    favoriteBookmarks: bookmarks.filter((b) => b.isFavorite).length,
    recentBookmarks: bookmarks.filter((b) => new Date(b.createdAt) >= today).length,
    popularTags,
  };
}

// Export/Import
export function exportData(): string {
  return JSON.stringify({
    bookmarks: getBookmarks(),
    categories: getCategories(),
    settings: getSettings(),
    exportedAt: new Date().toISOString(),
  });
}

export function importData(jsonData: string): boolean {
  try {
    const data = JSON.parse(jsonData);
    if (data.bookmarks) {
      localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(data.bookmarks));
    }
    if (data.categories) {
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(data.categories));
    }
    if (data.settings) {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(data.settings));
    }
    return true;
  } catch {
    return false;
  }
}
