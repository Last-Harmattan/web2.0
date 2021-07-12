FROM python:3.6.5-slim
WORKDIR /backend
ADD . /backend
RUN pip install --trusted-host pypi.python.org -r requirements.txt
EXPOSE 8800
ENTRYPOINT /bin/bash -c "python3 main.py"
