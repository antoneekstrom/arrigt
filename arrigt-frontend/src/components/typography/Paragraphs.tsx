export type ParagraphsProps = {
  lines: string[];
};

export function Paragraphs({ lines }: ParagraphsProps) {
  return (
    <div className="flex max-w-screen-lg flex-col gap-y-8">
      {lines.map((text, i) => (
        <p key={i}>{text}</p>
      ))}
    </div>
  );
}
