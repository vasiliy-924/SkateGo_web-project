FROM python:3.12-slim

RUN groupadd -r groupdjango && useradd -r -g groupdjango user_skatego

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

RUN pip install --upgrade pip
WORKDIR /app/www/skatego

RUN mkdir -p /app/www/skatego/static /app/www/skatego/media && \
    chown -R user_skatego:groupdjango /app/www/skatego

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

USER user_skatego
