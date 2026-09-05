# CritiDose — ধাপ ২

Right drug, right dose, right patient — even at 3 AM.

**ধাপ ১** — patient bar, ৪৫টা অ্যান্টিবায়োটিক (renal ladder, dialysis, CRRT, liver, level),
CrCl · IBW · AdjBW, Child-Pugh, alias সহ সার্চ, ৯টা টাইলের ড্যাশবোর্ড।

**ধাপ ২** — ৩১টা infusion (নিজের dilution বসিয়ে mL/hr, দুদিকেই কাজ করে),
১৫০টা ওষুধের system-tagged formulary, আর আলাদা dose ↔ mL/hr converter।

বাকি চারটে টাইল খোলে, ভেতরে কোন ধাপে কী আসছে লেখা আছে।

---

## ফাইলগুলো

```
index.html                 অ্যাপ — UI আর হিসাব
data/antibiotics.js        অ্যান্টিবায়োটিক — ডোজ বদলাতে হলে এই ফাইল
data/infusions.js          infusion — dilution ডিফল্ট আর রেঞ্জ
data/formulary.js          ১৫০টা ওষুধ, system ট্যাগসহ
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

Patient-এর তথ্য, প্রতিটা ড্রাগের নোট, আর আপনার সেভ করা dilution — সবই ফোনেই থাকে, সার্ভারে যায় না।
অ্যাপ আপডেট হলেও মোছে না। ব্রাউজারের ডেটা মুছে ফেললে যাবে —
Export/Restore ধাপ ৪-এ আসছে।

---

Decision support only. প্রেসক্রাইব করছেন আপনি; প্রতিটা ডোজ রোগীর সাথে মিলিয়ে দেখে নেবেন।
