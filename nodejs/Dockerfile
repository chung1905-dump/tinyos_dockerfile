FROM node:11

ARG USER_NAME=chung
ARG UID=1000
ARG HOME_DIR=/home/nodejs

RUN mkdir -p ${HOME_DIR}
RUN useradd -M -U ${USER_NAME} -u ${UID} -p1 -d ${HOME_DIR} -s /bin/bash -G root -o
RUN chown ${USER_NAME}:${USER_NAME} ${HOME_DIR}
USER ${USER_NAME}
WORKDIR ${HOME_DIR}
COPY ./package.json ${HOME_DIR}
RUN npm install

WORKDIR ${HOME_DIR}/src
CMD ["nodejs", "client.js"]
