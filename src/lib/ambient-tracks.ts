import goldenHour from "@/assets/golden-hour.mp3.asset.json";
import windowRain from "@/assets/window-rain.mp3.asset.json";

export type AmbientTrack = { id: string; title: string; description: string; src?: string };
export const ambientTracks: AmbientTrack[] = [
  { id: "golden-hour", title: "Golden Hour", description: "Warm pads & guitar · Original ambience", src: goldenHour.url },
  { id: "window-rain", title: "Window Rain", description: "Water textures & piano · Original ambience", src: windowRain.url },
  { id: "quiet-room", title: "Quiet Room", description: "A little silence · Audio not yet added" },
];