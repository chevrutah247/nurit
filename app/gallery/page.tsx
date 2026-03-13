import type { Metadata } from "next";

import { galleryMoments } from "@/content/site";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Browse large, comfortable photo collections from community events."
};

export default function GalleryPage() {
  return (
    <div className="page-stack">
      <section className="page-panel">
        <p className="eyebrow">Gallery</p>
        <h1>Photos should feel warm, organized, and easy to open on any screen.</h1>
      </section>

      <section className="grid-three">
        {galleryMoments.map((moment) => (
          <article key={moment} className="card">
            <h3>{moment}</h3>
            <p>
              Photo albums can later be grouped by year, event, or celebration.
            </p>
          </article>
        ))}
      </section>
    </div>
  );
}
