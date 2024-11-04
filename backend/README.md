# Backend for PDF Editor

## Create environment

```sh
mkdir backend
cd backend
```

Initialize `poetry` workspace.

```sh
poetry init

Package name [backend]:  app
Version [0.1.0]:
Description []:
Author [dhythm <yuta.okada.20@gmail.com>, n to skip]:
License []:
Compatible Python versions [^3.9]:  ^3.10
Would you like to define your main dependencies interactively? (yes/no) [yes]
Package to add or search for (leave blank to skip):
Would you like to define your development dependencies interactively? (yes/no) [yes]
Package to add or search for (leave blank to skip):
Do you confirm generation? (yes/no) [yes]
```

Select python version on poetry

```sh
poetry env use 3.10.9
poetry install --no-root
```

Update `"python.defaultInterpreterPath"` and `python.autoComplete.extraPaths` in settings.json
Check python path in virtual environment by the following command.
After then, open command pallet via `Cmd + Shift + P` and select `Python: Select Interpreter`.

```sh
poetry shell
```

Install libraries.

```sh
poetry add Django
poetry add djangorestframework
poetry add django-cors-headers
poetry add psycopg
```

Install dev tools.

```sh
poetry add --dev black isort autoflake
poetry add --dev mypy django-stubs djangorestframework-stubs
```

Run mypy to validate typing.

```sh
poetry run mypy pdfs/models.py
```

Start project with django.

```sh
poetry run django-admin startproject app .
poetry run python manage.py migrate
poetry run python manage.py runserver 8080
```

Add an app with django.

```sh
poetry run python manage.py startapp pdf
poetry run python manage.py makemigrations
poetry run python manage.py migrate
```

Run and access to an api by django.
Need the last slash otherwise django will return 301.

```sh
poetry run python manage.py runserver 8080
curl http://127.0.0.1:8080/api/pdfs/templates/
```

Install gunicorn and run api server with container.

```sh
poetry add gunicorn
docker compose down -v && docker compose up -d
curl http://127.0.0.1:8000/api/pdfs/templates/
```

## Database

Connect to database.

```sh
docker compose
docker compose exec -it db psql -U postgres postgres
```

Create superuser for django Admin.

```sh
poetry run python manage.py createsuperuser

Username (leave blank to use 'dhythm'): admin
Email address: admin@example.com
Password: ********
Password (again): ********
Bypass password validation and create user anyway? [y/N]: y
```

Dump database as a backup and restore database from the latest backup file.

```sh
docker compose exec db pg_dump -c -U postgres > database/pg_dump_$(date "+%Y%m%d%H%M%S").sql
docker compose exec -T db psql -U postgres postgres < $(\ls -1rt database/*.sql | tail -n 1)

docker compose exec db pg_dump -Fc -U postgres > database/pg_$(date "+%Y%m%d%H%M%S").dump
docker compose exec -T db pg_restore -C -U postgres -d postgres < $(\ls -1rt database/*.dump | tail -n 1)
```
