import { useState, useEffect } from "react";
import { X, Sparkles, Loader2, Plus } from "lucide-react";
import { Bookmark, Category } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AddBookmarkDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: {
    title: string;
    url: string;
    description: string;
    categoryId: string;
    tags: string[];
    useAI: boolean;
  }) => void;
  categories: Category[];
  editingBookmark?: Bookmark | null;
  submitting: boolean;
}

export function AddBookmarkDialog({
  open,
  onClose,
  onSave,
  categories,
  editingBookmark,
  submitting,
}: AddBookmarkDialogProps) {
  const [form, setForm] = useState({
    title: "",
    url: "",
    description: "",
    categoryId: "",
    tags: [] as string[],
    useAI: true,
  });
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    if (editingBookmark) {
      setForm({
        title: editingBookmark.title,
        url: editingBookmark.url,
        description: editingBookmark.description || "",
        categoryId: editingBookmark.categoryId || "",
        tags: editingBookmark.tags,
        useAI: false,
      });
    } else {
      setForm({
        title: "",
        url: "",
        description: "",
        categoryId: "",
        tags: [],
        useAI: true,
      });
    }
  }, [editingBookmark, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.url) return;
    onSave(form);
  };

  const addTag = () => {
    if (tagInput.trim() && !form.tags.includes(tagInput.trim())) {
      setForm({ ...form, tags: [...form.tags, tagInput.trim()] });
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setForm({ ...form, tags: form.tags.filter((t) => t !== tag) });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass-card w-full max-w-lg max-h-[90vh] overflow-y-auto animate-slide-up">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground">
              {editingBookmark ? "Edit Bookmark" : "Add New Bookmark"}
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* URL */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                URL <span className="text-destructive">*</span>
              </label>
              <input
                type="url"
                value={form.url}
                onChange={(e) => setForm({ ...form, url: e.target.value })}
                placeholder="https://example.com"
                className="form-input"
                required
              />
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Title <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Bookmark title"
                className="form-input"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Description
              </label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Brief description..."
                className="form-input min-h-[80px] resize-none"
                rows={3}
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Category
              </label>
              <select
                value={form.categoryId}
                onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                className="form-input"
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Tags
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                  placeholder="Add tag..."
                  className="form-input flex-1"
                />
                <Button
                  type="button"
                  variant="secondary"
                  size="icon"
                  onClick={addTag}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              {form.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {form.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded-md text-sm"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="hover:text-destructive transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* AI Toggle */}
            {!editingBookmark && (
              <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/20">
                <Sparkles className="w-5 h-5 text-primary" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">
                    AI-Powered Suggestions
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Auto-categorize and tag your bookmark
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setForm({ ...form, useAI: !form.useAI })}
                  className={cn(
                    "w-12 h-6 rounded-full transition-colors relative",
                    form.useAI ? "bg-primary" : "bg-muted"
                  )}
                >
                  <span
                    className={cn(
                      "absolute top-1 w-4 h-4 rounded-full bg-foreground transition-transform",
                      form.useAI ? "translate-x-7" : "translate-x-1"
                    )}
                  />
                </button>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={onClose}
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={submitting || !form.title || !form.url}
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : editingBookmark ? (
                  "Update Bookmark"
                ) : (
                  "Add Bookmark"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
