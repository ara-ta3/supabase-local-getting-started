PNPM=pnpm
SUPABASE=$(PNPM) exec supabase

run:
	$(SUPABASE) start -x vector -x logflare

migration/up:
	$(SUPABASE) db push

migration/reset:
	$(SUPABASE) db reset --preset dev

