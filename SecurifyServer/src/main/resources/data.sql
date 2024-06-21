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

INSERT INTO public.securify_houses (house_id, street, block, state) VALUES
    ('1', 'Street 1', 'Block A', 'State X') ON CONFLICT (house_id) DO UPDATE SET street = excluded.street;
INSERT INTO public.securify_houses (house_id, street, block, state) VALUES
    ('2', 'Street 2', 'Block B', 'State Y') ON CONFLICT (house_id) DO UPDATE SET street = excluded.street;
INSERT INTO public.securify_houses (house_id, street, block, state) VALUES
    ('3', 'Street 3', 'Block C', 'State Z') ON CONFLICT (house_id) DO UPDATE SET street = excluded.street;
INSERT INTO public.securify_houses (house_id, street, block, state) VALUES
    ('4', 'Street 4', 'Block D', 'State X') ON CONFLICT (house_id) DO UPDATE SET street = excluded.street;
INSERT INTO public.securify_houses (house_id, street, block, state) VALUES
    ('5', 'Street 5', 'Block E', 'State Y') ON CONFLICT (house_id) DO UPDATE SET street = excluded.street;