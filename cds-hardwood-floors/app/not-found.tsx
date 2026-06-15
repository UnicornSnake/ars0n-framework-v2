import { Container, ButtonLink } from "@/components/ui";
import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="py-28">
      <Container className="text-center">
        <p className="font-display text-6xl font-semibold text-brand">404</p>
        <h1 className="mt-4 font-display text-3xl font-semibold text-ink">
          Page not found
        </h1>
        <p className="mx-auto mt-3 max-w-md text-ink-soft">
          The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you
          back to solid ground.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/" variant="primary">Back home</ButtonLink>
          <ButtonLink href={site.phoneHref} variant="ghost">
            Call {site.phoneDisplay}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
