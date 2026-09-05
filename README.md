# CritiDose — সম্পূর্ণ (ধাপ ১–৪)

Right drug, right dose, right patient — even at 3 AM.

**ধাপ ১** — patient bar, ৪৫টা অ্যান্টিবায়োটিক (renal ladder, dialysis, CRRT, liver, level),
CrCl · IBW · AdjBW, Child-Pugh, alias সহ সার্চ, ৯টা টাইলের ড্যাশবোর্ড।

**ধাপ ২** — ৩১টা infusion (নিজের dilution বসিয়ে mL/hr, দুদিকেই কাজ করে),
১৫০টা ওষুধের system-tagged formulary, আর আলাদা dose ↔ mL/hr converter।

**ধাপ ৩** — ১৭টা empiric card (site অনুযায়ী কী দিয়ে শুরু), ১৬টা protocol,
নিজের ওষুধ ও protocol যোগ করার ফর্ম, CSV import, backup/restore,
আর ড্যাশবোর্ডে সবকিছুর সার্চ।

**ধাপ ৪** — ১৪টা Theory পাতা (ব্যাকটেরিওলজি, spectrum, resistance, PK/PD,
pregnancy, duration), steroid equivalence converter, NEWS2 আর SOFA।

ন'টা টাইলই এখন চালু।

## রেফারেন্স সম্পর্কে

এই অ্যাপের লেখা এসেছে একটি AI-এর ট্রেনিং থেকে, গাইডলাইন লাইন ধরে টুকে নয়।
পরে ঝুঁকিপূর্ণ জিনিসগুলো উৎসের সাথে মিলিয়ে ঠিক করা হয়েছে — colistin, vancomycin,
ceftazidime-avibactam, echinocandin, posaconazole, NAC।
বাকিটা এক এক করে যাচাই করা হয়নি।

অ্যাপের ভেতরে **Theory → Where these numbers come from** পাতায় পুরো তালিকা আছে।
প্রতিটা ডেটা ফাইলের মাথায়ও উৎস লেখা।

ডোজ যেখানে গুরুত্বপূর্ণ, নিজের রেফারেন্স বা ইউনিট প্রোটোকল খুলে দেখবেন।

---

## ফাইলগুলো

```
index.html                 অ্যাপ — UI আর হিসাব
data/antibiotics.js        অ্যান্টিবায়োটিক — ডোজ বদলাতে হলে এই ফাইল
data/infusions.js          infusion — dilution ডিফল্ট আর রেঞ্জ
data/formulary.js          ১৫০টা ওষুধ, system ট্যাগসহ
data/disease.js            empiric therapy by site
data/protocols.js          protocol
data/theory.js             রেফারেন্স পাতা
manifest.webmanifest       হোম স্ক্রিনে বসার তথ্য
sw.js                      নেট ছাড়া চালানোর জন্য
icons/                     আইকন
```

ডেটা আর কোড আলাদা রাখা হয়েছে ইচ্ছে করেই। কোনো ডোজ ঠিক করতে হলে
`data/antibiotics.js`-এর নতুন কপি বসিয়ে দিলেই হবে, বাকি কিছু ছোঁয়া লাগবে না।

---

## GitHub Pages-এ তোলা

1. GitHub-এ নতুন repository — নাম `critidose`, **Public**।
2. **Add file → Upload files**। উপরের সব ফাইল ও ফোল্ডার টেনে ছেড়ে দিন
   (`data` আর `icons` ফোল্ডারসহ, কাঠামো যেন একই থাকে)। **Commit changes**।
3. **Settings → Pages**। Source-এ **Deploy from a branch**, branch **main**, folder **/ (root)**। **Save**।
4. এক-দুই মিনিট পর ঠিকানা আসবে — `https://<username>.github.io/critidose/`

HTTPS লাগবেই, নইলে offline অংশটা চলবে না। GitHub Pages এমনিতেই HTTPS দেয়।

## ফোনে বসানো

**Android (Chrome)** — ঠিকানাটা খুলুন → উপরে ডানে ⋮ → *Add to Home screen*।
**iPhone (Safari)** — খুলুন → Share বোতাম → *Add to Home Screen*।

একবার খুললে পুরোটা ফোনে জমা হয়ে যায়। এরপর নেট না থাকলেও চলবে।

## আপডেট করা

GitHub-এ ফাইল বদলালে পরেরবার নেট থাকা অবস্থায় অ্যাপ খুললেই নতুনটা নেমে আসবে।
নেট না থাকলে আগেরটা চলবে — কখনো ফাঁকা স্ক্রিন আসবে না।

## আপনার লেখা

Patient-এর তথ্য, নোট, আপনার যোগ করা ওষুধ-protocol আর সেভ করা dilution — সবই ফোনেই থাকে,
সার্ভারে যায় না। অ্যাপ আপডেট হলেও মোছে না।

ব্রাউজারের ডেটা মুছে ফেললে সব যাবে। তাই **My entries → Backup** থেকে মাঝেমধ্যে
একটা ফাইল নামিয়ে রাখবেন। ঐ ফাইল দিয়েই আবার ফেরানো যায়।

**CSV import** — My entries-এ template নামানোর বোতাম আছে।
কলাম: name, aliases, dose, systems, note। System একাধিক হলে সেমিকোলন দিয়ে।

---

Decision support only. প্রেসক্রাইব করছেন আপনি; প্রতিটা ডোজ রোগীর সাথে মিলিয়ে দেখে নেবেন।
