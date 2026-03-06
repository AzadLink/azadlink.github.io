"use client";

import { useEffect, useRef, useState } from "react";

interface GeoPoint {
  latitude: number;
  longitude: number;
  country: string;
  city: string;
  connection_count: number;
}

const COUNTRY_NAMES: Record<string, string> = {
  IR: "Iran", CN: "China", RU: "Russia", TR: "Turkey", DE: "Germany",
  US: "United States", NL: "Netherlands", FR: "France", GB: "United Kingdom",
  AE: "UAE", IQ: "Iraq", AF: "Afghanistan", AZ: "Azerbaijan", KG: "Kyrgyzstan",
  PK: "Pakistan", IN: "India", UA: "Ukraine", KZ: "Kazakhstan", AM: "Armenia",
  GE: "Georgia", TJ: "Tajikistan", UZ: "Uzbekistan", SE: "Sweden", CA: "Canada",
  AU: "Australia", JP: "Japan", KR: "South Korea", SA: "Saudi Arabia", EG: "Egypt",
  MM: "Myanmar", FI: "Finland", BY: "Belarus", VE: "Venezuela", OM: "Oman",
  MA: "Morocco", SG: "Singapore", DZ: "Algeria", BR: "Brazil",
  EC: "Ecuador", BD: "Bangladesh", HN: "Honduras", IT: "Italy", JO: "Jordan",
  TM: "Turkmenistan", HK: "Hong Kong", LA: "Laos", RO: "Romania", TZ: "Tanzania",
  KE: "Kenya", ID: "Indonesia", MD: "Moldova", BG: "Bulgaria", LT: "Lithuania",
  CY: "Cyprus", LY: "Libya", PL: "Poland", LB: "Lebanon", MY: "Malaysia",
  CO: "Colombia", BO: "Bolivia", PH: "Philippines", AT: "Austria", TW: "Taiwan",
  KW: "Kuwait", ZA: "South Africa", QA: "Qatar", PY: "Paraguay", SV: "El Salvador",
  SY: "Syria", VN: "Vietnam", NP: "Nepal", CH: "Switzerland", KH: "Cambodia",
};

// ISO 3166-1 alpha-2 → numeric (used in world-atlas TopoJSON)
const ALPHA2_TO_NUMERIC: Record<string, string> = {
  AF: "004", AL: "008", DZ: "012", AO: "024", AR: "032", AM: "051",
  AU: "036", AT: "040", AZ: "031", BD: "050", BY: "112", BE: "056",
  BO: "068", BA: "070", BR: "076", BG: "100", KH: "116", CA: "124",
  CL: "152", CN: "156", CO: "170", HR: "191", CU: "192", CY: "196",
  CZ: "203", CD: "180", DK: "208", EC: "218", EG: "818", SV: "222",
  EE: "233", FI: "246", FR: "250", GE: "268", DE: "276", GH: "288",
  GR: "300", HN: "340", HK: "344", HU: "348", IN: "356", ID: "360",
  IR: "364", IQ: "368", IE: "372", IL: "376", IT: "380", JP: "392",
  JO: "400", KZ: "398", KE: "404", KW: "414", KG: "417", LA: "418",
  LV: "428", LB: "422", LY: "434", LT: "440", MY: "458", MX: "484",
  MD: "498", MN: "496", MA: "504", MM: "104", NP: "524", NL: "528",
  NZ: "554", NG: "566", NO: "578", OM: "512", PK: "586", PY: "600",
  PE: "604", PH: "608", PL: "616", PT: "620", QA: "634", RO: "642",
  RU: "643", SA: "682", SN: "686", RS: "688", SG: "702", SK: "703",
  SI: "705", ZA: "710", KR: "410", ES: "724", LK: "144", SE: "752",
  CH: "756", SY: "760", TW: "158", TJ: "762", TZ: "834", TH: "764",
  TM: "795", TR: "792", UA: "804", AE: "784", GB: "826", US: "840",
  UZ: "860", VE: "862", VN: "704", YE: "887",
};

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GlobeInstance = any;

const COUNTRIES_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export function GlobeVisualization({ locale }: { locale: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<GlobeInstance>(null);
  const [geoData, setGeoData] = useState<GeoPoint[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [countries, setCountries] = useState<any>(null);
  const [hovered, setHovered] = useState<GeoPoint | null>(null);
  const [loaded, setLoaded] = useState(false);
  const countryTotals = useRef<Record<string, number>>({});

  useEffect(() => {
    const loadData = async () => {
      const [geoRes, topoRes, topoJsonLib] = await Promise.all([
        fetch("/data/geo_data.json").then((r) => r.json()),
        fetch(COUNTRIES_URL).then((r) => r.json()),
        import("topojson-client"),
      ]);

      const points = geoRes as GeoPoint[];
      setGeoData(points);

      // Aggregate connections per country (alpha-2 → numeric)
      const totals: Record<string, number> = {};
      for (const p of points) {
        const numericId = ALPHA2_TO_NUMERIC[p.country];
        if (numericId) {
          totals[numericId] = (totals[numericId] || 0) + p.connection_count;
        }
      }
      countryTotals.current = totals;

      const feat = topoJsonLib.feature(topoRes, topoRes.objects.countries);
      setCountries(feat);
    };
    loadData().catch(() => {});
  }, []);

  useEffect(() => {
    if (!containerRef.current || geoData.length === 0 || !countries) return;

    let globe: GlobeInstance = null;
    let destroyed = false;

    const maxLog = Math.log10(
      Math.max(...Object.values(countryTotals.current)) + 1
    );

    // Top N cities for visible markers (limit to avoid clutter)
    const topCities = geoData.slice(0, 80);

    import("globe.gl").then((GlobeModule) => {
      if (destroyed || !containerRef.current) return;

      const Globe = GlobeModule.default;
      globe = new Globe(containerRef.current)
        .globeImageUrl("")
        .backgroundColor("rgba(0,0,0,0)")
        .showAtmosphere(true)
        .atmosphereColor("#4ade80")
        .atmosphereAltitude(0.15)

        // Choropleth country polygons
        .polygonsData(countries.features)
        .polygonCapColor((feat: object) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const id = (feat as any).id as string;
          const total = countryTotals.current[id];
          if (!total) return "rgba(15, 23, 18, 0.6)";
          const t = Math.log10(total + 1) / maxLog;
          if (t > 0.85) return "rgba(34, 197, 94, 0.55)";
          if (t > 0.65) return "rgba(22, 163, 74, 0.4)";
          if (t > 0.45) return "rgba(21, 128, 61, 0.3)";
          if (t > 0.25) return "rgba(20, 83, 45, 0.25)";
          return "rgba(15, 60, 30, 0.18)";
        })
        .polygonSideColor(() => "rgba(0, 0, 0, 0)")
        .polygonStrokeColor(() => "rgba(74, 222, 128, 0.4)")
        .polygonAltitude((feat: object) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const id = (feat as any).id as string;
          const total = countryTotals.current[id];
          if (!total) return 0.003;
          return 0.004;
        })
        .polygonLabel((feat: object) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const f = feat as any;
          const id = f.id as string;
          const total = countryTotals.current[id];
          const name = f.properties?.name || id;
          if (!total) return "";
          return `
            <div style="background:rgba(10,10,10,0.9);padding:8px 12px;border-radius:8px;border:1px solid rgba(74,222,128,0.2);font-family:Inter,sans-serif;">
              <div style="color:#fff;font-weight:600;font-size:13px;">${name}</div>
              <div style="color:#4ade80;font-size:16px;font-weight:700;font-family:'Space Grotesk',sans-serif;">${formatCount(total)} <span style="color:#999;font-size:11px;font-weight:400;">${locale === "fa" ? "اتصال" : "connections"}</span></div>
            </div>
          `;
        })

        // City dot markers
        .pointsData(topCities)
        .pointLat((d: object) => (d as GeoPoint).latitude)
        .pointLng((d: object) => (d as GeoPoint).longitude)
        .pointAltitude(() => 0.01)
        .pointRadius((d: object) => {
          const c = (d as GeoPoint).connection_count;
          const maxC = geoData[0].connection_count;
          const t = Math.log(c + 1) / Math.log(maxC + 1);
          return t * 0.45 + 0.06;
        })
        .pointColor((d: object) => {
          const c = (d as GeoPoint).connection_count;
          if (c > 5_000_000) return "rgba(187, 247, 208, 0.9)";
          if (c > 500_000) return "rgba(74, 222, 128, 0.85)";
          if (c > 50_000) return "rgba(34, 197, 94, 0.75)";
          return "rgba(22, 163, 74, 0.65)";
        })
        .pointsMerge(false)
        .onPointHover((pt: object | null) => {
          setHovered(pt as GeoPoint | null);
          if (containerRef.current) {
            containerRef.current.style.cursor = pt ? "pointer" : "grab";
          }
        })

        .width(containerRef.current.clientWidth)
        .height(containerRef.current.clientHeight);

      // Dark ocean
      const mat = globe.globeMaterial();
      mat.color.set("#040a06");
      mat.emissive.set("#020804");
      mat.emissiveIntensity = 0.04;
      mat.shininess = 0.2;

      // Controls
      const controls = globe.controls();
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.4;
      controls.enableZoom = false;
      controls.minDistance = 200;
      controls.maxDistance = 500;

      // Start centered on Iran
      globe.pointOfView({ lat: 30, lng: 53, altitude: 2.2 }, 0);

      globeRef.current = globe;
      setLoaded(true);
    });

    const handleResize = () => {
      if (globeRef.current && containerRef.current) {
        globeRef.current
          .width(containerRef.current.clientWidth)
          .height(containerRef.current.clientHeight);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      destroyed = true;
      window.removeEventListener("resize", handleResize);
      if (globe) {
        globe.polygonsData([]);
        globe.pointsData([]);
        globe._destructor?.();
      }
      globeRef.current = null;
    };
  }, [geoData, countries, locale]);

  return (
    <div className="relative w-full aspect-square max-w-[700px] mx-auto">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="w-8 h-8 border-2 border-brand-400/30 border-t-brand-400 rounded-full animate-spin" />
        </div>
      )}

      <div ref={containerRef} className="w-full h-full" />

      {hovered && (
        <div className="absolute top-4 start-4 bg-surface-900/90 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 pointer-events-none z-10">
          <p className="text-white font-semibold text-sm">
            {hovered.city !== "Unknown" ? `${hovered.city}, ` : ""}
            {COUNTRY_NAMES[hovered.country] || hovered.country}
          </p>
          <p className="text-brand-400 font-[Space_Grotesk] text-lg font-bold">
            {formatCount(hovered.connection_count)}{" "}
            <span className="text-xs text-neutral-400 font-normal">
              {locale === "fa" ? "اتصال" : "connections"}
            </span>
          </p>
        </div>
      )}

      <div className="absolute bottom-4 start-4 pointer-events-none z-10 space-y-1.5">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-brand-200" />
          <span className="text-[11px] text-neutral-400">{locale === "fa" ? "بیش از ۵ میلیون" : "5M+ connections"}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-brand-400" />
          <span className="text-[11px] text-neutral-400">{locale === "fa" ? "۵۰۰ هزار+" : "500K+"}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-brand-600" />
          <span className="text-[11px] text-neutral-400">{locale === "fa" ? "۵۰ هزار+" : "50K+"}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-brand-700" />
          <span className="text-[11px] text-neutral-400">{locale === "fa" ? "سایر" : "Other"}</span>
        </div>
      </div>
    </div>
  );
}
