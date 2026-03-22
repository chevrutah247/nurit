'use client';

import Image from 'next/image';
import { useLanguage } from '@/components/language-provider';
import { teamMembers } from '@/content/site';

export default function TeamPage() {
  const { copy, language } = useLanguage();
  const isRu = language === 'rus';

  const leader = teamMembers.find((m) => m.roleKey === 'lead');
  const members = teamMembers.filter((m) => m.roleKey !== 'lead');

  const getName = (m: typeof teamMembers[0]) => (isRu && m.nameRu) ? m.nameRu : m.name;
  const getBio = (m: typeof teamMembers[0]) => (isRu && m.bioRu) ? m.bioRu : m.bio;

  return (
    <div className="subpage">
      <h1>{copy.team.title}</h1>
      <p style={{ textAlign: 'center', color: '#6a5f4f', maxWidth: 600, margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
        {copy.team.text}
      </p>

      {/* Leader — featured card */}
      {leader && (
        <div style={{
          background: 'var(--bg-alt, rgba(255,255,255,0.04))',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 16,
          overflow: 'hidden',
          marginBottom: '2.5rem',
          padding: '2.5rem',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{
              width: 240, height: 240, borderRadius: '50%', overflow: 'hidden',
              border: '3px solid var(--gold, #d4a853)', position: 'relative', flexShrink: 0,
            }}>
              {leader.image ? (
                <Image src={leader.image} alt={getName(leader)} fill style={{ objectFit: 'cover', objectPosition: 'center top' }} />
              ) : (
                <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, rgba(212,168,83,0.2), rgba(212,168,83,0.05))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 56, color: 'var(--gold, #d4a853)' }}>
                  {getName(leader)[0]}
                </div>
              )}
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ color: 'var(--gold, #d4a853)', fontSize: 12, textTransform: 'uppercase', letterSpacing: 3, marginBottom: 8, opacity: 0.6 }}>
                {copy.team.eyebrow}
              </p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--gold, #d4a853)', marginBottom: 4 }}>
                {getName(leader)}
              </h2>
              <p style={{ color: '#8a7a5a', fontSize: 14, marginBottom: 16 }}>
              </p>
              {getBio(leader) && (
                <p style={{ color: '#4a3f2f', lineHeight: 1.8, maxWidth: 600, margin: '0 auto', fontSize: '1.05rem' }}>
                  {getBio(leader)}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Team grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1.5rem',
      }}>
        {members.map((member) => (
          <article key={member.id} style={{
            background: 'var(--bg-alt, rgba(255,255,255,0.04))',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 16,
            padding: '1.75rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1rem' }}>
              <div style={{
                width: 120, height: 120, borderRadius: '50%', overflow: 'hidden',
                border: '2px solid rgba(212,168,83,0.25)', position: 'relative', flexShrink: 0,
              }}>
                {member.image ? (
                  <Image src={member.image} alt={getName(member)} fill style={{ objectFit: 'cover', objectPosition: 'center top' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, rgba(212,168,83,0.15), rgba(212,168,83,0.05))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, color: 'var(--gold, #d4a853)' }}>
                    {getName(member)[0]}
                  </div>
                )}
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--gold, #d4a853)', marginBottom: 4 }}>
                  {getName(member)}
                </h3>
                <p style={{ color: '#8a7a5a', fontSize: 13 }}>
                  {copy.team.memberRole}
                </p>
              </div>
            </div>
            {getBio(member) && (
              <p style={{ color: '#5a4f3f', fontSize: 15, lineHeight: 1.75 }}>
                {getBio(member)}
              </p>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
