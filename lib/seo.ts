const APP_NAME = "NoteHub";
const APP_DESCRIPTION =
  "NoteHub is a handy notes app for creating, filtering, and viewing notes with Next.js.";
const OG_IMAGE = "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg";

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

export function getMetadataBase() {
  return getBaseUrl();
}

export function getSiteUrl(path = "/") {
  return new URL(path, getBaseUrl()).toString();
}

export { APP_DESCRIPTION, APP_NAME, OG_IMAGE };
