import { useMemo, useState } from "react";
import { geoNaturalEarth1, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";
import atlas from "world-atlas/countries-110m.json";
import { Compass, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { places } from "@/lib/world-content";

export function WorldMap() {
  const [selected, setSelected] = useState(0);
  const [filter, setFilter] = useState("all");
  const { outline, projection } = useMemo(() => {
    const topology = atlas as unknown as Topology<{ countries: GeometryCollection }>;
    const land = feature(topology, topology.objects.countries);
    const projection = geoNaturalEarth1().fitExtent([[30, 25], [970, 490]], land);
    return { outline: geoPath(projection)(land), projection };
  }, []);
  const place = places[selected];
  return <div className="atlas-layout">
    <div className="atlas-sheet">
      <div className="atlas-heading"><span>THE WORLD, STILL UNFOLDING</span><Compass size={30} strokeWidth={1} /></div>
      <svg className="atlas-map" viewBox="0 0 1000 520" role="img" aria-label="World map with sample travel destinations">
        <path className="map-land" d={outline ?? ""} />
        <path className="map-journey" d={geoPath(projection)({ type: "LineString", coordinates: places.map(p => p.coordinates) }) ?? ""} />
        {places.map((p, i) => {
        const xy = projection(p.coordinates);
        if (!xy || (filter !== "all" && filter !== p.kind)) return null;
        return <foreignObject key={p.name} x={xy[0] - 18} y={xy[1] - 25} width={36} height={36}><Button variant="quiet" className={`atlas-pin ${selected === i ? "selected" : ""}`} onClick={() => setSelected(i)} aria-label={`Explore ${p.name}`} title={p.name}><MapPin size={20}/></Button></foreignObject>;
      })}
      </svg>
      <span className="atlas-caption">somewhere between here & someday</span>
    </div>
    <aside className="travel-note">
      <div className="map-filters">{[{id:"all",label:"All places"},{id:"visited",label:"Visited"},{id:"dream",label:"Someday"}].map(f => <Button key={f.id} variant="quiet" aria-pressed={filter === f.id} onClick={() => { setFilter(f.id); const index = places.findIndex(p => f.id === "all" || p.kind === f.id); if(index >= 0) setSelected(index); }}>{f.label}</Button>)}</div>
      <div className="mobile-place-list">{places.map((p,i) => filter === 'all' || filter === p.kind ? <Button key={p.name} variant="quiet" aria-pressed={selected === i} onClick={() => setSelected(i)}>{p.name}</Button> : null)}</div>
      <Sparkles size={22} strokeWidth={1}/><p className="eyebrow">{place?.label}</p><h3>{place?.name}</h3><p>{place?.note}</p><span className="handwritten">a little pin, a whole possibility.</span>
    </aside>
  </div>;
}