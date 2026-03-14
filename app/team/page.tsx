'use client';

import Image from 'next/image';

import { useLanguage } from '@/components/language-provider';
import { teamMembers } from '@/content/site';

export default function TeamPage() {
  const { copy } = useLanguage();

  return (
    <div className="page-stack">
      <section className="page-panel">
        <p className="eyebrow">{copy.team.eyebrow}</p>
        <h1>{copy.team.title}</h1>
        <p>{copy.team.text}</p>
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
              <p className="team-role">
                {member.roleKey === 'lead' ? copy.team.leadRole : copy.team.memberRole}
              </p>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
