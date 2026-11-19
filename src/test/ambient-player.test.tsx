import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AmbientPlayer } from "@/components/ambient-player";

beforeEach(() => { vi.stubGlobal("ResizeObserver", class { observe() {} unobserve() {} disconnect() {} }); });
afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals(); });
const tracks = [{ id: "one", title: "One", description: "Ambient", src: "/one.mp3" }, { id: "two", title: "Two", description: "Ambient", src: "/two.mp3" }, { id: "quiet", title: "Quiet", description: "Silence" }];

describe("room audio", () => {
  it("plays only after a gesture and pauses with the playback control", async () => {
    const play = vi.spyOn(HTMLMediaElement.prototype, "play").mockImplementation(function (this: HTMLMediaElement) { this.dispatchEvent(new Event("playing")); return Promise.resolve(); });
    const pause = vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(function (this: HTMLMediaElement) { this.dispatchEvent(new Event("pause")); });
    render(<AmbientPlayer tracks={tracks} />);
    expect(play).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: "Play ambient audio" }));
    await waitFor(() => expect(screen.getByRole("button", { name: "Pause ambient audio" })).toBeEnabled());
    fireEvent.click(screen.getByRole("button", { name: "Pause ambient audio" }));
    expect(pause).toHaveBeenCalledOnce();
    expect(screen.getByRole("button", { name: "Play ambient audio" })).toBeEnabled();
  });
  it("switches between multiple tracks and wraps previous selection", () => {
    vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => {});
    const { container } = render(<AmbientPlayer tracks={tracks} />);
    fireEvent.click(screen.getByRole("button", { name: "Next track" }));
    expect(container.querySelector("audio")).toHaveAttribute("src", "/two.mp3");
    fireEvent.click(screen.getByRole("button", { name: "Previous track" }));
    fireEvent.click(screen.getByRole("button", { name: "Previous track" }));
    expect(container.querySelector("audio")).toBeNull();
    expect(screen.getByRole("button", { name: "Play ambient audio" })).toBeDisabled();
  });
  it("handles a missing source with disabled playback and no audio element", () => {
    const { container } = render(<AmbientPlayer tracks={[{ id: "quiet", title: "Quiet", description: "Silence" }]} />);
    expect(container.querySelector("audio")).toBeNull();
    expect(screen.getByRole("button", { name: "Play ambient audio" })).toBeDisabled();
    expect(screen.getByRole("status")).toHaveTextContent("No audio file is available");
  });
  it("handles rejected playback without claiming the track is playing", async () => {
    vi.spyOn(HTMLMediaElement.prototype, "play").mockRejectedValue(new Error("Unavailable"));
    render(<AmbientPlayer tracks={tracks} />);
    fireEvent.click(screen.getByRole("button", { name: "Play ambient audio" }));
    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("couldn’t play"));
    expect(screen.getByRole("button", { name: "Play ambient audio" })).toBeEnabled();
  });
  it("applies volume, mute, repeat and seeking to the actual media", () => {
    const { container } = render(<AmbientPlayer tracks={tracks} />);
    const media = container.querySelector("audio");
    if (!media) throw new Error("Missing media");
    expect(media.volume).toBe(0.35);
    expect(media.loop).toBe(true);
    fireEvent.click(screen.getByRole("button", { name: "Repeat track" }));
    expect(media.loop).toBe(false);
    fireEvent.click(screen.getByRole("button", { name: "Mute audio" }));
    expect(media.muted).toBe(true);
    fireEvent.click(screen.getByRole("button", { name: "Unmute audio" }));
    expect(media.muted).toBe(false);
    Object.defineProperty(media, "duration", { value: 30, configurable: true });
    fireEvent.durationChange(media);
    fireEvent.keyDown(screen.getByRole("slider", { name: "Playback position" }), { key: "End" });
    expect(media.currentTime).toBe(30);
  });
});