FROM python:3.9

WORKDIR /backend


COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY . .

EXPOSE 8000


CMD gunicorn backend.wsgi:application --bind 0.0.0.0:$PORT --timeout 300