"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BedDouble,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  Heart,
  MapPin,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Star,
  Users,
} from "lucide-react";
import { listings, formatMnt } from "@/types/rental";
import type { FilterState } from "@/types/rental";

function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 text-lg font-bold tracking-tight"
    >
      <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground">
        <Building2 className="size-4" />
      </span>{" "}
      NESTA
    </Link>
  );
}

function ListingCard({ listing }: { listing: (typeof listings)[number] }) {
  const [saved, setSaved] = useState(false);
  return (
    <article className="group overflow-hidden rounded-2xl border border-border/70 bg-card shadow-[0_8px_30px_-20px_var(--foreground)] transition hover:-translate-y-1 hover:shadow-[0_20px_45px_-24px_var(--foreground)]">
      <div className="relative aspect-[1.18] overflow-hidden bg-muted">
        <Image
          src={listing.image}
          alt={listing.title}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <button
          aria-label={saved ? "Remove from favorites" : "Save listing"}
          onClick={() => setSaved(!saved)}
          className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-background/85 text-foreground backdrop-blur transition hover:bg-background"
        >
          {" "}
          <Heart
            className={saved ? "size-4 fill-primary text-primary" : "size-4"}
          />
        </button>
        {listing.tag && (
          <span className="absolute bottom-3 left-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
            {listing.tag}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold leading-tight">{listing.title}</h3>
            <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="size-3.5" />
              {listing.district}, Ulaanbaatar
            </p>
          </div>
          <span className="flex items-center gap-1 text-sm font-semibold">
            <Star className="size-3.5 fill-accent text-accent" />
            {listing.rating}
          </span>
        </div>
        <div className="flex items-center gap-3 border-t border-border/70 pt-3 text-xs text-muted-foreground">
          <span>{listing.beds} bed</span>
          <span>{listing.baths} bath</span>
          <span>{listing.area} m²</span>
          <strong className="ml-auto text-sm text-foreground">
            {formatMnt(listing.price)}
            <span className="font-normal text-muted-foreground"> /mo</span>
          </strong>
        </div>
      </div>
    </article>
  );
}

export default function RentalHome() {
  const [filters, setFilters] = useState<FilterState>({
    district: "All districts",
    maxPrice: 4000000,
    beds: "Any",
  });
  const [showFilters, setShowFilters] = useState(false);
  const filtered = useMemo(
    () =>
      listings.filter(
        (l) =>
          (filters.district === "All districts" ||
            l.district === filters.district) &&
          l.price <= filters.maxPrice &&
          (filters.beds === "Any" || l.beds >= Number(filters.beds)),
      ),
    [filters],
  );
  return (
    <main className="min-h-screen bg-background">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
        <Logo />
        <div className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
          <Link href="#explore" className="transition hover:text-foreground">
            Explore homes
          </Link>
          <Link href="#how" className="transition hover:text-foreground">
            How it works
          </Link>
          <Link href="#landlords" className="transition hover:text-foreground">
            For landlords
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/messages"
            className="hidden text-sm font-medium md:block"
          >
            Sign in
          </Link>
          <Link
            href="/landlord/dashboard"
            className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
          >
            List your place
          </Link>
        </div>
      </nav>
      <section className="relative mx-auto max-w-7xl overflow-hidden px-5 pb-16 pt-12 lg:px-8 lg:pb-24 lg:pt-24">
        <div className="pointer-events-none absolute right-0 top-0 -z-0 h-72 w-72 rounded-full bg-accent/25 blur-3xl" />
        <div className="relative z-10 max-w-3xl">
          <p className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            <span className="size-2 rounded-full bg-accent" /> Better renting
            starts here
          </p>
          <h1 className="max-w-3xl text-balance text-5xl font-bold tracking-[-0.055em] text-foreground sm:text-6xl lg:text-8xl">
            Find a place that feels like{" "}
            <span className="text-primary">home.</span>
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-lg leading-8 text-muted-foreground">
            Thoughtfully verified apartments and honest listings across
            Ulaanbaatar. Search less, settle in sooner.
          </p>
        </div>
        <div className="relative z-10 mt-10 rounded-2xl bg-card p-2 shadow-[0_20px_70px_-35px_var(--foreground)] ring-1 ring-border/80 sm:flex sm:items-center sm:gap-1 sm:rounded-full sm:p-2">
          <div className="flex flex-1 items-center gap-3 rounded-xl px-4 py-3 sm:rounded-full">
            <MapPin className="size-5 text-primary" />
            <div className="flex flex-col">
              <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Location
              </label>
              <select
                aria-label="Choose district"
                value={filters.district}
                onChange={(e) =>
                  setFilters({ ...filters, district: e.target.value })
                }
                className="bg-transparent text-sm font-semibold outline-none"
              >
                <option>All districts</option>
                <option>Sukhbaatar</option>
                <option>Khan-Uul</option>
                <option>Bayanzurkh</option>
                <option>Chingeltei</option>
              </select>
            </div>
          </div>
          <div className="hidden h-8 w-px bg-border sm:block" />
          <div className="flex flex-1 items-center gap-3 rounded-xl px-4 py-3 sm:rounded-full">
            <CalendarDays className="size-5 text-primary" />
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Move-in
              </p>
              <p className="text-sm font-semibold">Anytime</p>
            </div>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center gap-2 rounded-xl border border-border px-4 py-3 text-sm font-semibold sm:rounded-full"
          >
            <SlidersHorizontal className="size-4" /> Filters
          </button>
          <Link
            href="#explore"
            className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground sm:mt-0 sm:rounded-full"
          >
            <Search className="size-4" /> Search
          </Link>
        </div>
        {showFilters && (
          <div className="relative z-10 mt-3 flex flex-wrap items-center gap-4 rounded-2xl border border-border bg-card p-4 text-sm shadow-sm">
            <label className="flex items-center gap-2">
              Bedrooms{" "}
              <select
                value={filters.beds}
                onChange={(e) =>
                  setFilters({ ...filters, beds: e.target.value })
                }
                className="rounded-lg border border-border bg-background px-3 py-2"
              >
                <option>Any</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
            </label>
            <label className="flex items-center gap-2">
              Max rent{" "}
              <select
                value={filters.maxPrice}
                onChange={(e) =>
                  setFilters({ ...filters, maxPrice: Number(e.target.value) })
                }
                className="rounded-lg border border-border bg-background px-3 py-2"
              >
                <option value={2000000}>2.0M ₮</option>
                <option value={3000000}>3.0M ₮</option>
                <option value={4000000}>4.0M ₮</option>
              </select>
            </label>
          </div>
        )}
      </section>
      <section id="explore" className="mx-auto max-w-7xl px-5 pb-20 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold text-primary">
              Curated for you
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Places worth coming home to
            </h2>
          </div>
          <button className="hidden items-center gap-2 text-sm font-semibold text-primary sm:flex">
            View all <ArrowRight className="size-4" />
          </button>
        </div>
        {filtered.length ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border p-12 text-center">
            <p className="font-semibold">No homes match those filters.</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try widening your search.
            </p>
          </div>
        )}
      </section>
      <section
        id="how"
        className="bg-primary px-5 py-16 text-primary-foreground lg:px-8 lg:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-accent">
              A calmer way to rent
            </p>
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
              From first search to first night, made simple.
            </h2>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="flex gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground">
                <Search className="size-5" />
              </span>
              <div>
                <h3 className="font-semibold">Search with confidence</h3>
                <p className="mt-2 text-sm leading-6 text-primary-foreground/70">
                  Real photos, clear details, and neighborhood context for every
                  home.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground">
                <ShieldCheck className="size-5" />
              </span>
              <div>
                <h3 className="font-semibold">
                  Know who you&apos;re renting from
                </h3>
                <p className="mt-2 text-sm leading-6 text-primary-foreground/70">
                  Verified landlords and transparent reviews keep things
                  straightforward.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground">
                <Check className="size-5" />
              </span>
              <div>
                <h3 className="font-semibold">Move forward, together</h3>
                <p className="mt-2 text-sm leading-6 text-primary-foreground/70">
                  Message, book a viewing, and keep every detail in one place.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <Logo />
        <p>Made for better renting in Ulaanbaatar.</p>
        <div className="flex gap-5">
          <Link href="/profile">Help center</Link>
          <Link href="/profile">Privacy</Link>
        </div>
      </footer>
    </main>
  );
}
