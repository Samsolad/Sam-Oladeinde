export const PILLARS = [
  {
    id: 'career',
    num: '01',
    icon: '📚',
    label: 'Career & Income',
    tagline: 'The roadmap nobody handed you when you landed.',
    desc: 'Books, toolkits, and a diaspora marketplace that give African immigrants everything they need to earn, grow, and navigate the UK career system from day one.',
    products: [
      { name: '52 Weeks UK Blueprint', type: 'Book Series', status: 'live', desc: '4-book roadmap from landing to £4K+/month. Built from 10+ real immigrant success interviews.' },
      { name: 'UK Career Pivot Toolkit', type: 'Notion Template', status: 'live', desc: '30-page command centre for job search, CV, networking and income tracking.' },
      { name: 'TADM', type: 'SaaS Platform', status: 'live', desc: 'The African Diaspora Market. Advertisers reach diaspora audiences. Affiliates earn commission on every conversion.' },
    ],
  },
  {
    id: 'community',
    num: '02',
    icon: '🏛️',
    label: 'Community Infrastructure',
    tagline: 'Systems that make African communities safer and stronger.',
    desc: 'Software replacing WhatsApp chaos with structured, GDPR-compliant platforms. Built from problems witnessed firsthand in diaspora church communities.',
    products: [
      { name: 'Transport Team', type: 'SaaS Platform', status: 'live', desc: 'GDPR-compliant transport coordination for churches, SEND schools, and community programmes.' },
      { name: 'PresenceIQ', type: 'SaaS Platform', status: 'live', desc: 'QR-based attendance tracking for diaspora organisations. No paper registers. No WhatsApp chaos.' },
      { name: 'Eventflow', type: 'Mobile App', status: 'building', desc: 'Community event discovery, creation, and chip-in payments — built for the African diaspora social calendar.' },
    ],
  },
  {
    id: 'wealth',
    num: '03',
    icon: '🏦',
    label: 'Wealth Building',
    tagline: 'Build assets that outlast you.',
    desc: 'Investment platforms and property strategies that open the wealth doors African immigrants have historically been locked out of — structured, accessible, diaspora-first.',
    products: [
      { name: 'Okoowo', type: 'Investment Platform', status: 'building', desc: 'UK-Nigeria investment corridor. Diaspora investors back African SMEs through a structured, trust-first platform. Okoowo means investment in Yoruba.' },
      { name: 'Property Strategy', type: 'Knowledge Product', status: 'coming', desc: 'Rent-to-rent, HMO, and UK property investment guides built for African immigrants starting from zero capital.' },
      { name: 'Diaspora Investment Club', type: 'Community', status: 'coming', desc: 'Pooled capital investment group. Collective wealth-building for Africans in the diaspora.' },
    ],
  },
  {
    id: 'trade',
    num: '04',
    icon: '🌍',
    label: 'Cross-Border Trade',
    tagline: 'Move goods, money, and opportunity between two worlds.',
    desc: 'Infrastructure connecting the Nigerian and UK economies through people, goods, and trusted logistics — so the diaspora can live freely across both worlds.',
    products: [
      { name: 'TDDM', type: 'Logistics Platform', status: 'building', desc: 'Verified travellers flying Nigeria-to-UK carry fashion items for sellers and get paid. Escrow-protected. Trust-first.' },
      { name: 'Diaspora Chauffeur', type: 'Mobile App', status: 'building', desc: 'Vetted local drivers for diaspora visitors in Nigeria. You provide the car — they provide the expertise.' },
      { name: 'Ojooja', type: 'Delivery Platform', status: 'coming', desc: 'Trust-first local delivery for Nigerian SMEs. Lagos pickup and returns — eventually the Nigeria-end infrastructure for TDDM.' },
    ],
  },
  {
    id: 'culture',
    num: '05',
    icon: '✨',
    label: 'Culture & Wellness',
    tagline: 'Stay rooted while you grow.',
    desc: 'Experiences, events, and products that keep the African diaspora connected to who they are — because thriving here should never mean losing where you came from.',
    products: [
      { name: 'Aquagroove', type: 'Experience Brand', status: 'live', desc: 'Travelling cultural wellness experience — guided swim sessions, African and Caribbean dance, monthly cultural mixers.' },
      { name: 'African Heritage Clothing', type: 'Brand', status: 'building', desc: 'Ethically sourced African heritage clothing. Pre-order model. Direct from artisans.' },
      { name: 'Newcastle Cultural Community', type: 'Community', status: 'live', desc: 'Local diaspora community hub in Newcastle. Events, meetups, and cultural gatherings.' },
    ],
  },
]

export const FILTER_ITEMS = [
  { label: 'All', id: 'all' },
  { label: 'Career & Income', id: 'career' },
  { label: 'Community', id: 'community' },
  { label: 'Wealth', id: 'wealth' },
  { label: 'Cross-Border Trade', id: 'trade' },
  { label: 'Culture & Wellness', id: 'culture' },
]

export const NAV_ITEMS = [
  { label: 'Uncle Sam', id: 'uncle-sam' },
  { label: 'My Story', id: 'community-story' },
  { label: 'JOS', id: 'jos' },
  { label: 'Pillars', id: 'uncle-sam' },
  { label: 'Products', id: 'products' },
  { label: 'Contact', id: 'contact' },
]

export const ECOSYSTEM_NAME = 'Uncle Sam'

export const HERO_STATS = [
  ['10k+', 'Community members (pre-COVID)'],
  ['Since school', 'Building together'],
  ['5', 'Ecosystem pillars'],
  ['11', 'Products & platforms'],
]

export const SAM_BADGES = [
  'Community Builder',
  'Systems Builder',
  'Author',
  'Founder',
]

/** Timeline of community-building — add more chapters as you share them */
export const COMMUNITY_JOURNEY = [
  {
    era: 'Secondary school',
    title: 'Mini street games, one idea',
    desc: 'I brought together a group of students for mini street games competitions — nothing fancy, just neighbours and classmates finding a reason to show up. That small spark became something people looked forward to.',
    icon: '⚽',
  },
  {
    era: 'Growing through the streets',
    title: 'Competitions that spread block by block',
    desc: 'What we started became a regular competition. More streets joined. New faces, new teams, the same simple formula: show up, play, belong. I learned early that community doesn\'t need permission — it needs a first invite.',
    icon: '🏘️',
  },
  {
    era: 'Wellness & belonging',
    title: 'A group that grew to ~10,000 people',
    desc: 'Years later I built a community wellness group focused on health, connection, and showing up for each other. It grew to roughly 10,000 people before COVID-19 hit — proof that the instinct from those street games still worked at scale.',
    icon: '💚',
  },
  {
    era: 'Diaspora & today',
    title: 'Infrastructure for communities that scale',
    desc: 'From Nigeria to the UK, I kept seeing the same gap: people want community, but the tools are WhatsApp chaos, paper registers, and good intentions with no structure. Uncle Sam is me building the systems I wish every diaspora community already had.',
    icon: '🌍',
    highlight: true,
  },
]

export const SAM_STORY = {
  headline: 'I\'ve been building community since secondary school.',
  headlineAccent: 'Uncle Sam is what that instinct grew into.',
  pullQuote:
    'It started with students and street games. It became regular competitions across neighbourhoods. Then a wellness community of thousands. Every product I build today still answers the same question: how do we gather well?',
  paragraphs: [
    'In secondary school I didn\'t set out to be a "community leader." I just saw friends who needed something to do together. We organised mini street games competitions — and people came. Then they came back. Then other streets wanted in.',
    'That pattern never left me. Gather people around something simple and real. Make it repeatable. Let it spread without forcing it. Those street leagues taught me more about leadership than any job title ever could.',
    'Later I poured that same energy into wellness — a community group built around showing up for each other\'s health and wellbeing. Before COVID-19, it had grown to about 10,000 people. The pandemic changed how we met, but it didn\'t change why community matters.',
    'When I moved to the UK, I felt the diaspora version of the same problem: brilliant people, thin infrastructure. Churches coordinating transport on WhatsApp. No safe systems. No scale. So I started building — books, platforms, tools — always rooted in the same origin story.',
  ],
  closing:
    'Uncle Sam isn\'t a rebrand. It\'s the grown-up version of a kid who learned that belonging is built, street by street, then scaled with care.',
}

export const SAM_STATS = [
  ['10k+', 'Wellness community'],
  ['Since school', 'Community builder'],
  ['Nigeria → UK', 'Two-world life'],
  ['5', 'Pillars today'],
]

export const PROBLEM_CARDS = [
  { icon: '💼', title: 'Career Gap', desc: 'The UK hiring system wasn\'t built to read your credentials. The unwritten rules exist — nobody explains them.' },
  { icon: '🏘️', title: 'Community Without Structure', desc: 'You know how to gather people — but diaspora life runs on WhatsApp threads, not systems. Good community needs better infrastructure.' },
  { icon: '💷', title: 'Wealth Locked Out', desc: 'Property, investment, financial systems — all designed for people already inside them.' },
  { icon: '🌱', title: 'Root Disconnect', desc: 'Thriving here shouldn\'t mean losing who you are. But nobody built the bridge between both worlds.' },
]

export const FEATURES = [
  { title: 'Elegant Design', desc: 'Carefully crafted aesthetics that reflect sophistication and attention to detail.', icon: '✨' },
  { title: 'Fully Responsive', desc: 'Looks stunning on every device, from mobile phones to large desktop displays.', icon: '📱' },
  { title: 'Easy Customization', desc: 'Intuitive controls and clear documentation make customization effortless.', icon: '⚙️' },
  { title: 'Performance Optimized', desc: 'Lightning-fast load times and optimized code for the best user experience.', icon: '⚡' },
  { title: 'SEO Friendly', desc: 'Built with search engine optimization best practices from the ground up.', icon: '🔍' },
  { title: 'Lifetime Support', desc: 'Dedicated support team ready to help you succeed with your website.', icon: '🤝' },
]

export const JOS_CAPABILITIES = [
  { icon: '🧠', title: 'Knows You', desc: 'Your goals, pressures, timelines, and two-world context — always in view.' },
  { icon: '📋', title: 'Manages Everything', desc: 'Career moves, wealth targets, community commitments, home visits — coordinated.' },
  { icon: '🎯', title: 'Pushes You Forward', desc: 'Not just a task list. A mentor that holds you accountable to the life you said you wanted.' },
  { icon: '🔄', title: 'Adapts in Real Time', desc: 'Life changes. JOS changes with it — recalibrating without you having to start over.' },
  { icon: '🌍', title: 'Built for Two Worlds', desc: 'Understands the UK-Nigeria (and broader diaspora) context that no generic AI assistant does.' },
  { icon: '🔗', title: 'Connects All Pillars', desc: 'Your Career, Wealth, Community, Trade and Culture goals — unified in one intelligence.' },
]

export const JOS_MESSAGES = [
  { role: 'jos', text: "Good morning, Sam. Your Okoowo investor deck needs updating before Thursday's call. Want to start there?" },
  { role: 'user', text: "Yes. Also remind me to call Mum — it's been 3 weeks." },
  { role: 'jos', text: "Done. I've blocked 30 minutes for the deck at 6am. Mum reminder set for 8pm. You're also 2 days behind on your 52 Weeks chapter — want me to adjust this week's schedule?" },
  { role: 'user', text: 'Yes please.' },
  { role: 'jos', text: "Adjusted. You're back on track. One thing — your Transport Team trial conversions dropped 12% this week. I've drafted 3 re-engagement emails for your review." },
]

export const BOOKS = [
  { n: '01', t: 'Foundation', s: 'From £0 to £4,000+/month', live: true, p: '£17' },
  { n: '02', t: 'The Playbook', s: 'Week-by-week execution across all 3 routes', live: false },
  { n: '03', t: 'Mastering the System', s: 'UK money, law & life decoded', live: false },
  { n: '04', t: 'Beyond the Blueprint', s: 'From £4K to freedom — the long game', live: false },
]

export const VISION_ITEMS = [
  { icon: '📚', phase: 'Now', title: 'Career & Income', desc: 'Books, toolkit, TADM live and earning' },
  { icon: '🏛️', phase: 'Now', title: 'Community Infrastructure', desc: 'Transport Team & PresenceIQ live' },
  { icon: '🏦', phase: 'Building', title: 'Wealth', desc: 'Okoowo investment platform in development' },
  { icon: '🌍', phase: 'Building', title: 'Cross-Border Trade', desc: 'TDDM & Diaspora Chauffeur in development' },
  { icon: '✨', phase: 'Building', title: 'Culture & Wellness', desc: 'Aquagroove live. Clothing brand coming.' },
  { icon: '🧠', phase: 'Vision', title: 'JOS', desc: 'The operating system that ties it all together' },
]

export const CONTACT_LINKS = [
  { icon: '✉️', label: 'Email', val: 'sam@jednieds.com', href: 'mailto:sam@jednieds.com' },
  { icon: '🛍️', label: 'Gumroad Store', val: 'soladeinde.gumroad.com', href: 'https://soladeinde.gumroad.com' },
  { icon: '🚌', label: 'Transport Team', val: 'transportteam.app', href: 'https://transportteam.app' },
  { icon: '📊', label: 'PresenceIQ', val: 'presenceiq.app', href: 'https://presenceiq.app' },
  { icon: '▶️', label: 'YouTube', val: 'Immigrant Success', href: 'https://youtube.com' },
  { icon: '📱', label: 'Phone (text only)', val: '+44 7747 226904', href: 'tel:+447747226904' },
]

export function statusBadgeVariant(status) {
  if (status === 'live') return 'live'
  if (status === 'building') return 'building'
  return 'coming'
}

export function statusLabel(status) {
  if (status === 'live') return '● Live'
  if (status === 'building') return '⟳ Building'
  return '◌ Coming Soon'
}
