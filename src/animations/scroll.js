import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * q = selector function from gsap.context: const q = self.selector;
 * so q(".class") returns elements scoped to that component root.
 */
export function revealSection(q, { trigger, heading, items, itemStagger = 0.12 }) {
  const headingEls = heading ? q(heading) : null;

  // items can be string or array of strings
  const itemEls = !items
    ? null
    : Array.isArray(items)
    ? items.flatMap((sel) => q(sel))
    : q(items);

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger,
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  });

  if (headingEls && headingEls.length) {
    tl.from(headingEls, { opacity: 0, y: 18, duration: 0.7, ease: "power2.out" });
  }

  if (itemEls && itemEls.length) {
    tl.from(
      itemEls,
      { opacity: 0, y: 16, duration: 0.55, ease: "power2.out", stagger: itemStagger },
      "-=0.35"
    );
  }

  return tl;
}

export function revealEach(q, options = {}) {
  const {
    elements,              // selector OR array of selectors
    start = "top 85%",     // when element starts entering
    y = 16,
    duration = 0.6,
    once = true,
  } = options;

  const els = Array.isArray(elements)
    ? elements.flatMap((sel) => q(sel))
    : q(elements);

  els.forEach((el) => {
    gsap.from(el, {
      opacity: 0,
      y,
      duration,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,       // ✅ each element triggers itself
        start,
        toggleActions: once ? "play none none none" : "play none none reverse",
      },
    });
  });
}