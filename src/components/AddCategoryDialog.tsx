import { useState, useEffect } from "react";
import { X, Loader2, Palette, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AddCategoryDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: { name: string; color: string }) => void;
  submitting: boolean;
}

const PRESET_COLORS = [
  { color: "#3B82F6", name: "Blue" },
  { color: "#EC4899", name: "Pink" },
  { color: "#10B981", name: "Green" },
  { color: "#F59E0B", name: "Amber" },
  { color: "#8B5CF6", name: "Purple" },
  { color: "#EF4444", name: "Red" },
  { color: "#06B6D4", name: "Cyan" },
  { color: "#F97316", name: "Orange" },
  { color: "#84CC16", name: "Lime" },
  { color: "#A855F7", name: "Violet" },
  { color: "#14B8A6", name: "Teal" },
  { color: "#E11D48", name: "Rose" },
];

export function AddCategoryDialog({
  open,
  onClose,
  onSave,
  submitting,
}: AddCategoryDialogProps) {
  const [form, setForm] = useState({
    name: "",
    color: PRESET_COLORS[0].color,
  });

  useEffect(() => {
    if (open) {
      setForm({
        name: "",
        color: PRESET_COLORS[Math.floor(Math.random() * PRESET_COLORS.length)].color,
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
    <div className="fixed inset-0 bg-background/80 backdrop-blur-xl z-50 flex items-center justify-center p-4">
      <div 
        className="glass-card w-full max-w-md animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gradient top border with selected color */}
        <div 
          className="h-1 w-full transition-colors duration-300"
          style={{ background: `linear-gradient(90deg, ${form.color}, ${form.color}80, ${form.color})` }}
        />
        
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div 
                className="p-2.5 rounded-xl transition-colors duration-300"
                style={{ background: `${form.color}20` }}
              >
                <Palette className="w-5 h-5" style={{ color: form.color }} />
              </div>
              <h2 className="text-xl font-bold text-foreground">
                Add New Category
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2.5 rounded-xl hover:bg-muted transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Category Name <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g., Work, Personal, Research"
                className="form-input"
                required
                autoFocus
              />
            </div>

            {/* Color */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">
                Color
              </label>
              <div className="grid grid-cols-6 gap-3">
                {PRESET_COLORS.map(({ color, name }) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setForm({ ...form, color })}
                    className={cn(
                      "w-10 h-10 rounded-xl transition-all duration-300 relative group",
                      form.color === color && "scale-110"
                    )}
                    style={{
                      backgroundColor: color,
                      boxShadow: form.color === color ? `0 0 0 2px hsl(var(--background)), 0 0 0 4px ${color}` : undefined,
                    }}
                    title={name}
                  >
                    {form.color === color && (
                      <Check className="w-4 h-4 text-white absolute inset-0 m-auto drop-shadow-lg" />
                    )}
                    <span className="sr-only">{name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Preview */}
            <div className="p-5 rounded-xl bg-muted/30 border border-border/30">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Preview</p>
              <div className="flex items-center gap-3">
                <span
                  className="category-badge"
                  style={{
                    background: `${form.color}15`,
                    color: form.color,
                    borderColor: `${form.color}30`,
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: form.color }}
                  />
                  {form.name || "Category Name"}
                </span>
                <span className="text-sm text-muted-foreground">
                  • 0 bookmarks
                </span>
              </div>
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
                style={{
                  background: form.color,
                  boxShadow: `0 10px 30px -10px ${form.color}60`,
                }}
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
