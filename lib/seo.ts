import type { Metadata } from "next";

const APP_NAME = "NoteHub";
const APP_DESCRIPTION =
  "NoteHub is a handy notes app for creating, filtering, and viewing notes with Next.js.";
const OG_IMAGE = "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg";

export interface SeoMetadata extends Metadata {
  url?: string;
}

function getBaseUrl() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    "http://localhost:3000";

  return new URL(
    siteUrl.startsWith("http://") || siteUrl.startsWith("https://")
      ? siteUrl
      : `https://${siteUrl}`,
  );
}

export function getSiteUrl(path = "/") {
  return new URL(path, getBaseUrl()).toString();
}

export function createSeoMetadata({
  title,
  description,
  path = "/",
}: {
  title: string;
  description: string;
  path?: string;
}): SeoMetadata {
  const url = getSiteUrl(path);

  return {
    title,
    description,
    url,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: `${title} Open Graph image`,
        },
      ],
    },
  };
}

export { APP_DESCRIPTION, APP_NAME, OG_IMAGE };
