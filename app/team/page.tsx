import type { Metadata } from 'next';
import Image from 'next/image';

import { teamMembers } from '@/content/site';

export const metadata: Metadata = {
  title: 'Team',
  description:
    'Meet the NURIT team and the women who help lead and organize the community.',
};

export default function TeamPage() {
  return (
    <div className="page-stack">
      <section className="page-panel">
        <p className="eyebrow">Team</p>
        <h1>Meet the women behind NURIT.</h1>
        <p>
          This page introduces the leadership and the women who help organize the
          community with warmth, care, and dedication.
        </p>
      </section>

      <section className="team-grid" aria-label="NURIT team members">
        {teamMembers.map((member) => (
          <article key={member.id} className="team-card">
            <div className="team-image-wrap">
              <Image
                src={member.image}
                alt={member.name}
                fill
                sizes="(max-width: 980px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="team-image"
              />
            </div>
            <div className="team-copy">
              <p className="team-id">{member.id}</p>
              <h2 className="team-name">{member.name}</h2>
              <p className="team-role">{member.role}</p>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
