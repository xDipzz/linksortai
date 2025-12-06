import { Bookmark, Category } from "@/lib/storage";
import { ExternalLink, Star, Edit, Trash2, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface BookmarkCardProps {
  bookmark: Bookmark;
  category?: Category;
  viewMode: "grid" | "list";
  onEdit: (bookmark: Bookmark) => void;
  onDelete: (id: string) => void;
  onToggleFavorite: (bookmark: Bookmark) => void;
}

export function BookmarkCard({
  bookmark,
  category,
  viewMode,
  onEdit,
  onDelete,
  onToggleFavorite,
}: BookmarkCardProps) {
  const getFaviconUrl = (url: string) => {
    try {
      const domain = new URL(url).hostname;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
    } catch {
      return null;
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("URL copied to clipboard!");
  };

  const faviconUrl = getFaviconUrl(bookmark.url);

  if (viewMode === "list") {
    return (
      <div className="dashboard-card p-4 group">
        <div className="flex items-center gap-4">
          {/* Favicon */}
          <div className="shrink-0">
            {faviconUrl ? (
              <img
                src={faviconUrl}
                alt=""
                className="w-8 h-8 rounded-lg bg-muted"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            ) : (
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                <ExternalLink className="w-4 h-4 text-primary" />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <a
                href={bookmark.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground hover:text-primary truncate transition-colors"
              >
                {bookmark.title}
              </a>
              {bookmark.isFavorite && (
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 shrink-0" />
              )}
            </div>
            {bookmark.description && (
              <p className="text-sm text-muted-foreground truncate mt-0.5">
                {bookmark.description}
              </p>
            )}
          </div>

          {/* Category & Tags */}
          <div className="hidden md:flex items-center gap-2">
            {category && (
              <span
                className="category-badge"
                style={{ 
                  background: `${category.color}20`, 
                  color: category.color,
                  borderColor: `${category.color}40`
                }}
              >
                <span 
                  className="w-2 h-2 rounded-full" 
                  style={{ background: category.color }}
                />
                {category.name}
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onToggleFavorite(bookmark)}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
              title={bookmark.isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <Star
                className={cn(
                  "w-4 h-4",
                  bookmark.isFavorite
                    ? "text-yellow-500 fill-yellow-500"
                    : "text-muted-foreground"
                )}
              />
            </button>
            <button
              onClick={() => copyToClipboard(bookmark.url)}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
              title="Copy URL"
            >
              <Copy className="w-4 h-4 text-muted-foreground" />
            </button>
            <button
              onClick={() => onEdit(bookmark)}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
              title="Edit"
            >
              <Edit className="w-4 h-4 text-muted-foreground" />
            </button>
            <button
              onClick={() => onDelete(bookmark.id)}
              className="p-2 rounded-lg hover:bg-destructive/20 transition-colors"
              title="Delete"
            >
              <Trash2 className="w-4 h-4 text-destructive" />
            </button>
            <a
              href={bookmark.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-primary/20 transition-colors"
              title="Open link"
            >
              <ExternalLink className="w-4 h-4 text-primary" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Grid view
  return (
    <div className="dashboard-card p-4 group h-full flex flex-col">
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        {faviconUrl ? (
          <img
            src={faviconUrl}
            alt=""
            className="w-8 h-8 rounded-lg bg-muted shrink-0 mt-0.5"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
            <ExternalLink className="w-4 h-4 text-primary" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <a
              href={bookmark.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground hover:text-primary line-clamp-1 transition-colors"
            >
              {bookmark.title}
            </a>
            {bookmark.isFavorite && (
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 shrink-0" />
            )}
          </div>
          <p className="text-xs text-muted-foreground truncate mt-0.5">
            {new URL(bookmark.url).hostname}
          </p>
        </div>
      </div>

      {/* Description */}
      {bookmark.description && (
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3 flex-1">
          {bookmark.description}
        </p>
      )}

      {/* Category & Tags */}
      <div className="flex flex-wrap gap-2 mb-3">
        {category && (
          <span
            className="category-badge"
            style={{ 
              background: `${category.color}20`, 
              color: category.color,
              borderColor: `${category.color}40`
            }}
          >
            <span 
              className="w-2 h-2 rounded-full" 
              style={{ background: category.color }}
            />
            {category.name}
          </span>
        )}
        {bookmark.tags.slice(0, 2).map((tag) => (
          <span key={tag} className="tag-badge">
            {tag}
          </span>
        ))}
        {bookmark.tags.length > 2 && (
          <span className="tag-badge">+{bookmark.tags.length - 2}</span>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-border/50">
        <div className="flex items-center gap-1">
          <button
            onClick={() => onToggleFavorite(bookmark)}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
            title={bookmark.isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Star
              className={cn(
                "w-4 h-4",
                bookmark.isFavorite
                  ? "text-yellow-500 fill-yellow-500"
                  : "text-muted-foreground"
              )}
            />
          </button>
          <button
            onClick={() => copyToClipboard(bookmark.url)}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
            title="Copy URL"
          >
            <Copy className="w-4 h-4 text-muted-foreground" />
          </button>
          <button
            onClick={() => onEdit(bookmark)}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
            title="Edit"
          >
            <Edit className="w-4 h-4 text-muted-foreground" />
          </button>
          <button
            onClick={() => onDelete(bookmark.id)}
            className="p-2 rounded-lg hover:bg-destructive/20 transition-colors"
            title="Delete"
          >
            <Trash2 className="w-4 h-4 text-destructive" />
          </button>
        </div>
        <a
          href={bookmark.url}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
          title="Open link"
        >
          <ExternalLink className="w-4 h-4 text-primary" />
        </a>
      </div>
    </div>
  );
}
