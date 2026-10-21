/* =========================================================
   PRABU SENSI ULTRA — storefront logic
   ========================================================= */

/* ----------------------------- config ----------------------------- */
const STORE = {
  name: "Prabu Sensi Ultra",
  whatsapp: "6282262919154",          // format 62xxx, tanpa + dan spasi
  discord: "https://discord.gg/UFZdEjSz7x",
  tiktok: "https://www.tiktok.com/@prabuu121?is_from_webapp=1&sender_device=pc",
  qris: "assets/img/qris-prabu.jpg",   // QRIS resmi Prabu, NMID ID1026559353366
  currency: "Rp",
};

// Biaya admin wajib, ditambahkan ke setiap order. Nominal QRIS statis,
// jadi pembeli wajib transfer pas: harga paket + fee ini.
const ADMIN_FEE = 500;

/* ----------------------------- helpers ----------------------------- */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const rupiah = (n) => new Intl.NumberFormat("id-ID").format(n);

/* ----------------------------- icons ----------------------------- */
const ICONS = {
  crosshair: '<circle cx="12" cy="12" r="8.5"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/>',
  pulse: '<path d="M3 12h4l2.2-6 3.6 12 2.2-6H21"/>',
  eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
  scan: '<path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3"/><circle cx="12" cy="12" r="3"/>',
  shield: '<path d="M12 3 4.5 6v6c0 4.5 3.2 7.8 7.5 9 4.3-1.2 7.5-4.5 7.5-9V6L12 3Z"/><path d="m9 12 2 2 4-4"/>',
  cpu: '<rect x="7" y="7" width="10" height="10" rx="2"/><path d="M10 2v3M14 2v3M10 19v3M14 19v3M2 10h3M2 14h3M19 10h3M19 14h3"/>',
  video: '<rect x="3" y="6" width="13" height="12" rx="2"/><path d="m16 10 5-3v10l-5-3"/>',
};

/* ----------------------------- catalog ----------------------------- */
const FEATURES = [
  {
    name: "AimNeck",
    desc: "Bidikan otomatis nempel ke leher musuh. FOV circle dan radius tinggal diatur pas di panel.",
    cat: "Aim",
    catKey: "aim",
    tier: "ULTRA",
    icon: "crosshair",
    games: "Free Fire",
  },
  {
    name: "ESP Line",
    desc: "Garis lurus dari crosshair ke musuh, tembus dinding. Panjang, ketebalan, dan warna bebas diatur.",
    cat: "ESP",
    catKey: "esp",
    tier: "ULTRA",
    icon: "eye",
    games: "Free Fire",
  },
  {
    name: "ESP Command Box",
    desc: "Kotak sudut tegas di sekeliling musuh plus info nama, jarak, dan HP. Satu panel command.",
    cat: "ESP",
    catKey: "esp",
    tier: "PRO",
    icon: "scan",
    games: "Free Fire",
  },
  {
    name: "ESP Healthbar",
    desc: "Bar HP di atas kepala musuh, warnanya ngikutin sisa darah. Sekali lihat tau siapa yang tinggal tipis.",
    cat: "ESP",
    catKey: "esp",
    tier: "PRO",
    icon: "pulse",
    games: "Free Fire",
  },
  {
    name: "Anti-Ban Shield",
    desc: "Bypass signature, HWID clean, device spoof. Update tiap patch, tanpa nunggu lama.",
    cat: "Safety",
    catKey: "safety",
    tier: "ULTRA",
    icon: "shield",
    games: "Free Fire",
  },
  {
    name: "HWID Spoofer",
    desc: "Ganti identitas hardware sekali klik. Aman buat akun utama dan device bekas.",
    cat: "Safety",
    catKey: "safety",
    tier: "PRO",
    icon: "cpu",
    games: "Free Fire",
  },
  {
    name: "Stream Mode",
    desc: "Overlay aman buat rekam atau live. Panel disembunyiin dari capture, visual tetap bersih.",
    cat: "Safety",
    catKey: "safety",
    tier: "NEW",
    icon: "video",
    games: "Free Fire",
  },
];

/* ----------------------------- plans ----------------------------- */
const PLANS = {
  personal: [
    {
      id: "day", name: "1 Hari", days: 1, price: 10000, old: 12000,
      features: ["Semua fitur kebuka", "Proses cepat", "Support 24/7"],
    },
    {
      id: "3day", name: "3 Hari", days: 3, price: 28000, old: 36000,
      features: ["Semua fitur kebuka", "Proses cepat", "Garansi terbatas"],
    },
    {
      id: "week", name: "1 Minggu", days: 7, price: 60000, old: 75000,
      badge: "Paling Laris", popular: true,
      features: ["Semua fitur kebuka", "Proses order prioritas", "Grup tips & config"],
    },
    {
      id: "2week", name: "2 Minggu", days: 14, price: 105000, old: 130000,
      features: ["Semua fitur kebuka", "Proses order prioritas", "Support prioritas"],
    },
    {
      id: "month", name: "1 Bulan", days: 30, price: 180000, old: 230000,
      badge: "Best Value", best: true,
      features: ["Semua fitur kebuka", "Garansi terbatas", "Support prioritas"],
    },
    {
      id: "2month", name: "2 Bulan", days: 60, price: 320000, old: 430000,
      features: ["Semua fitur kebuka", "Bonus 3 hari", "Support prioritas"],
    },
    {
      id: "3month", name: "3 Bulan", days: 90, price: 450000, old: 640000,
      features: ["Semua fitur kebuka", "Bonus 7 hari", "Support prioritas"],
    },
    {
      id: "life", name: "Lifetime", days: 0, price: 700000, old: 900000,
      badge: "Sekali Bayar",
      features: ["Semua fitur kebuka", "Update patch beli key baru", "Klaim panel dibantu admin"],
    },
  ],
  reseller: [
    {
      id: "rs5", name: "Starter", accounts: 5, price: 200000, old: 250000,
      note: "5 key · masa aktif 7 hari.",
      features: ["Harga per akun Rp40.000", "Stok key prioritas", "Support reseller"],
    },
    {
      id: "rs10", name: "Pro", accounts: 10, price: 350000, old: 450000,
      note: "10 key · masa aktif 14 hari.",
      features: ["Harga per akun Rp35.000", "Stok key prioritas", "Grup support reseller"],
    },
    {
      id: "rs25", name: "Sultan", accounts: 25, price: 750000, old: 1000000,
      badge: "Paling Laris", popular: true,
      note: "25 key · masa aktif 30 hari.",
      features: ["Harga per akun Rp30.000", "Stok prioritas + restock", "Grup support reseller"],
    },
    {
      id: "rs50", name: "Partner", accounts: 50, price: 1250000, old: 1800000,
      badge: "Margin Gede", best: true,
      note: "50 key · masa aktif 30 hari.",
      features: ["Harga per akun Rp25.000", "Stok unlimited bulanan", "Free rebrand injector"],
    },
  ],
};

/* ----------------------------- state ----------------------------- */
let activeFilter = "all";
let searchQuery = "";
let activeTier = "personal";
let selectedPlan = null;
let orderCode = "";

/* ----------------------------- render catalog ----------------------------- */
const catalogGrid = $("#catalogGrid");
const catalogEmpty = $("#catalogEmpty");

function featureCard(item) {
  const tierClass = item.tier.toLowerCase();
  return `
    <article class="feature">
      <div class="feature__top">
        <span class="feature__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${ICONS[item.icon]}</svg>
        </span>
        <span class="tier tier--${tierClass}">${item.tier}</span>
      </div>
      <h3>${item.name}</h3>
      <p>${item.desc}</p>
      <div class="feature__meta">
        <span>${item.cat}</span>
        <span>${item.games}</span>
      </div>
    </article>`;
}

function renderCatalog() {
  const q = searchQuery.trim().toLowerCase();
  const list = FEATURES.filter((f) => {
    const matchCat = activeFilter === "all" || f.catKey === activeFilter;
    const haystack = `${f.name} ${f.desc} ${f.cat} ${f.games}`.toLowerCase();
    return matchCat && (!q || haystack.includes(q));
  });

  catalogGrid.innerHTML = list.map(featureCard).join("");
  catalogEmpty.hidden = list.length > 0;
}

/* ----------------------------- render plans ----------------------------- */
const planGrid = $("#planGrid");

function planCard(plan, tier) {
  const isReseller = tier === "reseller";
  const perDay = !isReseller && plan.days > 0 ? Math.round(plan.price / plan.days) : null;
  const savings = !isReseller && plan.days > 0
    ? Math.max(0, Math.round((1 - plan.price / (plan.days * PLANS.personal[0].price)) * 100))
    : null;

  const badge = plan.badge ? `<span class="plan__badge">${plan.badge}</span>` : "";
  const priceBlock = `
      <div class="plan__price">
        <span class="rp">Rp</span>
        <span class="num">${rupiah(plan.price)}</span>
        ${plan.old ? `<span class="old">Rp${rupiah(plan.old)}</span>` : ""}
      </div>
      <span class="plan__admin">+ Rp500 biaya admin QRIS</span>`;

  const meta = isReseller
    ? `<div class="plan__meta"><span class="plan__perday">${plan.accounts} akun</span><span class="plan__save">Hemat ${Math.round((1 - plan.price / plan.old) * 100)}%</span></div>`
    : `<div class="plan__meta">
         <span class="plan__perday">${perDay ? `≈ Rp${rupiah(perDay)}/hari` : "Sekali bayar"}</span>
         ${savings > 0 ? `<span class="plan__save">Hemat ${savings}%</span>` : ""}
       </div>`;

  const list = plan.features.map((f) => `<li>${f}</li>`).join("");

  return `
    <article class="plan ${plan.popular ? "is-popular" : ""}">
      ${badge}
      <div class="plan__top">
        <h3>${plan.name}</h3>
        <span class="plan__days">${isReseller ? `${plan.accounts} key` : plan.days === 0 ? "∞" : `${plan.days} hari`}</span>
      </div>
      ${priceBlock}
      ${meta}
      ${plan.note ? `<p class="plan__note">${plan.note}</p>` : ""}
      <ul class="plan__list">${list}</ul>
      <button class="btn ${plan.popular ? "btn--gold" : "btn--outline"}" data-plan="${tier}:${plan.id}">
        Pilih paket
      </button>
    </article>`;
}

function renderPlans() {
  planGrid.innerHTML = PLANS[activeTier].map((p) => planCard(p, activeTier)).join("");
}

/* ----------------------------- checkout ----------------------------- */
const dialog = $("#checkout");
const toast = $("#toast");
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-on");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-on"), 3200);
}

function newOrderCode() {
  return `PSU-${Date.now().toString(36).slice(-5).toUpperCase()}${Math.floor(Math.random() * 90 + 10)}`;
}

const money = (n) => `Rp${rupiah(n)}`;
const orderTotal = (plan) => plan.price + ADMIN_FEE;

function fillSummary(plan, tier) {
  const isReseller = tier === "reseller";
  const total = orderTotal(plan);
  $("#sumPlan").textContent = `${plan.name}${isReseller ? ` · ${plan.accounts} akun` : ""}`;
  $("#sumDuration").textContent = isReseller
    ? `${plan.accounts} key reseller`
    : plan.days === 0 ? "Lifetime · tanpa batas" : `${plan.days} hari`;
  $("#sumBase").textContent = money(plan.price);
  $("#sumFee").textContent = money(ADMIN_FEE);
  $("#sumPrice").textContent = money(total);
  $("#qrisAmount").textContent = money(total);
  $("#copyAmount").dataset.amount = String(total);
  orderCode = newOrderCode();
  $("#orderCode").textContent = orderCode;
  const download = $("#downloadQris");
  if (download) download.setAttribute("download", `QRIS-PRABU-${orderCode}.jpg`);
}

function openCheckout(tier, planId) {
  const plan = PLANS[tier]?.find((p) => p.id === planId);
  if (!plan) return;
  selectedPlan = { plan, tier };
  fillSummary(plan, tier);
  dialog.showModal();
  document.body.style.overflow = "hidden";
  setTimeout(() => $("#fName").focus({ preventScroll: true }), 60);
}

function closeCheckout() {
  dialog.close();
}

function collectOrder() {
  const name = $("#fName").value.trim();
  const phoneInput = $("#fPhone").value.trim();
  const game = $("#fGame").value;
  const pay = $("#fPay").value;
  const note = $("#fNote").value.trim();

  if (name.length < 2) {
    showToast("Isi nama atau username dulu, chef.");
    $("#fName").focus();
    return null;
  }
  const phone = phoneInput.replace(/[^\d+]/g, "");
  if (phone.replace(/\D/g, "").length < 8) {
    showToast("Nomor WhatsApp belum valid.");
    $("#fPhone").focus();
    return null;
  }
  if (!selectedPlan) {
    showToast("Pilih paket dulu di daftar harga.");
    return null;
  }

  const { plan, tier } = selectedPlan;
  const lines = [
    `*ORDER ${STORE.name.toUpperCase()}*`,
    `Kode: ${orderCode}`,
    "",
    `Paket: ${plan.name}${tier === "reseller" ? ` (${plan.accounts} akun)` : ""}`,
    `Durasi: ${tier === "reseller" ? "reseller" : plan.days === 0 ? "lifetime" : `${plan.days} hari`}`,
    `Harga paket: ${money(plan.price)}`,
    `Biaya admin: ${money(ADMIN_FEE)}`,
    `TOTAL BAYAR: ${money(orderTotal(plan))}`,
    `Game: ${game}`,
    `Pembayaran: ${pay}`,
    "",
    `Nama: ${name}`,
    `WhatsApp: ${phoneInput}`,
    note ? `Catatan: ${note}` : "",
    "",
    `Saya sudah bayar QRIS ${money(orderTotal(plan))} dan kirim bukti di chat ini.`,
  ].filter(Boolean);

  return { text: lines.join("\n"), name, phone, plan, tier, game, pay, note };
}

function rememberOrder(order, extra = {}) {
  try {
    localStorage.setItem("psu_last_order", JSON.stringify({
      code: orderCode,
      name: order.name,
      phone: order.phone,
      plan: order.plan.name,
      price: order.plan.price,
      fee: ADMIN_FEE,
      total: orderTotal(order.plan),
      at: new Date().toISOString(),
      ...extra,
    }));
  } catch { /* localStorage penuh atau private mode, abaikan */ }
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    ta.remove();
    return ok;
  }
}

/* ----------------------------- init ----------------------------- */
function initLinks() {
  const wa = `https://wa.me/${STORE.whatsapp}`;
  const map = { whatsapp: wa, discord: STORE.discord, tiktok: STORE.tiktok };
  $$("[data-store-link]").forEach((el) => {
    const key = el.dataset.storeLink;
    if (map[key]) el.setAttribute("href", map[key]);
  });
  $$("[data-store-qr]").forEach((img) => {
    if (STORE.qris && img.getAttribute("src") !== STORE.qris) img.src = STORE.qris;
  });
  $$("[data-qris-download]").forEach((a) => {
    a.setAttribute("href", STORE.qris);
  });
}

function initHeader() {
  const header = $("#siteHeader");
  const burger = $("#burger");
  const nav = $("#primaryNav");

  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
    $("#toTop").classList.toggle("is-on", window.scrollY > 600);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  burger.addEventListener("click", () => {
    const open = burger.getAttribute("aria-expanded") !== "true";
    burger.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
    burger.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
  });

  $$(".nav__link").forEach((link) =>
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
    })
  );

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") nav.classList.remove("is-open");
  });

  $("#toTop").addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" })
  );
}

function initNavHighlight() {
  const sections = $$("section[id]");
  const links = $$(".nav__link");
  const map = new Map(links.map((l) => [l.getAttribute("href"), l]));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((l) => l.classList.remove("is-active"));
        const link = map.get(`#${entry.target.id}`);
        if (link) link.classList.add("is-active");
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );
  sections.forEach((s) => observer.observe(s));
}

function initReveal() {
  const items = $$(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-in"));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (!entry.isIntersecting) return;
        const delay = Math.min(i * 60, 240);
        setTimeout(() => entry.target.classList.add("is-in"), delay);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  items.forEach((el) => observer.observe(el));
}

function initCatalog() {
  renderCatalog();

  $$(".chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      activeFilter = chip.dataset.filter;
      $$(".chip").forEach((c) => {
        const on = c === chip;
        c.classList.toggle("is-active", on);
        c.setAttribute("aria-selected", String(on));
      });
      renderCatalog();
    });
  });

  $("#catalogSearch").addEventListener("input", (e) => {
    searchQuery = e.target.value;
    renderCatalog();
  });
}

function initPricing() {
  renderPlans();

  $$(".switch__btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      activeTier = btn.dataset.tier;
      $$(".switch__btn").forEach((b) => {
        const on = b === btn;
        b.classList.toggle("is-active", on);
        b.setAttribute("aria-selected", String(on));
      });
      renderPlans();
    });
  });

  planGrid.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-plan]");
    if (!btn) return;
    const [tier, planId] = btn.dataset.plan.split(":");
    openCheckout(tier, planId);
  });
}

function initCheckout() {
  $("#sendOrder").addEventListener("click", () => {
    const order = collectOrder();
    if (!order) return;

    const message = order.text;
    rememberOrder(order);

    const url = `https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener");
    bumpActiveUsers(orderCode);
    showToast("Order dibuka di WhatsApp. Kirim pesan + bukti bayar.");
  });

  $("#copyOrder").addEventListener("click", async () => {
    const order = collectOrder();
    if (!order) return;
    const ok = await copyText(order.text);
    showToast(ok ? "Detail order disalin. Tinggal paste ke admin." : "Gagal menyalin, coba manual.");
  });

  $("#copyAmount").addEventListener("click", async () => {
    const amount = $("#copyAmount").dataset.amount;
    if (!amount) return;
    const ok = await copyText(amount);
    showToast(ok ? `Nominal ${money(Number(amount))} disalin.` : "Gagal menyalin nominal.");
  });

  $("#downloadQris").addEventListener("click", () => {
    showToast("Foto QRIS diunduh. Buka m-banking / e-wallet, lalu scan.");
  });

  dialog.addEventListener("close", () => {
    document.body.style.overflow = "";
  });

  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) closeCheckout();
  });

  const last = localStorage.getItem("psu_last_order");
  if (last) {
    try {
      const data = JSON.parse(last);
      if (data.name) $("#fName").value = data.name;
      if (data.phone) $("#fPhone").value = data.phone;
    } catch { /* data rusak, abaikan */ }
  }
}

function initFaq() {
  const items = $$(".faq__item");
  items.forEach((item) => {
    item.addEventListener("toggle", () => {
      if (!item.open) return;
      items.forEach((other) => {
        if (other !== item) other.open = false;
      });
    });
  });
}

function initLiveCount() {
  renderActiveUsers();
}

/* ----------------------------- active users ----------------------------- */
const BASE_ACTIVE_USERS = 50;
const ACTIVE_USERS_KEY = "psu_active_users";
const COUNTED_ORDERS_KEY = "psu_counted_orders";

function readActiveUsers() {
  try {
    const n = Number(localStorage.getItem(ACTIVE_USERS_KEY));
    return Number.isFinite(n) && n >= BASE_ACTIVE_USERS ? n : BASE_ACTIVE_USERS;
  } catch {
    return BASE_ACTIVE_USERS;
  }
}

function renderActiveUsers() {
  const label = rupiah(readActiveUsers());
  $$("[data-active-users]").forEach((el) => {
    el.textContent = label;
  });
}

// Satu order = satu tambahan. Kode order disimpan supaya klik ulang nggak dobel.
function bumpActiveUsers(code) {
  if (!code) return;
  try {
    const counted = new Set(JSON.parse(localStorage.getItem(COUNTED_ORDERS_KEY) || "[]"));
    if (counted.has(code)) return;
    counted.add(code);
    localStorage.setItem(COUNTED_ORDERS_KEY, JSON.stringify([...counted].slice(-50)));
    localStorage.setItem(ACTIVE_USERS_KEY, String(readActiveUsers() + 1));
    renderActiveUsers();
  } catch { /* private mode: counter balik ke angka dasar */ }
}

function initMisc() {
  $("#year").textContent = new Date().getFullYear();
}

function initDeepLink() {
  const params = new URLSearchParams(window.location.search);
  const planId = params.get("paket");
  if (!planId) return;
  const tier = params.get("tipe") === "reseller" ? "reseller" : "personal";
  if (PLANS[tier].some((p) => p.id === planId)) openCheckout(tier, planId);
}

/* ----------------------------- boot ----------------------------- */
initLinks();
initHeader();
initNavHighlight();
initReveal();
initCatalog();
initPricing();
initCheckout();
initFaq();
initLiveCount();
initMisc();
initDeepLink();
