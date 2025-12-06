import { BarChart3, Bookmark, FolderOpen, Star, Clock } from "lucide-react";

interface StatsPanelProps {
  stats: {
    totalBookmarks: number;
    totalCategories: number;
    favoriteBookmarks: number;
    recentBookmarks: number;
  };
}

export function StatsPanel({ stats }: StatsPanelProps) {
  const statItems = [
    {
      label: "Total Bookmarks",
      value: stats.totalBookmarks,
      icon: Bookmark,
      color: "text-primary",
    },
    {
      label: "Categories",
      value: stats.totalCategories,
      icon: FolderOpen,
      color: "text-secondary",
    },
    {
      label: "Favorites",
      value: stats.favoriteBookmarks,
      icon: Star,
      color: "text-yellow-500",
    },
    {
      label: "Added Today",
      value: stats.recentBookmarks,
      icon: Clock,
      color: "text-green-500",
    },
  ];

  return (
    <div className="glass-card p-6 mx-4 mb-4 animate-slide-up">
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <BarChart3 className="w-5 h-5 text-primary" />
        Your Statistics
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statItems.map((item) => (
          <div key={item.label} className="stat-card">
            <item.icon className={`w-6 h-6 ${item.color} mx-auto mb-2`} />
            <div className={`text-2xl font-bold ${item.color}`}>{item.value}</div>
            <div className="text-sm text-muted-foreground">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
