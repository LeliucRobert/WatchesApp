# backend/Dockerfile

FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PYTHONPATH=/app/watch_api


WORKDIR /app

COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

COPY . .

# 🔄 Use Uvicorn to serve ASGI app
CMD ["uvicorn", "watch_api.asgi:application", "--host", "0.0.0.0", "--port", "8000"]
