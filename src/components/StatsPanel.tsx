import { BarChart3, Bookmark, FolderOpen, Star, Clock, TrendingUp } from "lucide-react";

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
      gradient: "from-primary/20 to-primary/5",
      iconColor: "text-primary",
      valueColor: "text-primary",
    },
    {
      label: "Categories",
      value: stats.totalCategories,
      icon: FolderOpen,
      gradient: "from-secondary/20 to-secondary/5",
      iconColor: "text-secondary",
      valueColor: "text-secondary",
    },
    {
      label: "Favorites",
      value: stats.favoriteBookmarks,
      icon: Star,
      gradient: "from-yellow-500/20 to-yellow-500/5",
      iconColor: "text-yellow-500",
      valueColor: "text-yellow-500",
    },
    {
      label: "Added Today",
      value: stats.recentBookmarks,
      icon: TrendingUp,
      gradient: "from-green-500/20 to-green-500/5",
      iconColor: "text-green-500",
      valueColor: "text-green-500",
    },
  ];

  return (
    <div className="glass-card p-6 mx-4 mt-4 animate-slide-up">
      <h3 className="text-lg font-semibold text-foreground mb-5 flex items-center gap-2.5">
        <div className="p-2 rounded-xl bg-primary/10">
          <BarChart3 className="w-5 h-5 text-primary" />
        </div>
        Your Statistics
      </h3>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statItems.map((item, index) => (
          <div 
            key={item.label} 
            className={`stat-card bg-gradient-to-br ${item.gradient} group`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="relative">
              <div className={`absolute inset-0 ${item.iconColor} opacity-20 blur-2xl group-hover:opacity-40 transition-opacity`} />
              <item.icon className={`w-7 h-7 ${item.iconColor} mx-auto mb-3 relative`} />
            </div>
            <div className={`text-3xl font-bold ${item.valueColor} mb-1 tracking-tight`}>
              {item.value}
            </div>
            <div className="text-sm text-muted-foreground font-medium">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
