import { useState, useEffect, useCallback, useMemo } from "react";
import {
  Bookmark as BookmarkIcon,
  Plus,
  Search,
  Grid,
  List,
  Filter,
  Settings,
  Download,
  Upload,
  BarChart3,
  Sparkles,
  Menu,
  X,
} from "lucide-react";
import { toast } from "sonner";
import * as Storage from "@/lib/storage";
import { FloatingBackground } from "@/components/FloatingBackground";
import { GlowCard } from "@/components/GlowCard";
import { BookmarkCard } from "@/components/BookmarkCard";
import { Sidebar } from "@/components/Sidebar";
import { StatsPanel } from "@/components/StatsPanel";
import { AddBookmarkDialog } from "@/components/AddBookmarkDialog";
import { AddCategoryDialog } from "@/components/AddCategoryDialog";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  // State
  const [bookmarks, setBookmarks] = useState<Storage.Bookmark[]>([]);
  const [categories, setCategories] = useState<Storage.Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [showAddBookmark, setShowAddBookmark] = useState(false);
  const [editingBookmark, setEditingBookmark] = useState<Storage.Bookmark | null>(null);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Load data
  const loadData = useCallback(() => {
    try {
      const allBookmarks = Storage.getBookmarks();
      const allCategories = Storage.getCategories();
      const settings = Storage.getSettings();

      setBookmarks(allBookmarks);
      setCategories(allCategories);
      setViewMode(settings.viewMode);
      setLoading(false);
    } catch (err) {
      console.error("Error loading data:", err);
      toast.error("Failed to load bookmarks");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Filter bookmarks
  const filteredBookmarks = useMemo(() => {
    let results = bookmarks;

    if (selectedCategory === "favorites") {
      results = results.filter((b) => b.isFavorite);
    } else if (selectedCategory) {
      results = results.filter((b) => b.categoryId === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        (b) =>
          b.title.toLowerCase().includes(query) ||
          b.description?.toLowerCase().includes(query) ||
          b.url.toLowerCase().includes(query) ||
          b.tags.some((t) => t.toLowerCase().includes(query))
      );
    }

    return results;
  }, [bookmarks, selectedCategory, searchQuery]);

  const stats = useMemo(() => Storage.getStats(), [bookmarks, categories]);

  // Handlers
  const handleSaveBookmark = async (data: {
    title: string;
    url: string;
    description: string;
    categoryId: string;
    tags: string[];
    useAI: boolean;
  }) => {
    setSubmitting(true);
    try {
      if (editingBookmark) {
        Storage.updateBookmark(editingBookmark.id, {
          title: data.title,
          url: data.url,
          description: data.description,
          categoryId: data.categoryId || undefined,
          tags: data.tags,
        });
        toast.success("Bookmark updated!");
      } else {
        Storage.addBookmark({
          title: data.title,
          url: data.url,
          description: data.description,
          categoryId: data.categoryId || undefined,
          tags: data.tags,
          isFavorite: false,
        });
        toast.success("Bookmark added!");
      }
      setShowAddBookmark(false);
      setEditingBookmark(null);
      loadData();
    } catch (err) {
      toast.error("Failed to save bookmark");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteBookmark = (id: string) => {
    if (!confirm("Are you sure you want to delete this bookmark?")) return;
    try {
      Storage.deleteBookmark(id);
      toast.success("Bookmark deleted!");
      loadData();
    } catch {
      toast.error("Failed to delete bookmark");
    }
  };

  const handleToggleFavorite = (bookmark: Storage.Bookmark) => {
    try {
      Storage.toggleFavorite(bookmark.id);
      loadData();
    } catch {
      toast.error("Failed to update bookmark");
    }
  };

  const handleEditBookmark = (bookmark: Storage.Bookmark) => {
    setEditingBookmark(bookmark);
    setShowAddBookmark(true);
  };

  const handleSaveCategory = async (data: { name: string; color: string }) => {
    setSubmitting(true);
    try {
      Storage.addCategory(data);
      toast.success("Category created!");
      setShowAddCategory(false);
      loadData();
    } catch {
      toast.error("Failed to create category");
    } finally {
      setSubmitting(false);
    }
  };

  const handleExport = () => {
    const data = Storage.exportData();
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `linksortai-backup-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Data exported successfully!");
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const jsonData = e.target?.result as string;
        if (Storage.importData(jsonData)) {
          toast.success("Data imported successfully!");
          loadData();
        } else {
          toast.error("Failed to import data");
        }
      } catch {
        toast.error("Invalid file format");
      }
    };
    reader.readAsText(file);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <FloatingBackground />
        <div className="glass-card p-8 text-center animate-pulse-glow">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground text-lg">Loading your bookmarks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <FloatingBackground />

      <div className="relative z-10">
        {/* Top Bar */}
        <header className="glass-card mx-4 mt-4 p-4">
          <div className="flex items-center justify-between gap-4">
            {/* Left side */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowMobileSidebar(true)}
                className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <Menu className="w-5 h-5 text-foreground" />
              </button>

              <div className="flex items-center gap-2">
                <BookmarkIcon className="w-8 h-8 text-primary animate-pulse" />
                <h1 className="text-xl md:text-2xl font-bold gradient-text neon-text">
                  LinkSortAI
                </h1>
                <div className="hidden md:flex items-center gap-2 ml-4 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-sm text-primary font-medium">No Login Required</span>
                </div>
              </div>

              {/* Desktop Search */}
              <div className="hidden md:block relative ml-4">
                <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search bookmarks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="form-input pl-10 pr-10 py-2 w-80"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowStats(!showStats)}
                className="hidden sm:flex"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Stats
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className={showFilters ? "bg-primary/10 text-primary" : ""}
              >
                <Filter className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Filter</span>
              </Button>

              <Button
                size="sm"
                onClick={() => {
                  setEditingBookmark(null);
                  setShowAddBookmark(true);
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Add Bookmark</span>
              </Button>

              {/* Settings Menu */}
              <div className="relative group">
                <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                  <Settings className="w-5 h-5 text-muted-foreground" />
                </button>
                <div className="absolute right-0 top-full mt-2 w-48 glass-card p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <button
                    onClick={handleExport}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Export Data
                  </button>
                  <label className="w-full flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg transition-colors cursor-pointer">
                    <Upload className="w-4 h-4" />
                    Import Data
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImport}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Stats Panel */}
        {showStats && <StatsPanel stats={stats} />}

        {/* Filters Panel */}
        {showFilters && (
          <div className="glass-card mx-4 mt-4 p-4 animate-slide-up">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">View:</span>
                <button
                  onClick={() => {
                    setViewMode("grid");
                    Storage.updateSettings({ viewMode: "grid" });
                  }}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "grid"
                      ? "bg-primary/20 text-primary"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setViewMode("list");
                    Storage.updateSettings({ viewMode: "list" });
                  }}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "list"
                      ? "bg-primary/20 text-primary"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {selectedCategory && selectedCategory !== "favorites" && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Filtered by:</span>
                  <span className="px-2 py-1 bg-primary/10 text-primary rounded text-sm">
                    {categories.find((c) => c.id === selectedCategory)?.name}
                  </span>
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex gap-6 p-4">
          {/* Mobile Sidebar */}
          {showMobileSidebar && (
            <Sidebar
              bookmarks={bookmarks}
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              onAddCategory={() => setShowAddCategory(true)}
              popularTags={stats.popularTags}
              onTagClick={setSearchQuery}
              mobile
              onClose={() => setShowMobileSidebar(false)}
            />
          )}

          {/* Desktop Sidebar */}
          <Sidebar
            bookmarks={bookmarks}
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            onAddCategory={() => setShowAddCategory(true)}
            popularTags={stats.popularTags}
            onTagClick={setSearchQuery}
          />

          {/* Bookmarks Grid */}
          <div className="flex-1 min-w-0">
            {/* Mobile Search */}
            <div className="md:hidden mb-4">
              <div className="glass-card p-4">
                <div className="relative">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search bookmarks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="form-input pl-10 pr-10 w-full"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Welcome Card */}
            <GlowCard className="mb-6" variant="highlight">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0">
                  <BookmarkIcon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">
                    Welcome to LinkSortAI!
                  </h2>
                  <p className="text-muted-foreground">
                    You have {bookmarks.length} bookmarks organized across{" "}
                    {categories.length} categories
                  </p>
                </div>
              </div>
            </GlowCard>

            {/* Bookmarks */}
            {filteredBookmarks.length === 0 ? (
              <GlowCard className="text-center py-12" variant="subtle">
                <BookmarkIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">
                  {searchQuery || selectedCategory
                    ? "No bookmarks found"
                    : "No bookmarks yet"}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery || selectedCategory
                    ? "Try adjusting your search or filter"
                    : "Start by adding your first bookmark"}
                </p>
                {!searchQuery && !selectedCategory && (
                  <Button onClick={() => setShowAddBookmark(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your First Bookmark
                  </Button>
                )}
              </GlowCard>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                    : "space-y-3"
                }
              >
                {filteredBookmarks.map((bookmark) => (
                  <BookmarkCard
                    key={bookmark.id}
                    bookmark={bookmark}
                    category={categories.find((c) => c.id === bookmark.categoryId)}
                    viewMode={viewMode}
                    onEdit={handleEditBookmark}
                    onDelete={handleDeleteBookmark}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Dialogs */}
      <AddBookmarkDialog
        open={showAddBookmark}
        onClose={() => {
          setShowAddBookmark(false);
          setEditingBookmark(null);
        }}
        onSave={handleSaveBookmark}
        categories={categories}
        editingBookmark={editingBookmark}
        submitting={submitting}
      />

      <AddCategoryDialog
        open={showAddCategory}
        onClose={() => setShowAddCategory(false)}
        onSave={handleSaveCategory}
        submitting={submitting}
      />
    </div>
  );
}
