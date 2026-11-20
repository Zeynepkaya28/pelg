-- Sera Defteri — 003: sahip ve yönetici silme kuralları tek politikada (Performance Advisor: multiple_permissive_policies)
drop policy "products: sahibi siler" on public.products;
drop policy "products: admin siler" on public.products;
create policy "products: sahibi veya admin siler" on public.products for delete to authenticated
  using (shop_id = (select auth.uid())
         or exists (select 1 from public.admins a where a.user_id = (select auth.uid())));

drop policy "photos: sahibi siler" on storage.objects;
drop policy "photos: admin siler" on storage.objects;
create policy "photos: sahibi veya admin siler" on storage.objects for delete to authenticated
  using (bucket_id = 'product-photos' and (
    (storage.foldername(name))[1] = (select auth.uid())::text
    or exists (select 1 from public.admins a where a.user_id = (select auth.uid()))));
