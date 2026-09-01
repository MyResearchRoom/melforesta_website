import { motion } from "framer-motion";
import { Link } from "react-router";
import { ArrowRight, Droplet, Heart, Leaf, Shield, Users, Sparkles } from "lucide-react";
import migrationCircle from "../../../assets/comman/image-1.png";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

const fade = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
};

// ── Reusable section header ──────────────────────────────────────────────────
function SectionHeader({ title, subtitle }) {
  return (
    <div className="text-center mb-10">
      <h3 className="text-2xl md:text-3xl text-[#3E2C1C] mb-2">{title}</h3>
      {subtitle && <p className="text-[#8B7355] text-sm md:text-base max-w-xl mx-auto">{subtitle}</p>}
    </div>
  );
}

// ── Icon badge ───────────────────────────────────────────────────────────────
function IconBadge({ icon: Icon, color = "from-[#D4A017] to-[#B8860B]", size = "md" }) {
  const dim = size === "lg" ? "w-14 h-14" : "w-10 h-10";
  const icon = size === "lg" ? "w-7 h-7" : "w-5 h-5";
  return (
    <div className={`${dim} bg-gradient-to-br ${color} rounded-full flex items-center justify-center`}>
      <Icon className={`${icon} text-white`} />
    </div>
  );
}

export default function Section9() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#F5E6D3] to-white">
      <div className="max-w-6xl mx-auto space-y-24">

        {/* ── Page Header ── */}
        <motion.div {...fade} className="text-center">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#D4A017] mb-3">
            Mel Foresta
          </p>
          <h2 className="text-4xl md:text-5xl text-[#3E2C1C] mb-4">From Hives to Home</h2>
          <p className="text-lg text-[#8B7355] max-w-lg mx-auto">
            Natural honey through seasonal migration across India
          </p>
        </motion.div>

        {/* ── Quick Stats ── */}
        <motion.div {...fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "2nd Largest", sub: "Honey exporter globally" },
            { label: "1.4L MT",     sub: "Annual production" },
            { label: "3L+ People",  sub: "Supported by the industry" },
            { label: "₹25.2B",      sub: "Market size 2023" },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-sm border border-[#D4A017]/10 p-5 text-center"
            >
              <p className="text-2xl font-semibold text-[#D4A017] mb-1">{stat.label}</p>
              <p className="text-xs text-[#8B7355] leading-snug">{stat.sub}</p>
            </div>
          ))}
        </motion.div>

        {/* ── Why Honey Over Sugar ── */}
        <motion.div {...fade}>
          <SectionHeader title="Why Choose Honey Over Sugar?" />
          <div className="bg-white rounded-2xl shadow-sm border border-[#D4A017]/10 p-8">
            <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#D4A017]/10 gap-6 md:gap-0">
              {[
                {
                  title: "Natural Nutrition",
                  items: ["Vitamins B1–B6 & C", "Calcium, iron, magnesium, zinc", "Natural enzymes (diastase)", "Amino acids"],
                },
                {
                  title: "Health Benefits",
                  items: ["Immunity-boosting antioxidants", "Natural energy (fructose + glucose)", "Digestive & throat comfort", "Antibacterial properties"],
                },
                {
                  title: "vs. Refined Sugar",
                  items: ["Bioavailable nutrients", "Lower glycemic index", "No artificial processing", "Functional superfood"],
                },
              ].map((col, i) => (
                <div key={i} className="pt-6 md:pt-0 md:px-8 first:pt-0 first:pl-0 last:pr-0">
                  <h4 className="text-[#D4A017] font-semibold mb-3 text-sm uppercase tracking-wide">
                    {col.title}
                  </h4>
                  <ul className="space-y-1.5">
                    {col.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-[#8B7355]">
                        <span className="text-[#D4A017] mt-0.5">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Migration Map ── */}
        <motion.div {...fade}>
          <SectionHeader
            title="Seasonal Honey Migration Across India"
            subtitle="Traceable sources, chemical-free zones, and richer nutrition — season after season."
          />
          <div className="grid lg:grid-cols-3 gap-6 items-start">
            <div className="space-y-4">
              {[
                { icon: Droplet, title: "Natural",        desc: "Seasonal & traceable from verified sources" },
                { icon: Heart,   title: "Better Nutrition", desc: "Higher antioxidants & natural enzymes" },
                { icon: Leaf,    title: "Chemical-Free",  desc: "Forest honey = zero pesticide exposure" },
              ].map(({ icon, title, desc }, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm border border-[#D4A017]/10 p-5 flex items-start gap-4">
                  <IconBadge icon={icon} />
                  <div>
                    <h4 className="text-[#3E2C1C] font-semibold text-sm mb-0.5">{title}</h4>
                    <p className="text-xs text-[#8B7355]">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-[#D4A017]/10 p-4">
              <img
                src={migrationCircle}
                alt="Honey Migration Across India — Seasonal Flow"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </motion.div>

        {/* ── Forest vs Monofloral ── */}
        <motion.div {...fade}>
          <SectionHeader title="Two Kinds of Exceptional Honey" />
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-[#2F4F2F] to-[#228B22] text-white p-8 rounded-2xl shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <Leaf className="w-7 h-7 flex-shrink-0" />
                <h3 className="text-xl font-semibold">Forest / Wild Honey</h3>
              </div>
              <p className="text-white/80 text-sm mb-5">
                From wild bees (Apis dorsata) in untouched forests — Himalaya, Sundarban, Central India, Northeast.
              </p>
              <ul className="space-y-2 text-sm text-white/80">
                {[
                  "Zero pesticides — no agricultural exposure",
                  "Multifloral: neem, mahua, jamun, wild herbs",
                  "Higher antioxidants (darker = more polyphenols)",
                  "Rich in pollen, propolis, enzymes",
                  "Raw, unfiltered, unheated",
                  "Supports tribal communities & biodiversity",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-0.5 text-white/60">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-[#D4A017] to-[#B8860B] text-white p-8 rounded-2xl shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <Droplet className="w-7 h-7 flex-shrink-0" />
                <h3 className="text-xl font-semibold">Monofloral Bee Box Honey</h3>
              </div>
              <p className="text-white/80 text-sm mb-5">
                From managed bee boxes near specific crops — sourced from chemical-free or low-input zones.
              </p>
              <ul className="space-y-2 text-sm text-white/80">
                {[
                  "Single-source: Mustard, Litchi, Ajwain, Tulsi, Nilgiri",
                  "Distinct flavor, color & health profile per flower",
                  "Traceable to exact region & season",
                  "Supports farmers (pollination boosts yields 20–40%)",
                  "Raw & unprocessed (never heated above 40°C)",
                  "FSSAI-compliant quality",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-0.5 text-white/60">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* ── Pesticide Safety ── */}
        <motion.div {...fade}>
          <div className="bg-white rounded-2xl shadow-sm border-l-4 border-[#D4A017] p-8">
            <div className="flex items-start gap-5">
              <Shield className="w-9 h-9 text-[#D4A017] flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl text-[#3E2C1C] font-semibold mb-3">Why Forest Honey Is Safer</h3>
                <p className="text-sm text-[#8B7355] mb-3">
                  India is the 4th largest pesticide user globally. Studies (ICMR, ICAR) show 8–10% of food samples
                  contain detectable pesticides. Bees near intensive farms can carry residues back to hives —
                  impairing olfaction, reducing brood rearing by 46%, and cutting honey yield by 66%.
                </p>
                <div className="bg-[#F5E6D3] rounded-lg p-4 text-sm text-[#3E2C1C]">
                  <strong>Mel Foresta's answer:</strong> Forest honeys from the Himalaya, Sundarban (GI-tagged 2024),
                  and MP/Chhattisgarh tribal forests — completely outside agricultural chemical chains. Bee box honeys
                  sourced only from low-pesticide zones (Ajwain, Litchi, Nilgiri, Tulsi).
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Benefits Beyond the Jar ── */}
        <motion.div {...fade}>
          <SectionHeader title="Benefits Beyond the Jar" />
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Heart,
                color: "from-[#D4A017] to-[#B8860B]",
                title: "For You",
                items: ["14 distinct traceable varieties", "Chemical-free, raw, unadulterated", "FSSAI-compliant quality", "Support Indian biodiversity"],
              },
              {
                icon: Sparkles,
                color: "from-[#6B8E23] to-[#228B22]",
                title: "For Farmers",
                items: ["Pollination boosts yields 20–40%", "Earn ₹15–20L/year from beekeeping", "NBHM scheme support (₹500 Cr)", "Sustainable supplemental income"],
              },
              {
                icon: Users,
                color: "from-[#2F4F2F] to-[#228B22]",
                title: "For Tribal Communities",
                items: ["TRIFED: 14 producer organisations", "Kondha, Gond, Mouli harvesters", "Sustainable forest livelihoods", "Doubled incomes via WWF projects"],
              },
            ].map(({ icon, color, title, items }, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-[#D4A017]/10 p-6 flex flex-col items-center text-center">
                <IconBadge icon={icon} color={color} size="lg" />
                <h4 className="text-lg text-[#3E2C1C] font-semibold mt-4 mb-3">{title}</h4>
                <ul className="space-y-1.5 w-full">
                  {items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-[#8B7355]">
                      <span className="text-[#D4A017] mt-0.5">•</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Bee Species ── */}
        <motion.div {...fade}>
          <SectionHeader
            title="India's Five Honey Bee Species"
            subtitle="Each species contributes uniquely to India's rich honey diversity."
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            {[
              { name: "Rock Bee",         scientific: "Apis dorsata",           yield: "36 kg / comb",      trait: "Wild forest honey" },
              { name: "Indian Hive Bee",  scientific: "Apis cerana indica",     yield: "6–8 kg / colony",   trait: "Tribal beekeeping" },
              { name: "Dwarf Bee",        scientific: "Apis florea",            yield: "0.5 kg / hive",     trait: "Gentle sting" },
              { name: "Italian Bee",      scientific: "Apis mellifera",         yield: "25–40 kg / colony", trait: "Highest yield" },
              { name: "Stingless Bee",    scientific: "Melipona irridipinnis",  yield: "1–2 kg / year",     trait: "Medicinal honey" },
            ].map((bee, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-[#D4A017]/10 p-4 text-center">
                <h4 className="text-[#3E2C1C] font-semibold text-sm mb-1">{bee.name}</h4>
                <p className="text-xs italic text-[#8B7355] mb-3">{bee.scientific}</p>
                <p className="text-sm font-semibold text-[#D4A017] mb-0.5">{bee.yield}</p>
                <p className="text-xs text-[#8B7355]">{bee.trait}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              { color: "from-[#D4A017] to-[#B8860B]", stat: "1/12th",  desc: "Teaspoon of honey one bee makes in its lifetime" },
              { color: "from-[#6B8E23] to-[#228B22]", stat: "75%",     desc: "India's crops depend on bee pollination" },
              { color: "from-[#2F4F2F] to-[#228B22]", stat: "5 Years", desc: "Queen bee lifespan vs 6 weeks for workers" },
            ].map(({ color, stat, desc }, i) => (
              <div key={i} className={`bg-gradient-to-br ${color} text-white rounded-xl p-6 text-center shadow-md`}>
                <p className="text-3xl font-semibold mb-1">{stat}</p>
                <p className="text-sm text-white/80">{desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── CTA ── */}
        <motion.div {...fadeUp} className="text-center">
          <Link
            to="/productpage"
            className="inline-flex items-center gap-2 bg-[#D4A017] hover:bg-[#B8860B] text-white px-8 py-4 rounded-lg transition-all shadow-md hover:shadow-lg hover:scale-105 text-base font-medium"
          >
            Explore Our Honey
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}