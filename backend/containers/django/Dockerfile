FROM public.ecr.aws/docker/library/python:3.10-bullseye

ENV PYTHONUNBUFFERED 1

WORKDIR /

COPY . ./app

WORKDIR /app

COPY pyproject.toml poetry.lock ./
RUN pip install poetry

RUN poetry config virtualenvs.create false
RUN poetry config virtualenvs.in-project true
RUN poetry install --no-dev

RUN poetry run python manage.py collectstatic --noinput

CMD ["bash"]