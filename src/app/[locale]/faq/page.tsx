import { getDictionary, type Locale } from "@/i18n/getDictionary";
import { FAQAccordion } from "@/components/FAQAccordion";
import { AnimatedSection } from "@/components/AnimatedSection";
import { TELEGRAM_LINK } from "@/lib/constants";

export default async function FAQPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  const items = [
    { question: dict.faq.q1, answer: dict.faq.a1 },
    { question: dict.faq.q2, answer: dict.faq.a2 },
    { question: dict.faq.q3, answer: dict.faq.a3 },
    { question: dict.faq.q4, answer: dict.faq.a4 },
    { question: dict.faq.q5, answer: dict.faq.a5 },
    { question: dict.faq.q6, answer: dict.faq.a6 },
    { question: dict.faq.q7, answer: dict.faq.a7 },
    { question: dict.faq.q8, answer: dict.faq.a8 },
  ];

  return (
    <div className="pt-24">
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-400/20 bg-brand-400/5 mb-6">
              <span className="text-xs text-brand-400 font-semibold uppercase tracking-wider">
                FAQ
              </span>
            </div>
            <h1 className="font-[Space_Grotesk] text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
              {dict.faq.title}
            </h1>
            <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
              {dict.faq.subtitle}
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="pb-16 sm:pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <FAQAccordion items={items} />
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-gradient-to-b from-surface-900 via-surface-800/30 to-surface-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="font-[Space_Grotesk] text-2xl sm:text-3xl font-bold text-white mb-4">
              {locale === "fa"
                ? "سوال دیگری دارید؟"
                : "Still have questions?"}
            </h2>
            <p className="text-neutral-400 mb-8">
              {locale === "fa"
                ? "از طریق تلگرام با ما تماس بگیرید و تیم ما به شما کمک خواهد کرد."
                : "Reach out to us on Telegram and our team will help you out."}
            </p>
            <a
              href={TELEGRAM_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-brand-500 hover:bg-brand-400 text-black font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-brand-500/25"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.334-.373-.121l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.832.942z" />
              </svg>
              {locale === "fa" ? "تماس از طریق تلگرام" : "Contact via Telegram"}
            </a>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
