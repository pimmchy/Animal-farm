/* ==========================================================================
   Helper Utilities
   ========================================================================== */
const $ = (selector) => document.querySelector(selector); const $$ = (selector) => document.querySelectorAll(selector);

/* ==========================================================================
   1. HERO INTERACTIVE: Scroll-Driven Trigger (ขีดฆ่า & เปิดหนังสือค้างให้อ่าน)
   ========================================================================== */
const strikeLine = document.getElementById("strikeLine");
const typewriterElem = document.getElementById("typewriterText");
const typewriterCursor = document.getElementById("typewriterCursor");
const headlineGroup = document.getElementById("headlineGroup");
const book3d = document.getElementById("book3d");
const frontCover = document.getElementById("frontCover");
const heroSection = document.getElementById("heroInteractive");
const scrollInstruction = document.getElementById("scrollInstruction");
const spotlightCone = document.getElementById("spotlightCone");

const tyrannySentence = "...BUT SOME ARE MORE EQUAL THAN OTHERS.";
let typewriterIndex = 0;
let isTypingStarted = false;

// ฟังก์ชันเริ่มพิมพ์ดีดข้อความต่อท้าย
function runTypewriter() {
    if (typewriterCursor) typewriterCursor.style.display = "inline-block";
    function typeLetter() {
        if (typewriterIndex < tyrannySentence.length) {
            if (typewriterElem) {
                typewriterElem.textContent += tyrannySentence.charAt(typewriterIndex);
            }
            typewriterIndex++;
            setTimeout(typeLetter, 38);
        }
    }
    typeLetter();
}

window.addEventListener("scroll", () => {
    if (!heroSection) return;

    const scrollY = window.scrollY;
    const heroTop = heroSection.offsetTop;
    const heroHeight = heroSection.offsetHeight - window.innerHeight;

    const progress = Math.min(1, Math.max(0, (scrollY - heroTop) / heroHeight));

    /* ช่วงที่ 1: Scroll มาถึง 8% -> ขีดฆ่าคำว่า EQUAL & เริ่มพิมพ์ดีด */
    if (progress > 0.08) {
        if (!isTypingStarted) {
            isTypingStarted = true;
            if (strikeLine) strikeLine.classList.add("is-struck");
            setTimeout(runTypewriter, 250);
        }
    }

    /* ช่วงที่ 2: ระหว่าง 10% - 40% -> Headline ค่อยๆ แยกตัวและจางลง */
    if (headlineGroup) {
        if (progress <= 0.4) {
            const p = progress / 0.4;
            headlineGroup.style.transform = `scale(${1 - p * 0.12}) translateY(${-p * 60}px)`;
            headlineGroup.style.opacity = Math.max(0, 1 - p * 1.3);
            if (scrollInstruction) scrollInstruction.style.opacity = Math.max(0, 1 - p * 2);
        } else {
            headlineGroup.style.opacity = 0;
            if (scrollInstruction) scrollInstruction.style.opacity = 0;
        }
    }

    /* ช่วงที่ 3: หนังสือ 3D กางออกและตรึงค้างให้อ่าน Chapter I อย่างชัดเจน */
    if (book3d && frontCover) {
        const openProgress = Math.min(1, Math.max(0, (progress - 0.2) / 0.3));
        const coverAngle = openProgress * 145;
        frontCover.style.transform = `rotateY(-${coverAngle}deg)`;

        const alignProgress = Math.min(1, Math.max(0, (progress - 0.15) / 0.35));
        const rotY = -18 + alignProgress * 18;
        const rotX = 8 - alignProgress * 8;
        const translateZ = alignProgress * 120;

        book3d.style.transform = `rotateY(${rotY}deg) rotateX(${rotX}deg) translateZ(${translateZ}px)`;

        if (spotlightCone) {
            spotlightCone.style.opacity = 0.5 + openProgress * 0.5;
        }
    }
}, { passive: true });



/* ==========================================================================
   3. ข้อมูลตัวละครสำคัญ & ระบบ Spotlight Panel (.jpeg ตามที่ระบุ)
   ========================================================================== */
const characters = [
    {
        name: "Napoleon",
        file: "napoleon.jpeg",
        symbol: "โจเซฟ สตาลิน",
        role: "หมูผู้นำเผด็จการเบ็ดเสร็จ",
        desc: "ใช้ฝูงสุนัขล่าเนื้อและความกลัวเข้าควบคุมฟาร์ม ลิดรอนเสรีภาพ และบิดเบือนกฎหมายเพื่ออภิสิทธิ์ของพวกพ้อง"
    },
    {
        name: "Snowball",
        file: "snowball.jpeg",
        symbol: "เลออน ทรอตสกี",
        role: "หมูนักคิดและมันสมองปฏิวัติ",
        desc: "วางแผนสร้างกังหันลมและมุ่งยกระดับคุณภาพชีวิต แต่พ่ายแพ้การชิงอำนาจและถูกป้ายสีให้เป็นแพะรับบาปตลอดกาล"
    },
    {
        name: "Boxer",
        file: "boxer.jpeg",
        symbol: "ชนชั้นแรงงานผู้ซื่อสัตย์",
        role: "ม้างานผู้ทุ่มเทแรงกาย",
        desc: "ยึดคติ 'ข้าจะทำงานหนักขึ้น' และเชื่อผู้นำอย่างไม่ลืมหูลืมตา แต่เมื่อหมดแรงกลับถูกส่งขายโรงเชือดอย่างเลือดเย็น"
    },
    {
        name: "Squealer",
        file: "squealer.jpeg",
        symbol: "สื่อโฆษณาชวนเชื่อ",
        role: "หมูโฆษกผู้บิดเบือนความจริง",
        desc: "ใช้วาทศิลป์ ตัวเลขลวง และการเปลี่ยนนิยามถ้อยคำ เพื่อทำให้การตัดสินใจอันอยุติธรรมของผู้นำดูถูกต้องชอบธรรมเสมอ"
    },
    {
        name: "Old Major",
        file: "old-major.jpeg",
        symbol: "คาร์ล มาร์กซ์ & เลนิน",
        role: "หมูชราผู้จุดประกายอุดมคติ",
        desc: "ผู้วางรากฐานและปลุกระดมให้สัตว์ทั้งมวลตระหนักถึงสิทธิ แต่ด่วนจากไปก่อนจะได้เห็นความบิดเบี้ยวของการปฏิวัติ"
    },
    {
        name: "Benjamin",
        file: "benjamin.jpg",
        symbol: "ปัญญาชนผู้วางเฉย",
        role: "ลาชราผู้รู้ทันทุกสิ่ง",
        desc: "มองเห็นเล่ห์กลและความเสื่อมทรามของอำนาจตั้งแต่ต้น แต่เลือกที่จะไม่ลุกขึ้นมาสู้หรือเตือนเพื่อนสัตว์ด้วยกัน"
    }
];

const avatarStrip = $("#avatarStrip");
avatarStrip.innerHTML = characters.map((c, i) => `
  <button class="avatar-btn ${i === 0 ? 'is-active' : ''}" data-index="${i}" type="button" aria-label="${c.name}">
    <div class="avatar-ring">
      <img src="images/${c.file}" alt="${c.name}" onerror="if(!this.dataset.tried){this.dataset.tried='true'; this.src=this.src.endsWith('.jpeg')?this.src.replace('.jpeg','.jpg'):this.src.replace('.jpg','.jpeg');}else{this.style.display='none';}">
    </div>
    <span class="avatar-label">${c.name}</span>
  </button>
`).join("");

const spotlightPanel = $("#spotlightPanel");
const spotlightImg = $("#spotlightImg");
const spotlightAllegory = $("#spotlightAllegory");
const spotlightRole = $("#spotlightRole");
const spotlightName = $("#spotlightName");
const spotlightDesc = $("#spotlightDesc");

function updateSpotlight(index) {
    const c = characters[index];
    if (!c) return;

    spotlightPanel.classList.add("is-switching");

    setTimeout(() => {
        spotlightImg.src = `images/${c.file}`;
        spotlightImg.alt = c.name;
        spotlightImg.onerror = function () {
            if (!this.dataset.tried) {
                this.dataset.tried = "true";
                this.src = this.src.endsWith('.jpeg') ? this.src.replace('.jpeg', '.jpg') : this.src.replace('.jpg', '.jpeg');
            }
        };
        spotlightAllegory.textContent = `สะท้อนถึง: ${c.symbol}`;
        spotlightRole.textContent = c.role;
        spotlightName.textContent = c.name;
        spotlightDesc.textContent = c.desc;

        spotlightPanel.classList.remove("is-switching");
    }, 140);
}

updateSpotlight(0);

const avatarButtons = $$(".avatar-btn");
avatarButtons.forEach(btn => {
    const handleSelect = () => {
        const idx = parseInt(btn.dataset.index, 10);
        avatarButtons.forEach(b => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        updateSpotlight(idx);
    };

    btn.addEventListener("mouseenter", handleSelect);
    btn.addEventListener("click", handleSelect);
});

/* ==========================================================================
   4. รองรับการแตะคลี่ข้อมูล 5 กลยุทธ์ (สำหรับหน้าจอมือถือ & จอสัมผัส)
   ========================================================================== */
const stageBlocks = $$(".stage-block"); stageBlocks.forEach(block => { block.addEventListener("click", () => { const isAlreadyOpen = block.classList.contains("is-expanded"); stageBlocks.forEach(b => b.classList.remove("is-expanded")); if (!isAlreadyOpen) { block.classList.add("is-expanded"); } }); });  /* ==========================================================================    5. Interactive Reflection Card    ========================================================================== */ const charFeedbacks = { Boxer: "💔 ม้าบ็อกเซอร์: คุณคือเสาหลักที่ทุ่มเททำงานหนักที่สุดเพื่อส่วนรวม แต่โปรดระวังว่าความซื่อสัตย์ที่ไร้การตั้งคำถาม อาจถูกผู้นำฉวยใช้เป็นเครื่องมือ", Benjamin: "👁️ ลาเบนจามิน: คุณเป็นคนฉลาดที่มองเห็นความจริงและไม่หลงเชื่อคำโกหก แต่การนิ่งเฉยไม่ลงมือทำอะไร อาจทำให้ความชั่วร้ายลุกลามจนสายเกินแก้", Snowball: "💡 สโนว์บอล: คุณเปี่ยมด้วยวิสัยทัศน์และความคิดก้าวหน้า แต่อุดมคติที่ไร้การเตรียมพร้อมรับมือกับเล่ห์เหลี่ยมทางการเมือง อาจทำให้คุณพ่ายแพ้ต่อกำลังความรุนแรง", Napoleon: "👑 นโปเลียน: คุณเข้าใจจิตวิทยามนุษย์และการควบคุมคนได้อย่างเฉียบขาด แต่ระวังว่าอำนาจเบ็ดเสร็จจะกัดกร่อนให้คุณกลายเป็นสิ่งที่คุณเคยเกลียดที่สุด" }; const choiceTags = $$(".choice-tag");
const feedbackBox = $("#feedbackBox");

choiceTags.forEach(tag => {
    tag.addEventListener("click", () => {
        choiceTags.forEach(t => t.classList.remove("active"));
        tag.classList.add("active");
    });
});

/* ==========================================================================
   6. Scroll Progress & Reveal Animations
   ========================================================================== */
const prog = $("#prog");

window.addEventListener("scroll", () => {
    const y = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    prog.style.transform = `scaleX(${docHeight > 0 ? y / docHeight : 0})`;
}, { passive: true });

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("in");
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.08 });

$$(".rv").forEach(el => revealObserver.observe(el));

/* ==========================================================================
   7. ควบคุมการทำงานของ Mobile Drawer Menu
   ========================================================================== */
const menuBtn = $("#menuBtn");
const menu = $("#menu"); function toggleMenu() { const isOpen = menu.classList.toggle("open"); menuBtn.classList.toggle("open", isOpen); menuBtn.setAttribute("aria-expanded", isOpen); } menuBtn.addEventListener("click", toggleMenu); $$("#menu a").forEach(link => {
    link.addEventListener("click", () => {
        menu.classList.remove("open");
        menuBtn.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
    });
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 900 && menu.classList.contains("open")) {
        menu.classList.remove("open");
        menuBtn.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
    }
});

/* ==========================================================================
   8. ควบคุมการทำงานของ Modal ที่มาของภาพประกอบ (Image Credits Popup)
   ========================================================================== */
const creditsModal = document.getElementById("creditsModal");
const openCreditsBtn = document.getElementById("openCreditsBtn");
const closeCreditsBtn = document.getElementById("closeCreditsBtn");
const modalOkBtn = document.getElementById("modalOkBtn");

function openModal() {
    if (creditsModal) {
        creditsModal.style.display = "flex";
        document.body.style.overflow = "hidden"; // ล็อกไม่ให้เลื่อนหน้าจอข้างหลัง
    }
}

function closeModal() {
    if (creditsModal) {
        creditsModal.style.display = "none";
        document.body.style.overflow = ""; // คืนค่าการเลื่อนหน้าจอปกติ
    }
}

if (openCreditsBtn) openCreditsBtn.addEventListener("click", openModal);
if (closeCreditsBtn) closeCreditsBtn.addEventListener("click", closeModal);
if (modalOkBtn) modalOkBtn.addEventListener("click", closeModal);

// ปิดเมื่อคลิกที่พื้นหลังสีดำภายนอกการ์ด
if (creditsModal) {
    creditsModal.addEventListener("click", (e) => {
        if (e.target === creditsModal) closeModal();
    });
}

// ปิดเมื่อกดปุ่ม Escape (Esc) บนแป้นพิมพ์
window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && creditsModal && creditsModal.style.display === "flex") {
        closeModal();
    }
});