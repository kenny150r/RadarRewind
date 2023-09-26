FROM python:3

WORKDIR /app

RUN pip install fastapi
RUN pip install uvicorn

COPY api.py ./
COPY entrypoint.sh ./

EXPOSE 8000

ENTRYPOINT ["./entrypoint.sh"]
