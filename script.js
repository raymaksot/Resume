/*
	script.js — modern, minimal Vanilla JS
	- Uses provided `projects` array
	- Renders project cards with image, FEATURED badge and Demo/Code buttons (inline SVG)
	- Mobile nav (hamburger) with outside-click, backdrop and Escape handling
	- Smooth scroll for internal anchors
*/

'use strict';

const projects = [
		{
				id: 1,
				title: 'Train Booking Demo (Java/Spring Boot)',
				description: 'Демо-проект API системы бронирования билетов на Java/Spring Boot.',
				github_url: 'https://github.com/raymaksot/trainbooking-demo',
				live_demo_url: null,
				is_featured: true,
				image_url: 'assets/images/trainbooking-preview.jpg'
		},
		{
				id: 2,
				title: 'Car Service Website',
				description: 'Одностраничный адаптивный сайт для автосервиса (HTML, CSS, JS).',
				github_url: 'https://github.com/raymaksot/CarService_website',
				live_demo_url: 'https://raymaksot.github.io/CarService_website/',
				is_featured: false,
				image_url: 'assets/images/car-service-preview.jpg'
		},
		{
				id: 3,
				title: 'Restaurant Website',
				description: 'Современный, адаптивный сайт-меню для ресторана (HTML, CSS, JS).',
				github_url: 'https://github.com/raymaksot/restoran-website',
				live_demo_url: 'https://raymaksot.github.io/restoran-website/',
				is_featured: false,
				image_url: 'assets/images/restaurant-preview.jpg'
		}
];

const qs = (s, ctx = document) => ctx.querySelector(s);
const qsa = (s, ctx = document) => Array.from(ctx.querySelectorAll(s));

function escapeHtml(str = '') {
		return String(str)
				.replace(/&/g, '&amp;')
				.replace(/</g, '&lt;')
				.replace(/>/g, '&gt;')
				.replace(/"/g, '&quot;')
				.replace(/'/g, '&#039;');
}

function projectCardTemplate(p) {
		const title = escapeHtml(p.title);
		const desc = escapeHtml(p.description);
		const img = p.image_url
				? `<img loading="lazy" src="${escapeHtml(p.image_url)}" alt="Preview of ${title}" class="aspect-video w-full rounded-lg object-cover" />`
				: `<div class="aspect-video w-full rounded-lg bg-white/5 flex items-center justify-center text-sm text-white/60">No preview</div>`;

		const featuredBadge = p.is_featured
				? `<span class="rounded-full bg-primary/80 px-3 py-1 text-xs font-bold text-background-dark">FEATURED</span>`
				: '';

		// Inline SVG icons (Tailwind-friendly classes)
		const svgCode = `
		<svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
			<path d="M12 .5C5.648.5.5 5.648.5 12c0 5.084 3.292 9.393 7.865 10.91.575.106.785-.25.785-.556 0-.275-.01-1.003-.015-1.97-3.2.695-3.877-1.54-3.877-1.54-.523-1.331-1.278-1.687-1.278-1.687-1.045-.714.08-.7.08-.7 1.156.082 1.765 1.188 1.765 1.188 1.027 1.757 2.695 1.25 3.352.956.104-.744.401-1.25.729-1.537-2.554-.29-5.243-1.277-5.243-5.683 0-1.256.45-2.283 1.187-3.088-.12-.29-.514-1.46.113-3.044 0 0 .967-.31 3.17 1.18A11.03 11.03 0 0112 6.844c.98.004 1.967.133 2.888.39 2.2-1.497 3.164-1.18 3.164-1.18.632 1.586.238 2.756.117 3.045.74.806 1.186 1.832 1.186 3.088 0 4.42-2.695 5.388-5.263 5.674.413.355.78 1.056.78 2.128 0 1.536-.014 2.775-.014 3.152 0 .31.206.668.792.554C20.71 21.39 24 17.08 24 12c0-6.352-5.148-11.5-11.5-11.5z"/>
		</svg>`;

		const svgExternal = `
		<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
			<path d="M14 3h7v7" />
			<path d="M21 3L10 14" />
			<path d="M21 14v7H3v-18h7" />
		</svg>`;

		const demoButton = p.live_demo_url
				? `<a class="inline-flex items-center gap-2 rounded bg-primary/80 px-3 py-2 text-sm font-medium text-background-dark hover:opacity-95" href="${escapeHtml(p.live_demo_url)}" target="_blank" rel="noopener noreferrer" aria-label="Open live demo of ${title}">${svgExternal}<span>Demo</span></a>`
				: '';

		const codeButton = p.github_url
				? `<a class="inline-flex items-center gap-2 rounded bg-white/5 px-3 py-2 text-sm font-medium text-white/90 hover:bg-white/10" href="${escapeHtml(p.github_url)}" target="_blank" rel="noopener noreferrer" aria-label="Open source code for ${title}">${svgCode}<span>Code</span></a>`
				: '';

			return `
				<article class="project-card flex flex-col gap-4 rounded-xl border border-white/10 bg-white/5 p-6">
				${img}
				<div class="flex items-start justify-between gap-4">
					<div class="min-w-0">
						<h3 class="text-xl font-bold text-white truncate">${title}</h3>
						<p class="text-white/80 text-sm mt-2">${desc}</p>
					</div>
					<div class="flex-shrink-0">${featuredBadge}</div>
				</div>
				<div class="mt-auto flex items-center justify-between pt-4">
					<div class="flex flex-wrap gap-2">
						<!-- Placeholder for tags if needed -->
					</div>
					<div class="flex items-center gap-3">
						${demoButton}
						${codeButton}
					</div>
				</div>
			</article>
		`;
}

function renderProjects() {
		const container = qs('#js-projects');
		if (!container) return;
		// Clear and render
		container.innerHTML = projects.map(projectCardTemplate).join('\n');
}

function initMobileNav() {
	const hamburger = qs('.js-hamburger');
	const mobileNav = qs('#js-mobile-nav');
	if (!hamburger || !mobileNav) return;

	const backdrop = qs('[data-js="backdrop"]', mobileNav);
	const focusableSelector = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';
	let focusables = [];
	let firstFocusable = null;
	let lastFocusable = null;
	let prevAriaHidden = new Map();

	const getFocusable = (ctx) => qsa(focusableSelector, ctx).filter(el => !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length));

	const setIsolation = (enable) => {
		// Target common main content containers instead of all body children
		const selectors = 'main, header, footer, aside, [role="main"], [role="banner"], [role="contentinfo"], [role="complementary"]';
		const nodes = Array.from(document.querySelectorAll(selectors));
		nodes.forEach(el => {
			// don't hide the mobile nav itself if it matches
			if (el === mobileNav || mobileNav.contains(el)) return;
			if (enable) {
				prevAriaHidden.set(el, el.getAttribute('aria-hidden'));
				el.setAttribute('aria-hidden', 'true');
			} else {
				const prev = prevAriaHidden.get(el);
				if (prev === null || typeof prev === 'undefined') {
					el.removeAttribute('aria-hidden');
				} else {
					el.setAttribute('aria-hidden', prev);
				}
			}
		});
		if (!enable) prevAriaHidden.clear();
	};

	const trapKeydown = (e) => {
		if (e.key === 'Escape') {
			e.preventDefault();
			close();
			return;
		}
		if (e.key !== 'Tab') return;
		if (!focusables.length) {
			e.preventDefault();
			return;
		}
		const active = document.activeElement;
		if (e.shiftKey) {
			if (active === firstFocusable || active === mobileNav) {
				e.preventDefault();
				lastFocusable.focus();
			}
		} else {
			if (active === lastFocusable) {
				e.preventDefault();
				firstFocusable.focus();
			}
		}
	};

	const onDocumentClick = (e) => {
		if (mobileNav.classList.contains('hidden')) return;
		const inside = e.target.closest('#js-mobile-nav');
		const toggle = e.target.closest('.js-hamburger');
		if (!inside && !toggle) close();
	};

	const onScrollClose = () => {
		if (!mobileNav.classList.contains('hidden')) close();
	};

	const open = () => {
	mobileNav.classList.remove('hidden');
	hamburger.setAttribute('aria-expanded', 'true');
	hamburger.setAttribute('aria-label', 'Close menu');
	setIsolation(true);
	// set dialog semantics and label association
	mobileNav.setAttribute('role', 'dialog');
	mobileNav.setAttribute('aria-modal', 'true');
	const labelEl = qs('#js-mobile-nav-label');
	if (labelEl) mobileNav.setAttribute('aria-labelledby', 'js-mobile-nav-label');
		focusables = getFocusable(mobileNav);
		firstFocusable = focusables[0] || mobileNav;
		lastFocusable = focusables[focusables.length - 1] || mobileNav;
		if (!mobileNav.hasAttribute('tabindex')) mobileNav.setAttribute('tabindex', '-1');
			// add dialog semantics for assistive tech
			mobileNav.setAttribute('role', 'dialog');
			mobileNav.setAttribute('aria-modal', 'true');
			setTimeout(() => { (firstFocusable || mobileNav).focus(); }, 50);
		document.addEventListener('keydown', trapKeydown);
		document.addEventListener('click', onDocumentClick, { capture: true });
		window.addEventListener('scroll', onScrollClose, { passive: true });
	};

	const close = () => {
		mobileNav.classList.add('hidden');
		hamburger.setAttribute('aria-expanded', 'false');
		hamburger.setAttribute('aria-label', 'Open menu');
		// remove dialog semantics and labelledby
		mobileNav.removeAttribute('role');
		mobileNav.removeAttribute('aria-modal');
		mobileNav.removeAttribute('aria-labelledby');
		setIsolation(false);
		document.removeEventListener('keydown', trapKeydown);
		document.removeEventListener('click', onDocumentClick, { capture: true });
		window.removeEventListener('scroll', onScrollClose, { passive: true });
		setTimeout(() => hamburger.focus(), 0);
	};

	if (!hamburger.hasAttribute('aria-expanded')) hamburger.setAttribute('aria-expanded', 'false');
	if (!hamburger.hasAttribute('aria-label')) hamburger.setAttribute('aria-label', 'Open menu');

	hamburger.addEventListener('click', (e) => {
		const expanded = hamburger.getAttribute('aria-expanded') === 'true';
		expanded ? close() : open();
	});

	backdrop?.addEventListener('click', () => close());

	qsa('.js-nav-link', mobileNav).forEach(a => a.addEventListener('click', (e) => { close(); }));
}

function initSmoothScroll() {
		document.addEventListener('click', (e) => {
				const a = e.target.closest('a[href^="#"]');
				if (!a) return;
				const href = a.getAttribute('href');
				if (!href) return;
				// Allow modifiers (ctrl/cmd) to open new tab
				if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
				e.preventDefault();

				if (href === '#') {
						window.scrollTo({ top: 0, behavior: 'smooth' });
				} else {
						const target = document.querySelector(href);
						if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
				}

				// Ensure mobile nav is closed after navigation
				const mobileNav = qs('#js-mobile-nav');
				if (mobileNav && !mobileNav.classList.contains('hidden')) {
						mobileNav.classList.add('hidden');
						qs('.js-hamburger')?.setAttribute('aria-expanded', 'false');
				}
		});
}

function initFocusVisible() {
	// Simple focus-visible polyfill: add .focus-visible-outline when focus was via keyboard
	let hadKeyboardEvent = false;
	const focusableSelector = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

	const onKeyDown = (e) => {
		// consider Tab and arrow keys as keyboard navigation
		const k = e.key;
		if (k === 'Tab' || k === 'ArrowUp' || k === 'ArrowDown' || k === 'ArrowLeft' || k === 'ArrowRight') {
			hadKeyboardEvent = true;
		}
	};
	const onPointerDown = () => { hadKeyboardEvent = false; };

	const onFocusIn = (e) => {
		const el = e.target;
		if (!(el instanceof Element)) return;
		if (!el.matches(focusableSelector)) return;
		// Only apply for elements inside mobile nav or project cards
		if (!(el.closest('#js-mobile-nav') || el.closest('.project-card'))) return;
		if (hadKeyboardEvent) el.classList.add('focus-visible-outline');
	};

	const onFocusOut = (e) => {
		const el = e.target;
		if (el instanceof Element) el.classList.remove('focus-visible-outline');
	};

	document.addEventListener('keydown', onKeyDown, true);
	document.addEventListener('mousedown', onPointerDown, true);
	document.addEventListener('touchstart', onPointerDown, true);
	document.addEventListener('focusin', onFocusIn, true);
	document.addEventListener('focusout', onFocusOut, true);
}

function init() {
		renderProjects();
		initMobileNav();
		initSmoothScroll();
	initFocusVisible();
}

document.addEventListener('DOMContentLoaded', init);
