import { Bookmark, Category } from "@/lib/storage";
import { ExternalLink, Star, Edit, Trash2, Copy, ArrowUpRight } from "lucide-react";
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
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
    } catch {
      return null;
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("URL copied to clipboard!");
  };

  const getDomain = (url: string) => {
    try {
      return new URL(url).hostname.replace('www.', '');
    } catch {
      return url;
    }
  };

  const faviconUrl = getFaviconUrl(bookmark.url);

  if (viewMode === "list") {
    return (
      <div className="dashboard-card p-4 group">
        <div className="flex items-center gap-4">
          {/* Favicon with glow */}
          <div className="shrink-0 relative">
            <div className="absolute inset-0 bg-primary/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            {faviconUrl ? (
              <img
                src={faviconUrl}
                alt=""
                className="relative w-10 h-10 rounded-xl bg-muted object-contain p-1"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            ) : (
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <ExternalLink className="w-5 h-5 text-primary" />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <a
                href={bookmark.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-foreground hover:text-primary truncate transition-colors group/link inline-flex items-center gap-1"
              >
                {bookmark.title}
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover/link:opacity-100 group-hover/link:translate-y-0 group-hover/link:translate-x-0 transition-all" />
              </a>
              {bookmark.isFavorite && (
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 shrink-0 drop-shadow-[0_0_4px_rgba(234,179,8,0.5)]" />
              )}
            </div>
            <p className="text-sm text-muted-foreground truncate">
              {bookmark.description || getDomain(bookmark.url)}
            </p>
          </div>

          {/* Category & Tags */}
          <div className="hidden lg:flex items-center gap-2">
            {category && (
              <span
                className="category-badge"
                style={{ 
                  background: `${category.color}15`, 
                  color: category.color,
                  borderColor: `${category.color}30`
                }}
              >
                <span 
                  className="w-1.5 h-1.5 rounded-full" 
                  style={{ background: category.color }}
                />
                {category.name}
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
            <button
              onClick={() => onToggleFavorite(bookmark)}
              className="icon-btn star-btn"
              title={bookmark.isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <Star
                className={cn(
                  "w-4 h-4 transition-all",
                  bookmark.isFavorite
                    ? "text-yellow-500 fill-yellow-500 drop-shadow-[0_0_6px_rgba(234,179,8,0.5)]"
                    : "text-muted-foreground"
                )}
              />
            </button>
            <button
              onClick={() => copyToClipboard(bookmark.url)}
              className="icon-btn"
              title="Copy URL"
            >
              <Copy className="w-4 h-4 text-muted-foreground" />
            </button>
            <button
              onClick={() => onEdit(bookmark)}
              className="icon-btn"
              title="Edit"
            >
              <Edit className="w-4 h-4 text-muted-foreground" />
            </button>
            <button
              onClick={() => onDelete(bookmark.id)}
              className="icon-btn hover:!bg-destructive/20"
              title="Delete"
            >
              <Trash2 className="w-4 h-4 text-destructive" />
            </button>
            <a
              href={bookmark.url}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-btn !bg-primary/10 hover:!bg-primary/20"
              title="Open link"
            >
              <ExternalLink className="w-4 h-4 text-primary" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Grid view - Premium card design
  return (
    <div className="dashboard-card group h-full flex flex-col overflow-hidden">
      {/* Gradient top border on hover */}
      <div className="h-0.5 w-full bg-gradient-to-r from-primary via-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="p-5 flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-start gap-3 mb-4">
          {/* Favicon with animated glow */}
          <div className="relative shrink-0">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-150" />
            {faviconUrl ? (
              <img
                src={faviconUrl}
                alt=""
                className="relative w-11 h-11 rounded-xl bg-muted/50 object-contain p-1.5 ring-1 ring-border/50 group-hover:ring-primary/30 transition-all"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            ) : (
              <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center ring-1 ring-border/50">
                <ExternalLink className="w-5 h-5 text-primary" />
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <a
                href={bookmark.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-foreground hover:text-primary line-clamp-1 transition-colors group/link inline-flex items-center gap-1"
              >
                {bookmark.title}
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 shrink-0 group-hover/link:opacity-100 transition-opacity" />
              </a>
              {bookmark.isFavorite && (
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 shrink-0 drop-shadow-[0_0_6px_rgba(234,179,8,0.5)]" />
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-0.5 truncate font-medium">
              {getDomain(bookmark.url)}
            </p>
          </div>
        </div>

        {/* Description */}
        {bookmark.description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1 leading-relaxed">
            {bookmark.description}
          </p>
        )}

        {/* Category & Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {category && (
            <span
              className="category-badge text-[10px]"
              style={{ 
                background: `${category.color}15`, 
                color: category.color,
                borderColor: `${category.color}30`
              }}
            >
              <span 
                className="w-1.5 h-1.5 rounded-full" 
                style={{ background: category.color }}
              />
              {category.name}
            </span>
          )}
          {bookmark.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="tag-badge text-[10px]">
              {tag}
            </span>
          ))}
          {bookmark.tags.length > 2 && (
            <span className="tag-badge text-[10px]">+{bookmark.tags.length - 2}</span>
          )}
        </div>

        {/* Actions with glass effect */}
        <div className="flex items-center justify-between pt-4 border-t border-border/30">
          <div className="flex items-center gap-1">
            <button
              onClick={() => onToggleFavorite(bookmark)}
              className="icon-btn star-btn"
              title={bookmark.isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <Star
                className={cn(
                  "w-4 h-4 transition-all",
                  bookmark.isFavorite
                    ? "text-yellow-500 fill-yellow-500 drop-shadow-[0_0_6px_rgba(234,179,8,0.5)]"
                    : "text-muted-foreground hover:text-yellow-500"
                )}
              />
            </button>
            <button
              onClick={() => copyToClipboard(bookmark.url)}
              className="icon-btn"
              title="Copy URL"
            >
              <Copy className="w-4 h-4 text-muted-foreground" />
            </button>
            <button
              onClick={() => onEdit(bookmark)}
              className="icon-btn"
              title="Edit"
            >
              <Edit className="w-4 h-4 text-muted-foreground" />
            </button>
            <button
              onClick={() => onDelete(bookmark.id)}
              className="icon-btn hover:!bg-destructive/20"
              title="Delete"
            >
              <Trash2 className="w-4 h-4 text-destructive" />
            </button>
          </div>
          <a
            href={bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-all hover:gap-2"
            title="Open link"
          >
            Visit
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
