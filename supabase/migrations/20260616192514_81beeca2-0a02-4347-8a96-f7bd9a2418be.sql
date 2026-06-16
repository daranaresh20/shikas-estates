
CREATE POLICY "Public can view property images" ON storage.objects
  FOR SELECT TO anon, authenticated
  USING (bucket_id = 'property-images');

CREATE POLICY "Admins manage property images" ON storage.objects
  FOR ALL TO authenticated
  USING (bucket_id = 'property-images' AND public.has_role(auth.uid(), 'admin'))
  WITH CHECK (bucket_id = 'property-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Public can view gallery images" ON storage.objects
  FOR SELECT TO anon, authenticated
  USING (bucket_id = 'gallery-images');

CREATE POLICY "Admins manage gallery images" ON storage.objects
  FOR ALL TO authenticated
  USING (bucket_id = 'gallery-images' AND public.has_role(auth.uid(), 'admin'))
  WITH CHECK (bucket_id = 'gallery-images' AND public.has_role(auth.uid(), 'admin'));
