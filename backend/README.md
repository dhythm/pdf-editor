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

```sh
poetry run python manage.py runserver 8080
curl http://127.0.0.1:8080/api/pdfs/templates/
```
