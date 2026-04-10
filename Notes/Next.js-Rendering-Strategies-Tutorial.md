# Next.js Rendering Strategies: CSR vs SSR vs SSG vs ISR vs PPR

A Comprehensive Guide to Next.js 15/16 App Router Rendering

---

## Introduction

Next.js offers five powerful rendering strategies, each designed for different use cases. Understanding when to use each approach is crucial for building performant, SEO-friendly applications. This guide covers everything you need to know about Client-Side Rendering (CSR), Server-Side Rendering (SSR), Static Site Generation (SSG), Incremental Static Regeneration (ISR), and the newest addition: Partial Prerendering (PPR).

---

## Table of Contents

1. [Rendering Architecture Overview](#rendering-architecture-overview)
2. [Client-Side Rendering (CSR)](#1-client-side-rendering-csr)
3. [Server-Side Rendering (SSR)](#2-server-side-rendering-ssr)
4. [Static Site Generation (SSG)](#3-static-site-generation-ssg)
5. [Incremental Static Regeneration (ISR)](#4-incremental-static-regeneration-isr)
6. [Partial Prerendering (PPR)](#5-partial-prerendering-ppr)
7. [Performance Comparison](#performance-comparison)
8. [Decision Flowchart](#decision-flowchart)
9. [Real-World Use Cases](#real-world-use-cases)
10. [Conclusion](#conclusion)

---

## Rendering Architecture Overview

Before diving into each strategy, let's understand the rendering landscape:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        NEXT.JS RENDERING SPECTRUM                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  STATIC                                    DYNAMIC                         │
│                                                                             │
│  SSG ──────────────> ISR ──────────────> PPR ──────────────> SSR ─────────> │
│                                                                             │
│  Build-time    Background     Static Shell    Per Request    Real-time     │
│  Generation   Regeneration   + Streaming     Generation     Data           │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

All of these can coexist in the same application—Next.js allows you to choose the right strategy per route and even per component.

---

## 1. Client-Side Rendering (CSR)

### How It Works

In CSR, the server sends a minimal HTML shell with JavaScript. The browser then downloads the JS, executes it, fetches data, and renders the content client-side. This is how traditional React applications worked before frameworks like Next.js.

```
Request Timeline:
┌──────────────────────────────────────────────────────────────────────────────┐
│ User → Server → Empty HTML + JS Bundle → Browser parses JS → Fetch API     │
│ → Render Content                                                            │
└──────────────────────────────────────────────────────────────────────────────┘
```

### When to Use CSR

- **Personalized content** for logged-in users
- **Highly interactive** dashboards and admin panels
- **No SEO requirement** (internal tools, authenticated areas)
- **Real-time data** that changes on every interaction

### Pros

- ✅ Full interactivity and client-side state management
- ✅ Reduces server load after initial load
- ✅ Great for SPA-like experiences
- ✅ Easy to implement for developers familiar with React

### Cons

- ❌ **Poor SEO** - search crawlers may see empty pages
- ❌ **Slow initial load** - users see loading spinners
- ❌ **Time to Interactive (TTI)** is higher
- ❌ First Contentful Paint (FCP) depends on JS execution

### Code Example

```tsx
// app/components/PostViewer.tsx
'use client';

import { useEffect, useState } from 'react';

interface Post {
  id: number;
  title: string;
  body: string;
}

export default function PostViewer() {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading-spinner">Loading...</div>;

  return (
    <article>
      <h1>{post?.title}</h1>
      <p>{post?.body}</p>
    </article>
  );
}
```

### Integration with TanStack Query

```tsx
// app/components/PostWithQuery.tsx
'use client';

import { useQuery } from '@tanstack/react-query';

async function fetchPost(id: string) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
}

export default function PostWithQuery({ postId }: { postId: string }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => fetchPost(postId),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading post</div>;

  return (
    <article>
      <h1>{data.title}</h1>
      <p>{data.body}</p>
    </article>
  );
}
```

---

## 2. Server-Side Rendering (SSR)

### How It Works

SSR generates the complete HTML page on the server for every request. The server fetches data, renders React components to HTML, and sends the fully rendered page to the client. This happens on every single request.

```
Request Timeline:
┌──────────────────────────────────────────────────────────────────────────────┐
│ User → Server (fetch data) → Render React → HTML → Browser (instant)     │
└──────────────────────────────────────────────────────────────────────────────┘
```

### When to Use SSR

- **Fully personalized** pages (user dashboards, profiles)
- **Real-time data** that must be fresh on every request
- **SEO-critical** pages with frequently changing content
- **Authentication-dependent** content

### Pros

- ✅ **Excellent SEO** - full HTML available on first load
- ✅ **Fresh data** on every request
- ✅ **Faster FCP** - content appears immediately
- ✅ Works with request-specific data (cookies, headers)

### Cons

- ❌ **Higher server load** - renders on every request
- ❌ **Slower TTFB** - server must render before sending
- ❌ Cannot use client-only APIs (window, localStorage)
- ❌ Cold start delays on serverless platforms

### Code Example

```tsx
// app/ssr-example/page.tsx
import { cookies, headers } from 'next/headers';

interface Post {
  id: number;
  title: string;
  body: string;
}

async function getPosts(): Promise<Post[]> {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    cache: 'no-store', // Disable caching for SSR
  });
  return res.json();
}

export default async function SSRPage() {
  // Access request-time data
  const cookieStore = cookies();
  const headerStore = headers();
  
  const posts = await getPosts();

  return (
    <main>
      <h1>Server-Side Rendered Page</h1>
      <p>Data fetched on every request</p>
      <ul>
        {posts.slice(0, 5).map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </main>
  );
}
```

### Forcing Dynamic Rendering

```tsx
// app/dynamic-page/page.tsx
// Force dynamic rendering at the route level
export const dynamic = 'force-dynamic';

export default async function DynamicPage() {
  const time = new Date().toISOString();
  return (
    <div>
      <h1>Current Time: {time}</h1>
      <p>This page renders on every request</p>
    </div>
  );
}
```

---

## 3. Static Site Generation (SSG)

### How It Works

SSG generates HTML at build time. The pages are pre-rendered and cached on CDNs worldwide. Every user receives the same pre-built HTML—there's no server computation on request.

```
Request Timeline:
┌──────────────────────────────────────────────────────────────────────────────┐
│ User → CDN → Pre-built HTML (instant)                                       │
└──────────────────────────────────────────────────────────────────────────────┘
```

### When to Use SSG

- **Content rarely changes** (blogs, documentation, marketing pages)
- **Same content for all users** (landing pages, pricing)
- **Maximum performance** is critical
- **SEO is paramount** and content doesn't change frequently

### Pros

- ✅ **Fastest possible delivery** - served from CDN
- ✅ **Lowest server cost** - no computation on request
- ✅ **Excellent SEO** - full HTML at build time
- ✅ **Scalable** - can handle massive traffic

### Cons

- ❌ Content is **frozen** until rebuild
- ❌ Full rebuild required for any content change
- ❌ Not suitable for frequently changing data
- ❌ Build times increase with page count

### Code Example

```tsx
// app/blog/[slug]/page.tsx
// Dynamic routes with SSG - use generateStaticParams

interface Post {
  slug: string;
  title: string;
  content: string;
}

async function getPost(slug: string): Promise<Post> {
  // Data fetched at build time only
  const res = await fetch(`https://api.example.com/posts/${slug}`, {
    cache: 'force-cache', // Default for SSG
  });
  return res.json();
}

export async function generateStaticParams() {
  // Pre-generate all blog post routes at build time
  const res = await fetch('https://api.example.com/posts');
  const posts = await res.json();
  
  return posts.map((post: { slug: string }) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  return (
    <article>
      <h1>{post.title}</h1>
      <div>{post.content}</div>
    </article>
  );
}
```

### Static Page Without Data Fetching

```tsx
// app/about/page.tsx
// Pure static - no data fetching at all

export default function AboutPage() {
  return (
    <main>
      <h1>About Us</h1>
      <p>This is a fully static page generated at build time.</p>
    </main>
  );
}
```

---

## 4. Incremental Static Regeneration (ISR)

### How It Works

ISR combines the speed of static pages with the freshness of dynamic content. Pages are generated at build time but can be updated in the background after a specified interval. Users always see a cached version while Next.js regenerates in the background.

```
Request Timeline:
┌──────────────────────────────────────────────────────────────────────────────┐
│ User → CDN → Cached HTML → (if stale) → Background regeneration             │
└──────────────────────────────────────────────────────────────────────────────┘
```

### When to Use ISR

- **Content changes periodically** (e-commerce products, news)
- **Large number of pages** that would slow down builds
- **Balance between performance and freshness** is needed
- **On-demand updates** via revalidation tags

### Pros

- ✅ **Fast delivery** - served from CDN like SSG
- ✅ **Automatic freshness** - no full rebuilds needed
- ✅ **Scalable** - can handle thousands of pages
- ✅ **On-demand revalidation** - update specific content instantly

### Cons

- ❌ **Initial stale content** - users may see outdated data
- ❌ More complex than pure SSG
- ❌ First visitor after revalidation may experience delay
- ❌ Requires understanding of caching behavior

### Code Example

```tsx
// app/products/page.tsx
// ISR with time-based revalidation

export const revalidate = 3600; // Revalidate at most every hour

interface Product {
  id: number;
  name: string;
  price: number;
}

async function getProducts(): Promise<Product[]> {
  const res = await fetch('https://api.example.com/products', {
    next: { revalidate: 3600 }, // Per-request revalidation
  });
  return res.json();
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main>
      <h1>Products</h1>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id}>
            <h2>{product.name}</h2>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
```

### On-Demand Revalidation

```tsx
// app/api/revalidate/route.ts
// API route for on-demand ISR

import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');
  
  // Verify secret token
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  const body = await request.json();
  const { path, tag } = body;

  // Revalidate specific path
  if (path) {
    revalidatePath(path);
  }

  // Revalidate by tag
  if (tag) {
    revalidateTag(tag);
  }

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
```

### Using Tags for Better Control

```tsx
// Fetch with tags for targeted revalidation
async function getProducts() {
  const res = await fetch('https://api.example.com/products', {
    next: { 
      tags: ['products'], // Tag for on-demand revalidation
      revalidate: 3600,   // Also set time-based fallback
    },
  });
  return res.json();
}
```

---

## 5. Partial Prerendering (PPR)

### How It Works

PPR is the newest and most innovative rendering strategy. It combines static and dynamic content within the same route:

1. **Static Shell**: The static parts (header, footer, layout) are prerendered at build time and cached on CDN
2. **Dynamic Holes**: Dynamic sections stream in as they're ready
3. **Streaming**: React Suspense boundaries allow progressive loading

This gives you static performance with dynamic freshness—best of both worlds.

```
Request Timeline:
┌──────────────────────────────────────────────────────────────────────────────┐
│ User → CDN (static shell instant) → Dynamic holes stream in parallel        │
└──────────────────────────────────────────────────────────────────────────────┘
```

### When to Use PPR

- **Mixed content** pages (static layout + dynamic components)
- **E-commerce product pages** (static details + dynamic pricing/inventory)
- **Dashboards** (static shell + dynamic data widgets)
- **When you want PPR benefits** without full SSR overhead

### Pros

- ✅ **Instant first paint** - static shell loads immediately
- ✅ **Streaming dynamic content** - no waiting for full page
- ✅ **Best of both worlds** - static speed + dynamic freshness
- ✅ **Granular control** - static and dynamic per component

### Cons

- ❌ Experimental in Next.js 15, evolving in 16
- ❌ Requires understanding Suspense boundaries
- ❌ More complex to implement correctly
- ❌ Cache behavior different from pure SSG/ISR

### Code Example

```tsx
// app/product/[id]/page.tsx
// PPR in Next.js 15/16

import { Suspense } from 'react';

// Enable experimental PPR in Next.js 15
// In Next.js 16, this is the default behavior
export const experimental_ppr = true;

import { ProductInfo } from './components/ProductInfo';
import { ProductPricing } from './components/ProductPricing';
import { ProductInventory } from './components/ProductInventory';

export default async function ProductPage({ params }: { params: { id: string } }) {
  return (
    <div className="product-page">
      {/* Static - prerendered at build time */}
      <header>
        <h1>Product Details</h1>
      </header>

      <main>
        {/* Static - fetched at build time */}
        <Suspense fallback={<div>Loading product info...</div>}>
          <ProductInfo productId={params.id} />
        </Suspense>

        {/* Dynamic - fetched on each request */}
        <Suspense fallback={<div>Loading pricing...</div>}>
          <ProductPricing productId={params.id} />
        </Suspense>

        {/* Dynamic - real-time inventory */}
        <Suspense fallback={<div>Loading inventory...</div>}>
          <ProductInventory productId={params.id} />
        </Suspense>
      </main>

      {/* Static - footer */}
      <footer>
        <p>© 2024 Your Store</p>
      </footer>
    </div>
  );
}
```

### Component-Level Example

```tsx
// components/ProductInfo.tsx (Server Component)
async function getProductInfo(id: string) {
  const res = await fetch(`https://api.example.com/products/${id}/info`, {
    cache: 'force-cache', // Static - built into shell
  });
  return res.json();
}

export async function ProductInfo({ productId }: { productId: string }) {
  const info = await getProductInfo(productId);
  
  return (
    <div className="product-info">
      <h2>{info.name}</h2>
      <p>{info.description}</p>
    </div>
  );
}
```

```tsx
// components/ProductPricing.tsx (Server Component with dynamic fetch)
async function getPricing(id: string) {
  const res = await fetch(`https://api.example.com/products/${id}/pricing`, {
    cache: 'no-store', // Dynamic - will be a streaming hole
  });
  return res.json();
}

export async function ProductPricing({ productId }: { productId: string }) {
  const pricing = await getPricing(productId);
  
  return (
    <div className="pricing">
      <span className="price">${pricing.current}</span>
      {pricing.discount && <span className="discount">{pricing.discount}% off</span>}
    </div>
  );
}
```

### Next.js 16 Cache Components (Advanced)

```tsx
// Next.js 16 introduces 'use cache' directive
// components/CachedProduct.tsx

'use cache';

export async function getCachedProduct(id: string) {
  const res = await fetch(`https://api.example.com/products/${id}`);
  return res.json();
}

export default async function CachedProduct({ id }: { id: string }) {
  const product = await getCachedProduct(id);
  return <div>{product.name}</div>;
}
```

---

## Performance Comparison

### Time to First Byte (TTFB)

| Strategy | TTFB (Warm) | TTFB (Cold) | Notes |
|----------|-------------|-------------|-------|
| **SSG** | 20-50ms | 20-50ms | CDN-cached, instant |
| **ISR** | 20-50ms | 20-50ms | Same as SSG after first hit |
| **PPR** | 20-50ms (shell) | 20-50ms | Static shell instant |
| **SSR** | 80-200ms | 300-900ms | Server render time |
| **CSR** | 20-50ms (empty) | 20-50ms | HTML shell only |

### SEO Comparison

| Strategy | SEO | Notes |
|----------|-----|-------|
| **SSG** | ⭐⭐⭐⭐⭐ | Full HTML at build time |
| **ISR** | ⭐⭐⭐⭐⭐ | Same as SSG after generation |
| **PPR** | ⭐⭐⭐⭐⭐ | Full HTML shell with streaming |
| **SSR** | ⭐⭐⭐⭐ | Full HTML, but crawlers prefer static |
| **CSR** | ⭐⭐ | Empty initial HTML, relies on JS |

### Data Freshness

| Strategy | Freshness | Update Method |
|----------|------------|---------------|
| **SSG** | Build-time | Full rebuild |
| **ISR** | Periodic | Background revalidation |
| **PPR** | Mixed | Streaming for dynamic parts |
| **SSR** | Real-time | Every request |
| **CSR** | Client-fetch | On component mount |

### Summary Table

| Strategy | Best For | CDN Cache | SEO | Server Cost |
|----------|----------|-----------|-----|-------------|
| **SSG** | Docs, blogs, marketing | ✅ Full page | ⭐⭐⭐⭐⭐ | Lowest |
| **ISR** | News, catalogs, CMS | ✅ Full page | ⭐⭐⭐⭐⭐ | Low |
| **PPR** | Mixed content pages | ✅ Shell only | ⭐⭐⭐⭐⭐ | Medium |
| **SSR** | Dashboards, profiles | ❌ | ⭐⭐⭐⭐ | High |
| **CSR** | Admin panels, apps | ✅ | ⭐⭐ | Lowest |

---

## Decision Flowchart

Use this decision tree to choose the right rendering strategy:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           CHOOSE YOUR STRATEGY                              │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
                    ┌───────────────────────────────┐
                    │ Is SEO important for this    │
                    │ page?                        │
                    └───────────────────────────────┘
                           │                 │
                          YES                NO
                           │                 │
                           ▼                 ▼
            ┌─────────────────────┐   ┌─────────────────────┐
            │ Is content the same │   │ Is content the     │
            │ for all users?      │   │ same for all       │
            └─────────────────────┘   │ users?             │
                   │            │     └─────────────────────┘
                  YES           NO            │          │
                   │            │           YES         NO
                   ▼            ▼              │          │
    ┌──────────────────┐  ┌────────────┐       ▼          ▼
    │ Does content    │  │   Use CSR  │  ┌────────┐  ┌───────┐
    │ change frequently│  │  (Client)  │  │ Use SSR│  │Use CSR│
    │ (hourly/daily)? │  └────────────┘  │(Server)│  │(Client│
    └──────────────────┘                   └────────┘  └───────┘
          │        │
         YES       NO
          │        │
          ▼        ▼
   ┌──────────┐  ┌─────────┐
   │Is a small│  │ Use SSG │
   │delay OK? │  │(Static) │
   └──────────┘  └─────────┘
        │
       YES
        │
        ▼
   ┌─────────┐
   │ Use ISR │
   │(Periodic│
   │revalidate│
   └─────────┘
```

### Simplified Decision Guide

1. **Is the page an interactive app-like interface?**
   - Yes → Consider CSR components within SSR pages
   
2. **Is content identical for all users?**
   - No → Use SSR (personalized) or PPR (mixed)
   
3. **Does content change frequently?**
   - No (manual updates) → SSG
   - Yes (automatic updates) → Continue
   
4. **Is a small delay (seconds to minutes) acceptable?**
   - Yes → ISR
   - No → SSR

5. **Is the page mostly static with some dynamic parts?**
   - Yes → PPR

---

## Real-World Use Cases

### SSG - Static Site Generation

**Perfect for:**
- Documentation sites
- Blog posts and articles
- Marketing landing pages
- About/contact pages
- Pricing pages

**Example Project Structure:**
```
app/
├── page.tsx                    # Landing page (SSG)
├── about/
│   └── page.tsx                # About page (SSG)
├── pricing/
│   └── page.tsx                # Pricing page (SSG)
└── docs/
    └── [slug]/
        └── page.tsx            # Documentation (SSG with generateStaticParams)
```

### ISR - Incremental Static Regeneration

**Perfect for:**
- E-commerce product pages
- News articles and blog posts
- Product catalogs
- User-generated content platforms

**Example:**
```tsx
// app/products/[slug]/page.tsx
export const revalidate = 3600; // Revalidate every hour

// Products change periodically but not in real-time
// ISR gives you static performance with automatic updates
```

### SSR - Server-Side Rendering

**Perfect for:**
- User dashboards
- Profile pages
- Search results (personalized)
- Auth-required pages
- Real-time analytics

**Example:**
```tsx
// app/dashboard/page.tsx
export const dynamic = 'force-dynamic';

export default async function Dashboard() {
  const session = await getSession();
  const data = await fetchUserData(session.user.id);
  
  return <DashboardUI user={session.user} data={data} />;
}
```

### CSR - Client-Side Rendering

**Perfect for:**
- Admin panels
- Settings pages
- Real-time chat applications
- Interactive widgets
- Pages with no SEO requirement

**Example:**
```tsx
// app/admin/page.tsx
'use client';

export default function AdminPanel() {
  // All client-side interaction
  // No SEO needed
}
```

### PPR - Partial Prerendering

**Perfect for:**
- Product detail pages (static info + dynamic pricing)
- News homepages (static layout + dynamic feeds)
- Dashboard shells (static layout + dynamic widgets)
- Profile pages (static header + dynamic content)

**Example:**
```tsx
// app/news/page.tsx
// Static: header, navigation, footer
// Dynamic: trending stories, personalized recommendations
// PPR gives instant shell while streaming personalization
```

---

## Conclusion

### Key Takeaways

1. **You don't have to choose one** - Next.js lets you mix strategies per route
2. **Start with SSG** for static content, evolve as needed
3. **Use ISR** for content that updates periodically
4. **Use SSR** for personalized, real-time data
5. **Use CSR** for interactive, non-SEO components
6. **Use PPR** for mixed static/dynamic pages (the future)

### Best Practices

- **Measure first** - use Vercel Analytics or Lighthouse
- **Mix and match** - each section can have its own strategy
- **Think component-level** - Next.js App Router supports granular control
- **Use proper caching** - understand `cache: 'no-store'` vs `'force-cache'`
- **Leverage Suspense** - for streaming and loading states

### Additional Resources

- [Next.js Caching Documentation](https://nextjs.org/docs/app/building-your-application/caching)
- [Next.js App Router](https://nextjs.org/docs/app)
- [React Server Components](https://react.dev/blog/2023/03/23/react-19)
- [TanStack Query for CSR](https://tanstack.com/query/latest)

---

*This guide covers Next.js 15/16 App Router patterns. Rendering strategies continue to evolve—stay updated with the official Next.js documentation.*