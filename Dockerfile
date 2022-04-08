FROM python:3.9

WORKDIR /backend


COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY . .

EXPOSE 8000


CMD ["python", "-m", "manage", "runserver", "0.0.0.0:8000"]