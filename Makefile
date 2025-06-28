PNPM=pnpm
SUPABASE=$(PNPM) exec supabase

run:
	$(SUPABASE) start -x vector -x logflare

stop:
	$(SUPABASE) stop

migration/up:
	$(SUPABASE) db push --local

migration/reset:
	$(SUPABASE) db reset --local

