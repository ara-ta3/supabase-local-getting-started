PNPM=pnpm

run:
	$(PNPM) exec supabase start -x vector -x logflare
