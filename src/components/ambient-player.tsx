import { useEffect, useRef, useState } from "react";
import { LoaderCircle, Pause, Play, Repeat, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { ambientTracks, type AmbientTrack } from "@/lib/ambient-tracks";
import cover from "@/assets/dusk-cover.webp.asset.json";

const clock = (seconds: number) => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;

export function AmbientPlayer({ tracks = ambientTracks }: { tracks?: AmbientTrack[] }) {
  const [selected, setSelected] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [volume, setVolume] = useState(0.35);
  const [muted, setMuted] = useState(false);
  const [loop, setLoop] = useState(true);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState("");
  const audio = useRef<HTMLAudioElement>(null);
  const request = useRef(0);
  const track = tracks[selected];

  useEffect(() => {
    const media = audio.current;
    if (!media) return;
    media.volume = volume;
    media.muted = muted;
  }, [volume, muted, selected]);
  useEffect(() => () => { request.current += 1; }, []);

  function selectTrack(index: number) {
    if (!tracks.length) return;
    request.current += 1;
    audio.current?.pause();
    setSelected((index + tracks.length) % tracks.length);
    setPlaying(false);
    setLoading(false);
    setTime(0);
    setDuration(0);
    setError("");
  }

  async function togglePlayback() {
    const media = audio.current;
    if (!media || !track?.src) return;
    if (playing || loading) {
      request.current += 1;
      media.pause();
      setPlaying(false);
      setLoading(false);
      return;
    }
    const attempt = ++request.current;
    setError("");
    setLoading(true);
    try {
      if (media.error) media.load();
      await media.play();
      if (attempt !== request.current) return;
      setLoading(false);
    } catch {
      if (attempt !== request.current) return;
      setPlaying(false);
      setLoading(false);
      setError("This track couldn’t play. Try again or choose another sound.");
    }
  }

  const status = !track?.src ? "A quiet moment. No audio file is available for this track." : error || (loading ? "Settling into the room…" : playing ? "Playing softly" : "Paused · ready when you are");
  return <div className="music-player ambient-player" role="region" aria-label="Room ambience">
    {track?.src && <audio key={track.id} ref={audio} src={track.src} preload="none" loop={loop}
      onPlaying={() => { setPlaying(true); setLoading(false); setError(""); }}
      onPause={() => setPlaying(false)} onWaiting={() => { if (playing) setLoading(true); }}
      onEnded={() => { setPlaying(false); setLoading(false); }}
      onTimeUpdate={event => setTime(event.currentTarget.currentTime)}
      onDurationChange={event => { const value = event.currentTarget.duration; setDuration(Number.isFinite(value) ? value : 0); }}
      onError={() => { setPlaying(false); setLoading(false); setError("This audio file is unavailable. Choose another sound or enjoy the quiet."); }} />}
    <div className="ambient-main"><img src={cover.url} alt="" />
      <div className="music-info"><Select value={track?.id ?? ""} onValueChange={id => { const index = tracks.findIndex(item => item.id === id); if (index >= 0) selectTrack(index); }}><SelectTrigger className="ambient-selector" aria-label="Ambient track"><SelectValue placeholder="No tracks available" /></SelectTrigger><SelectContent>{tracks.map(item => <SelectItem key={item.id} value={item.id}>{item.title}{!item.src ? " · No audio" : ""}</SelectItem>)}</SelectContent></Select><small>{track?.description ?? "The room is quiet"}</small></div>
    </div>
    <div className="ambient-timeline"><span>{clock(time)}</span><Slider aria-label="Playback position" value={[time]} min={0} max={duration || 1} step={0.1} disabled={!duration || !track?.src} onValueChange={([value]) => { if (audio.current && value !== undefined) { audio.current.currentTime = value; setTime(value); } }} /><span>{clock(duration)}</span></div>
    <div className="ambient-toolbar"><div className="music-controls">
      <Button variant="quiet" size="icon" aria-label="Previous track" title="Previous track" disabled={tracks.length < 2} onClick={() => selectTrack(selected - 1)}><SkipBack /></Button>
      <Button variant="quiet" size="icon" aria-label={playing || loading ? "Pause ambient audio" : "Play ambient audio"} title={track?.src ? playing ? "Pause" : "Play" : "No audio file available"} disabled={!track?.src} onClick={() => void togglePlayback()}>{loading ? <LoaderCircle className="audio-loading" /> : playing ? <Pause /> : <Play />}</Button>
      <Button variant="quiet" size="icon" aria-label="Next track" title="Next track" disabled={tracks.length < 2} onClick={() => selectTrack(selected + 1)}><SkipForward /></Button>
      <Button variant="quiet" size="icon" aria-label="Repeat track" title="Repeat track" aria-pressed={loop} onClick={() => setLoop(!loop)}><Repeat /></Button>
    </div><div className="ambient-volume"><Button variant="quiet" size="icon" aria-label={muted ? "Unmute audio" : "Mute audio"} title={muted ? "Unmute" : "Mute"} onClick={() => setMuted(!muted)}>{muted || volume === 0 ? <VolumeX /> : <Volume2 />}</Button><Slider aria-label="Volume" value={[muted ? 0 : volume]} min={0} max={1} step={0.01} onValueChange={([value]) => { if (value !== undefined) { setVolume(value); setMuted(false); } }} /></div></div>
    <p className="ambient-status" role="status">{status}</p>
  </div>;
}