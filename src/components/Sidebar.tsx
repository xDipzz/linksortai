import { Bookmark, Category } from "@/lib/storage";
import { Bookmark as BookmarkIcon, Star, Plus, X, Sparkles } from "lucide-react";
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
    <nav className="space-y-8">
      {/* Organization */}
      <div>
        <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-3 px-1">
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
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 group",
                selectedCategory === null
                  ? "bg-primary/10 text-primary font-medium shadow-[inset_0_0_0_1px_hsl(var(--primary)/0.2)]"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <div className={cn(
                "p-1.5 rounded-lg transition-colors",
                selectedCategory === null ? "bg-primary/20" : "bg-muted group-hover:bg-muted/80"
              )}>
                <BookmarkIcon className="w-4 h-4" />
              </div>
              All Bookmarks
              <span className="ml-auto text-xs font-semibold opacity-60 bg-muted/50 px-2 py-0.5 rounded-full">
                {bookmarks.length}
              </span>
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                onSelectCategory("favorites");
                onClose?.();
              }}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 group",
                selectedCategory === "favorites"
                  ? "bg-yellow-500/10 text-yellow-500 font-medium shadow-[inset_0_0_0_1px_rgba(234,179,8,0.2)]"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <div className={cn(
                "p-1.5 rounded-lg transition-colors",
                selectedCategory === "favorites" ? "bg-yellow-500/20" : "bg-muted group-hover:bg-muted/80"
              )}>
                <Star className={cn("w-4 h-4", selectedCategory === "favorites" && "fill-yellow-500")} />
              </div>
              Favorites
              <span className="ml-auto text-xs font-semibold opacity-60 bg-muted/50 px-2 py-0.5 rounded-full">
                {favoritesCount}
              </span>
            </button>
          </li>
        </ul>
      </div>

      {/* Categories */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">
            Categories
          </h3>
          <button
            onClick={onAddCategory}
            className="p-1.5 rounded-lg hover:bg-muted transition-all group"
            title="Add category"
          >
            <Plus className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:rotate-90 transition-all" />
          </button>
        </div>
        <ul className="space-y-1">
          {categories.map((category) => {
            const count = bookmarks.filter((b) => b.categoryId === category.id).length;
            const isSelected = selectedCategory === category.id;
            return (
              <li key={category.id}>
                <button
                  onClick={() => {
                    onSelectCategory(category.id);
                    onClose?.();
                  }}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-300 group",
                    isSelected
                      ? "font-medium"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                  style={isSelected ? {
                    background: `${category.color}15`,
                    color: category.color,
                    boxShadow: `inset 0 0 0 1px ${category.color}30`
                  } : undefined}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-3 h-3 rounded-full shrink-0 transition-all"
                      style={{ 
                        backgroundColor: category.color,
                        boxShadow: isSelected ? `0 0 0 2px hsl(var(--background)), 0 0 0 4px ${category.color}` : undefined
                      }}
                    />
                    <span className="truncate">{category.name}</span>
                  </div>
                  <span className="text-xs font-semibold opacity-60 bg-muted/50 px-2 py-0.5 rounded-full">
                    {count}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Popular Tags */}
      {popularTags.length > 0 && (
        <div>
          <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-3 px-1">
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
                className="tag-badge cursor-pointer hover:scale-105"
              >
                {tag.name}
                <span className="ml-1 opacity-50">({tag.count})</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* AI Badge */}
      <div className="pt-4 border-t border-border/30">
        <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-xs font-medium text-foreground">AI-Powered Sorting</span>
        </div>
      </div>
    </nav>
  );

  if (mobile) {
    return (
      <div className="fixed inset-0 bg-background/90 backdrop-blur-xl z-40 md:hidden">
        <div className="w-80 h-full glass-card rounded-none p-6 animate-slide-in-left border-r border-border/50">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-foreground">Navigation</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-muted transition-colors"
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
    <div className="hidden md:block w-72 shrink-0">
      <div className="glass-card p-6 sticky top-4">{content}</div>
    </div>
  );
}
