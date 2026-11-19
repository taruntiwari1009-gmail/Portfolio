import { createFileRoute } from "@tanstack/react-router";
import { PersonalWorld } from "@/components/personal-world";

// The home route ships no og:image, so serve-time hosting can inject the
// project's social preview (explicit og:image or latest screenshot).
export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Tarun Tiwari — A little world of my own" },
    { name: "description", content: "Enter Tarun's dusk-lit room: a personal world of curious thoughts, things built, books and faraway places." },
    { property: "og:title", content: "Tarun Tiwari — A little world of my own" },
    { property: "og:description", content: "A cinematic personal world of curious thoughts, things built, books and faraway places." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: PersonalWorld,
});
