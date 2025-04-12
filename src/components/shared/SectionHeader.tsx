export const SectionHeader = ({
  subtitle,
  title,
  description,
}: {
  subtitle: string;
  title: string;
  description?: string;
}) => {
  return (
    <div className="text-center mb-16 space-y-4">
      <h2 className="text-sm font-medium text-emerald-400 uppercase tracking-wide">
        {subtitle}
      </h2>
      <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent inline-block">
        {title}
      </h3>
      {description && (
        <p className="text-gray-400 max-w-2xl mx-auto">{description}</p>
      )}
    </div>
  );
};
