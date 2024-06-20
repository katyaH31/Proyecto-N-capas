INSERT INTO public.securify_roles (role_id, name) VALUES ('SYS', 'Sysadmin')
    ON CONFLICT (role_id) DO UPDATE SET name = excluded.name;

INSERT INTO public.securify_roles (role_id, name) VALUES ('ADM', 'Admin')
    ON CONFLICT (role_id) DO UPDATE SET name = excluded.name;

INSERT INTO public.securify_roles (role_id, name) VALUES ('GRD', 'Guard')
    ON CONFLICT (role_id) DO UPDATE SET name = excluded.name;

INSERT INTO public.securify_roles (role_id, name) VALUES ('RES', 'Resident')
    ON CONFLICT (role_id) DO UPDATE SET name = excluded.name;

INSERT INTO public.securify_roles (role_id, name) VALUES ('MNG', 'Manager')
    ON CONFLICT (role_id) DO UPDATE SET name = excluded.name;

INSERT INTO public.securify_roles (role_id, name) VALUES ('VST', 'Visitor')
    ON CONFLICT (role_id) DO UPDATE SET name = excluded.name;