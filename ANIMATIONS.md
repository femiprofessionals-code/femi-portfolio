# 🎬 ANIMATION SYSTEM - AUSTIN KNIGHT STYLE

Complete guide to all animations and interactive effects.

---

## 🌟 ANIMATIONS INCLUDED

### **1. HERO SECTION**
**Title Animation:**
- Each line fades in and slides up
- Staggered by 150ms per line
- Creates dramatic entrance effect
- Triggers on page load

**Carousel:**
- Auto-rotates every 4 seconds
- Smooth crossfade between images
- 3 images cycle infinitely
- Pause on hover (optional)

**Subtext:**
- Fades in after title completes
- Delays 1.5s for dramatic effect

---

### **2. SCROLL ANIMATIONS**
All sections animate into view as you scroll down.

**Company Cards:**
- Fade in + slide up on scroll
- Parallax effect on images
- Hover: Lift up 8px
- Smooth transitions

**Project Links:**
- Stagger animation (200ms delay each)
- Fade + slide from left
- Hover: Opacity 0.6

**Travel Images:**
- Grid animates in sequence
- Scale from 0.9 to 1
- Hover: Lift + scale to 1.1
- Box shadow on hover

**Logo Grid:**
- Stagger fade-in
- 100ms delay between each
- ScrollTrigger at 80% viewport

---

### **3. INTERACTIVE EFFECTS**

**Magnetic Buttons:**
- Follow cursor within bounds
- Elastic snap back on leave
- Applies to all .magnetic-button
- Smooth GSAP animations

**Card Hover:**
- Subtle lift (-8px)
- Shadow increases
- Image scales 1.05
- Transition 300ms

**Link Press:**
- Scale to 0.98 on click
- Returns to normal on release
- Feels responsive

---

### **4. SMOOTH SCROLL**
**Lenis Integration:**
- Buttery smooth scrolling
- 1.2s duration
- Easing: Custom exponential
- Works on all devices

---

## 🎨 ANIMATION CLASSES

### **Add to Elements:**

```html
<!-- Hero title lines -->
<span className="hero-title-line">Text</span>

<!-- Company cards -->
<div className="company-card hover-card">...</div>

<!-- Project links -->
<a className="project-link">...</a>

<!-- Travel images -->
<div className="travel-image hover-card">...</div>

<!-- Magnetic buttons -->
<button className="magnetic-button">Click</button>

<!-- Logo items -->
<div className="logo-item">Logo</div>
```

---

## ⚙️ GSAP CONFIGURATION

### **ScrollTrigger Settings:**
```javascript
ScrollTrigger: {
  trigger: element,
  start: 'top 80%',     // Trigger when element is 80% down viewport
  end: 'top 50%',       // End when 50% down
  scrub: 1,             // Smooth scrubbing (1 = 1 second lag)
}
```

### **Parallax Effect:**
```javascript
gsap.fromTo(
  '.card-image',
  { y: -50 },            // Start 50px above
  {
    y: 50,               // End 50px below
    scrollTrigger: {
      trigger: card,
      scrub: 1.5,        // Slower = more dramatic
    },
  }
);
```

---

## 🚀 PERFORMANCE

### **Optimizations Applied:**

✅ **will-change**: Added to animated elements  
✅ **transform**: Used instead of position  
✅ **requestAnimationFrame**: Smooth 60fps  
✅ **Lazy loading**: Images load on scroll  
✅ **GPU acceleration**: 3D transforms  
✅ **Debouncing**: Scroll events optimized  

### **Performance Tips:**

- Keep animations under 300ms
- Use transform/opacity only
- Avoid animating width/height
- Use will-change sparingly
- Test on mobile devices

---

## 🎯 CUSTOMIZATION

### **Change Animation Speed:**

In `app/animations.ts`:

```typescript
// Hero title speed
duration: 1.2,  // Change to 0.8 for faster
stagger: 0.15,  // Change to 0.1 for quicker succession

// Carousel rotation
interval = 4000  // Change to 3000 for faster rotation
```

### **Change Parallax Intensity:**

```typescript
// More dramatic: -100 to 100
{ y: -100 }, { y: 100 }

// Subtle: -20 to 20
{ y: -20 }, { y: 20 }
```

### **Disable Animations:**

Comment out in `app/page.tsx`:

```typescript
// useScrollAnimations();  // Disable scroll animations
// useSmoothScroll();      // Disable smooth scroll
// useCarousel();          // Disable carousel
```

---

## 📱 MOBILE BEHAVIOR

### **Reduced Animations:**

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### **Touch Interactions:**

- No hover effects on touch
- Tap animations work
- Smooth scroll on mobile
- Optimized for 60fps

---

## 🎬 ANIMATION TIMELINE

### **Page Load Sequence:**

```
0.0s  → Page loads
0.3s  → Hero title line 1 appears
0.45s → Hero title line 2 appears
0.6s  → Hero title line 3 appears
0.75s → Hero title line 4 appears
0.9s  → Hero title line 5 appears
1.5s  → Hero subtext fades in
0.5s  → Carousel fades in

On Scroll:
- Logos animate when 80% visible
- Cards animate as they enter
- Travel images stagger in
```

---

## 🔧 TROUBLESHOOTING

### **Animations Not Working:**

1. Check browser console for errors
2. Verify GSAP and Lenis installed:
   ```bash
   npm install gsap lenis
   ```
3. Ensure 'use client' at top of page
4. Clear browser cache

### **Choppy Animations:**

1. Check CPU usage (too many animations?)
2. Reduce parallax intensity
3. Disable smooth scroll on low-end devices
4. Use will-change sparingly

### **Carousel Not Rotating:**

1. Verify slides have class "carousel-slide"
2. Check useCarousel hook is called
3. Ensure slides are absolutely positioned
4. Check browser console for errors

---

## 🎨 AUSTIN KNIGHT ANIMATIONS

### **What Makes It Austin Knight:**

✅ **Subtle, not flashy** - Refined movements  
✅ **Parallax scrolling** - Depth and dimension  
✅ **Stagger sequences** - Elegant reveals  
✅ **Smooth transitions** - 300-500ms sweet spot  
✅ **Magnetic buttons** - Playful interaction  
✅ **Image scaling** - Subtle zoom on hover  
✅ **Minimal easing** - Power curves, not bounce  

### **NOT Austin Knight:**

❌ Bouncy animations  
❌ Spinning elements  
❌ Flashy colors  
❌ Pop-in effects  
❌ Excessive motion  

---

## 📊 ANIMATION METRICS

**Recommended Values:**

| Element | Duration | Delay | Easing |
|---------|----------|-------|--------|
| Fade In | 0.8s | 0-0.3s | power2.out |
| Slide Up | 1.0s | 0-0.5s | power3.out |
| Hover | 0.3s | 0s | power2.out |
| Button | 0.3s | 0s | ease |
| Parallax | Scrub 1.5 | 0s | linear |
| Carousel | 1.0s | 4s | power2.inOut |

---

## 🚀 NEXT LEVEL

### **Advanced Additions:**

1. **Cursor follower** - Custom cursor
2. **Loading animation** - Smooth page entrance
3. **Page transitions** - Between routes
4. **Scroll progress** - Visual indicator
5. **Video backgrounds** - Instead of images
6. **3D tilt cards** - Mouse-reactive
7. **Text scramble** - On hover

All can be added to `animations.ts`

---

**YOUR SITE NOW HAS AUSTIN KNIGHT-LEVEL ANIMATIONS.** 🎬

Test with:
```bash
npm run dev
```

Watch it come alive! ✨
