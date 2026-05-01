import { Callout } from '@/components/Callout'
import { NewTabLink } from '@/components/NewTabLinks'
import { QuickLink, QuickLinks } from '@/components/QuickLinks'
import { Tabs, Tab } from '@/components/Tabs'
import { SectionCards } from '@/components/SectionCards'
import { Answer } from '@/components/Answer'
import { FaqList, FaqItem } from '@/components/Faq'
import { HowTo } from '@/components/HowTo'

const tags = {
  callout: {
    attributes: {
      title: { type: String },
      type: {
        type: String,
        default: 'note',
        matches: ['note', 'warning'],
        errorLevel: 'critical',
      },
    },
    render: Callout,
  },
  figure: {
    selfClosing: true,
    attributes: {
      src: { type: String },
      alt: { type: String },
      caption: { type: String },
    },
    render: ({ src, alt = '', caption }) => (
      <figure>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} />
        <figcaption>{caption}</figcaption>
      </figure>
    ),
  },
  'quick-links': {
    render: QuickLinks,
  },
  'quick-link': {
    selfClosing: true,
    render: QuickLink,
    attributes: {
      title: { type: String },
      description: { type: String },
      icon: { type: String },
      href: { type: String },
      newtab: { type: Boolean },
    },
  },
  'new-tab-link': {
    selfClosing: true,
    render: NewTabLink,
    attributes: {
      href: { type: String },
      title: { type: String },
      newtab: { type: Boolean },
    },
  },
  tabs: {
    render: Tabs,
    attributes: {
      labels: { type: Array },
    },
  },
  tab: {
    render: Tab,
    attributes: {
      label: { type: String },
    },
  },
  'section-cards': {
    selfClosing: true,
    render: SectionCards,
  },
  // {% answer %}...{% /answer %} — direct-answer callout for AEO/LLM extraction.
  answer: {
    render: Answer,
  },
  // {% faq %}{% faq-item question="..." %}...{% /faq-item %}{% /faq %}
  // FaqList emits FAQPage JSON-LD when frontmatter `items` is provided.
  faq: {
    render: FaqList,
    attributes: {
      items: { type: Array },
    },
  },
  'faq-item': {
    render: FaqItem,
    attributes: {
      question: { type: String },
      answer: { type: String },
    },
  },
  // {% howto name="..." description="..." %} ordered list {% /howto %}
  howto: {
    render: HowTo,
    attributes: {
      name: { type: String },
      description: { type: String },
      steps: { type: Array },
    },
  },
}

export default tags
