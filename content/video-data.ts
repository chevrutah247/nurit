// Taharas Mishpocha — rotate daily
export const taharasVideos = [
  'SeWZvO0pxY0', 'zr7_4F3nRs8', 'fof0-gvla1o', 'ViMk0rJuOrg',
  'y9X3gXQWnK8', 'fspQhcdhs_c', 'B3wKBR8k20A', 'oEC5zVOd3Wg', '13oagmfJhbM',
];

// Sicha by parsha
export const sichaByParsha: Record<string, string[]> = {
  'Lech-Lecha': ['SdAU8GFBQOE'],
  'Chayei Sarah': ['d5zRhhnrOhA'],
  'Toldot': ['Zj0jvP-pel8', 'OHuVcCVaK6E'],
  'Vayishlach': ['O_pQT0TBKdQ'],
  'Vayigash': ['ND8OBxXwYMY'],
  'Vayechi': ['m_vLZt5J5WM'],
  'Shemot': ['VqPqHLb2EkM'],
  'Vaera': ['2WnHTmWPQi8'],
  'Bo': ['0Pqn5H2gbuM'],
  'Tetzaveh': ['aw3uqESNR5Q'],
  'Vayikra': ['lkojyNmYGKA'],
  'Achrei Mot': ['P6UNUFSrzzo'],
  'Emor': ['FIFBNYfK3Oo'],
  'Behar': ['lXkSRfVDips'],
  'Bechukotai': ['QZUtXPSb548'],
  'Nasso': ['wKIoXF0r7Cg'],
  "Beha'alotcha": ['bNuwEBAU7PU'],
  "Sh'lach": ['j9XUEqYRy-A'],
  'Korach': ['WxLLpCK0Gc8'],
  'Chukat': ['qWnKCDsGh6Q'],
  'Balak': ['_sVztVUrSE8'],
  'Pinchas': ['lrbd830SB-w'],
  'Matot': ['MwfpPUMQWIc'],
  'Masei': ['MwfpPUMQWIc'],
  'Eikev': ['W5J1eNx4mfo'],
  "Re'eh": ['Y8ru0oBh87Q'],
  'Ki Teitzei': ['aaIhBBU5PgE'],
  'Nitzavim': ['GZrAEdmCKOk'],
};

// Maimar by parsha
export const maimarByParsha: Record<string, string[]> = {
  'Lech-Lecha': ['nX2rGWSiLrY'],
  'Chayei Sarah': ['PhgPZMZy1Bk'],
  'Vayetzei': ['BiPDSwNLugE', '0Q7pacnOsLo'],
  'Shemot': ['63U3Tl8PnXU'],
  'Vaera': ['LKN-8_vTmjw'],
  'Yitro': ['Cvw30WvdbNI'],
  'Vayikra': ['2KeGbvvRllU', 'ICK66VsQDzM'],
  'Emor': ['6pqHt-5ZD00'],
  'Bechukotai': ['qKTHflUCU_c'],
  'Nasso': ['wFPJs6zYOek'],
  "Beha'alotcha": ['90xAaT8W1Uo'],
  "Sh'lach": ['GywWGSBQZgc'],
  'Korach': ['IgbAFnN9oZo'],
  'Chukat': ['xGsXNYFCG98'],
  'Pinchas': ['SHte8ag8Jbk'],
  'Ki Teitzei': ['c3sWkCqsl8c'],
  'Nitzavim': ['ZJEUBHpPQsM'],
};

// Rosh Chodesh videos (show 3 days before)
export const roshChodeshVideos: Record<string, string[]> = {
  'Cheshvan': ['iC3XRB-fPdo', 'bgjQTKEM8jI'],
  'Tevet': ['fM18ljx8Etw'],
  'Sivan': ['OpjFYSlgYcc'],
  'Av': ['16baInYl_10'],
  'Elul': ['1qfGWLxtFoo'],
  'Nisan': ['tb3PICw4Kb8'],
};

// Special dates (show 3 days before)
export const specialDates: { name: string; hebrewMonth: string; hebrewDay: number; videos: string[] }[] = [
  { name: 'Yud Shvat', hebrewMonth: 'Shvat', hebrewDay: 10, videos: ['BH73wh-13L8'] },
  { name: 'Yud Beis Tamuz', hebrewMonth: 'Tamuz', hebrewDay: 12, videos: ['WLoZmxzewZc'] },
  { name: 'Chanukah', hebrewMonth: 'Kislev', hebrewDay: 25, videos: ['hGh5uHAi-ac'] },
  { name: 'Chai Elul', hebrewMonth: 'Elul', hebrewDay: 18, videos: ['VAwCeWi3BP0'] },
];
