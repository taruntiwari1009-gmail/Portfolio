import { useMemo, useState } from "react";
import { geoNaturalEarth1, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";
import atlas from "world-atlas/countries-110m.json";
import { Compass, Home, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { places } from "@/lib/world-content";

// Pin icon by kind
function PinIcon({ kind }: { kind: string }) {
  if (kind === "home") return <Home size={18} />;
  if (kind === "visited") return <MapPin size={18} />;
  return <Sparkles size={18} />;
}

export function WorldMap() {
  const [selected, setSelected] = useState(0);
  const [filter, setFilter] = useState("all");

  const { outline, projection } = useMemo(() => {
    const topology = atlas as unknown as Topology<{ countries: GeometryCollection }>;
    const land = feature(topology, topology.objects.countries);
    const proj = geoNaturalEarth1().fitExtent([[30, 25], [970, 490]], land);
    return { outline: geoPath(proj)(land), projection: proj };
  }, []);

  const place = places[selected];

  const filters = [
    { id: "all", label: "All places" },
    { id: "home", label: "Home" },
    { id: "visited", label: "Visited" },
    { id: "dream", label: "Someday" },
  ];

  return (
    <div className="atlas-layout">
      <div className="atlas-sheet">
        <div className="atlas-heading">
          <span>THE WORLD, STILL UNFOLDING</span>
          <Compass size={30} strokeWidth={1} />
        </div>
        <svg
          className="atlas-map"
          viewBox="0 0 1000 520"
          role="img"
          aria-label="World map with travel destinations and wishes"
        >
          <path className="map-land" d={outline ?? ""} />
          {places.map((p, i) => {
            const xy = projection(p.coordinates);
            if (!xy || (filter !== "all" && filter !== p.kind)) return null;
            return (
              <foreignObject key={p.name} x={xy[0] - 18} y={xy[1] - 25} width={36} height={36}>
                <Button
                  variant="quiet"
                  className={`atlas-pin atlas-pin-${p.kind} ${selected === i ? "selected" : ""}`}
                  onClick={() => setSelected(i)}
                  aria-label={`Explore ${p.name}`}
                  title={p.name}
                >
                  <PinIcon kind={p.kind} />
                </Button>
              </foreignObject>
            );
          })}
        </svg>
        <span className="atlas-caption">somewhere between here &amp; someday</span>
      </div>

      <aside className="travel-note">
        <div className="map-filters">
          {filters.map((f) => (
            <Button
              key={f.id}
              variant="quiet"
              aria-pressed={filter === f.id}
              onClick={() => {
                setFilter(f.id);
                const index = places.findIndex((p) => f.id === "all" || p.kind === f.id);
                if (index >= 0) setSelected(index);
              }}
            >
              {f.label}
            </Button>
          ))}
        </div>
        {/* Mobile place list */}
        <div className="mobile-place-list">
          {places.map((p, i) =>
            filter === "all" || filter === p.kind ? (
              <Button
                key={p.name}
                variant="quiet"
                aria-pressed={selected === i}
                onClick={() => setSelected(i)}
              >
                {p.name}
              </Button>
            ) : null,
          )}
        </div>
        <PinIcon kind={place?.kind ?? "dream"} />
        <p className="eyebrow">{place?.label}</p>
        <h3>{place?.name}</h3>
        <p>{place?.note}</p>
        <span className="handwritten">a little pin, a whole possibility.</span>
      </aside>
    </div>
  );
}
