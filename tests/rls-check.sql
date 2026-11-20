-- Supabase SQL düzenleyicisinde çalıştır: iki sahte hesapla RLS denemesi, sonunda her şey geri alınır.
-- Beklenen: "B update=0, B delete=0, B insert-as-A=0, A update=1"
do $$
declare a uuid := gen_random_uuid(); b uuid := gen_random_uuid(); p uuid; n_upd_b int; n_del_b int; n_upd_a int; n_ins_b int := 0;
begin
  insert into auth.users (id, email, aud, role, instance_id) values
    (a, 'rls-test-a@example.invalid', 'authenticated', 'authenticated', '00000000-0000-0000-0000-000000000000'),
    (b, 'rls-test-b@example.invalid', 'authenticated', 'authenticated', '00000000-0000-0000-0000-000000000000');
  insert into public.shops (id, name) values (a, 'Test A'), (b, 'Test B');
  insert into public.products (shop_id, name, cat, price) values (a, 'A ürünü', 'Buket', 100) returning id into p;
  perform set_config('request.jwt.claims', json_build_object('sub', b, 'role', 'authenticated')::text, true);
  set local role authenticated;
  update public.products set price = 1 where id = p; get diagnostics n_upd_b = row_count;
  delete from public.products where id = p; get diagnostics n_del_b = row_count;
  begin insert into public.products (shop_id, name, cat, price) values (a, 'sahte', 'Buket', 1); n_ins_b := 1;
  exception when insufficient_privilege then n_ins_b := 0; end;
  reset role;
  perform set_config('request.jwt.claims', json_build_object('sub', a, 'role', 'authenticated')::text, true);
  set local role authenticated;
  update public.products set price = 120 where id = p; get diagnostics n_upd_a = row_count;
  reset role;
  raise exception 'SONUC: B update=%, B delete=%, B insert-as-A=%, A update=% (geri alındı)', n_upd_b, n_del_b, n_ins_b, n_upd_a;
end $$;
