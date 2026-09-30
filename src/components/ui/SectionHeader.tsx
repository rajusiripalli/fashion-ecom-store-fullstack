interface SectionHeaderProps {
  title: string;
  subtitle: string; 
}

export default function SectionHeader({
  title,
  subtitle, 
}: SectionHeaderProps) {
  return (
    <div
      className=
       "mx-auto text-center max-w-2xl py-8"
      
    >
      <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>

      <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg px-6">
        {subtitle}
      </p>
    </div>
  );
}