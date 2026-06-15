/**
 * Renders a JSON-LD <script> tag. Server component — the structured data ships
 * in the initial HTML so crawlers see it without executing JS.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // JSON-LD is static, server-rendered data; safe to inline.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
