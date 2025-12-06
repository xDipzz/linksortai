import { Bookmark, Category, getBookmarks } from "@/lib/storage";
import { Bookmark as BookmarkIcon, Star, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  bookmarks: Bookmark[];
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (id: string | null) => void;
  onAddCategory: () => void;
  popularTags: { name: string; count: number }[];
  onTagClick: (tag: string) => void;
  mobile?: boolean;
  onClose?: () => void;
}

export function Sidebar({
  bookmarks,
  categories,
  selectedCategory,
  onSelectCategory,
  onAddCategory,
  popularTags,
  onTagClick,
  mobile = false,
  onClose,
}: SidebarProps) {
  const favoritesCount = bookmarks.filter((b) => b.isFavorite).length;

  const content = (
    <nav className="space-y-6">
      {/* Organization */}
      <div>
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Organization
        </h3>
        <ul className="space-y-1">
          <li>
            <button
              onClick={() => {
                onSelectCategory(null);
                onClose?.();
              }}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                selectedCategory === null
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <BookmarkIcon className="w-4 h-4" />
              All Bookmarks
              <span className="ml-auto text-xs opacity-60">{bookmarks.length}</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                onSelectCategory("favorites");
                onClose?.();
              }}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                selectedCategory === "favorites"
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Star className="w-4 h-4" />
              Favorites
              <span className="ml-auto text-xs opacity-60">{favoritesCount}</span>
            </button>
          </li>
        </ul>
      </div>

      {/* Categories */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Categories
          </h3>
          <button
            onClick={onAddCategory}
            className="p-1 rounded hover:bg-muted transition-colors"
            title="Add category"
          >
            <Plus className="w-4 h-4 text-muted-foreground hover:text-primary" />
          </button>
        </div>
        <ul className="space-y-1">
          {categories.map((category) => {
            const count = bookmarks.filter((b) => b.categoryId === category.id).length;
            return (
              <li key={category.id}>
                <button
                  onClick={() => {
                    onSelectCategory(category.id);
                    onClose?.();
                  }}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors",
                    selectedCategory === category.id
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="truncate">{category.name}</span>
                  </div>
                  <span className="text-xs opacity-60">{count}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Popular Tags */}
      {popularTags.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Popular Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {popularTags.slice(0, 8).map((tag) => (
              <button
                key={tag.name}
                onClick={() => {
                  onTagClick(tag.name);
                  onClose?.();
                }}
                className="tag-badge cursor-pointer"
              >
                {tag.name} ({tag.count})
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );

  if (mobile) {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden">
        <div className="w-80 h-full glass-card rounded-none p-6 animate-slide-up">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-foreground">Navigation</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="hidden md:block w-64 shrink-0">
      <div className="glass-card p-6 sticky top-4">{content}</div>
    </div>
  );
}
