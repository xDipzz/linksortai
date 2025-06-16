export function FeatureGridItem(props: {
    icon: React.ReactNode;
    title: string;
    description: string;
  }) {
    return (
      <div className="relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 p-5 feature-card">
        <div className="flex flex-col gap-3">
          <div className="flex-shrink-0">
            {props.icon}
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white">{props.title}</h3>
            <p className="text-sm text-gray-300 leading-relaxed">{props.description}</p>
          </div>
        </div>
      </div>
    );
  }
  
  export function FeatureGrid(props: {
    title: string;
    subtitle: string;
    items: {
      icon: React.ReactNode;
      title: string;
      description: string;
    }[];
  }) {
    return (
      <section className="space-y-8">
        <div className="text-center space-y-3">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold gradient-text">
            {props.title}
          </h2>
          <p className="max-w-2xl mx-auto text-base text-gray-300">
            {props.subtitle}
          </p>
        </div>
  
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {props.items.map((item, index) => (
            <FeatureGridItem key={index} {...item} />
          ))}
        </div>
      </section>
    );
  }
  