import { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AddCategoryDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: { name: string; color: string }) => void;
  submitting: boolean;
}

const PRESET_COLORS = [
  "#3B82F6", // Blue
  "#EC4899", // Pink
  "#10B981", // Green
  "#F59E0B", // Amber
  "#8B5CF6", // Purple
  "#EF4444", // Red
  "#06B6D4", // Cyan
  "#F97316", // Orange
  "#84CC16", // Lime
  "#A855F7", // Violet
];

export function AddCategoryDialog({
  open,
  onClose,
  onSave,
  submitting,
}: AddCategoryDialogProps) {
  const [form, setForm] = useState({
    name: "",
    color: PRESET_COLORS[0],
  });

  useEffect(() => {
    if (open) {
      setForm({
        name: "",
        color: PRESET_COLORS[Math.floor(Math.random() * PRESET_COLORS.length)],
      });
    }
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name) return;
    onSave(form);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass-card w-full max-w-md animate-slide-up">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground">
              Add New Category
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Category Name <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g., Work, Personal, Research"
                className="form-input"
                required
              />
            </div>

            {/* Color */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Color
              </label>
              <div className="flex flex-wrap gap-2">
                {PRESET_COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setForm({ ...form, color })}
                    className="w-8 h-8 rounded-lg transition-transform hover:scale-110"
                    style={{
                      backgroundColor: color,
                      boxShadow:
                        form.color === color
                          ? `0 0 0 2px hsl(var(--background)), 0 0 0 4px ${color}`
                          : "none",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Preview */}
            <div className="p-4 rounded-lg bg-muted/50">
              <p className="text-sm text-muted-foreground mb-2">Preview:</p>
              <span
                className="category-badge"
                style={{
                  background: `${form.color}20`,
                  color: form.color,
                  borderColor: `${form.color}40`,
                }}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: form.color }}
                />
                {form.name || "Category Name"}
              </span>
            </div>

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
                disabled={submitting || !form.name}
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Category"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
