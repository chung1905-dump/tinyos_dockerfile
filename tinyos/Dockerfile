FROM ubuntu:12.04

RUN echo "deb http://tinyprod.net/repos/debian squeeze main" >> /etc/apt/sources.list.d/tinyprod-debian.list && \
    echo "deb http://tinyprod.net/repos/debian msp430-46 main" >> /etc/apt/sources.list.d/tinyprod-debian.list
RUN apt-get update && \
    apt-get install --force-yes -y \
    nesc tinyos-tools msp430-46 avr-tinyos \
    wget make
RUN wget http://github.com/tinyos/tinyos-release/archive/tinyos-2_1_2.tar.gz -q -P /tmp

ARG USER_NAME=chung
ARG HOME_DIR=/home/tinyos
ARG ENV_FILE=${HOME_DIR}/.tinyos.env

RUN useradd -d ${HOME_DIR} -m -U ${USER_NAME} -p1 -s /bin/bash -G root,dialout

RUN mkdir -p ${HOME_DIR} && \
    tar -xf /tmp/tinyos-2_1_2.tar.gz -C ${HOME_DIR} && \
    mv ${HOME_DIR}/tinyos-release-tinyos-2_1_2 ${HOME_DIR}/tinyos && \
    rm -rf /var/lib/apt/lists/* /tmp/tinyos-2_1_2.tar.gz

RUN echo export TOSROOT="${HOME_DIR}/tinyos" >> $ENV_FILE && \
    echo export 'TOSDIR="$TOSROOT/tos"' >> $ENV_FILE && \
    echo export 'CLASSPATH=$CLASSPATH:$TOSROOT/support/sdk/java:$TOSROOT/support/sdk/java/tinyos.jar:.' >> $ENV_FILE && \
    echo export 'MAKERULES="$TOSROOT/support/make/Makerules"' >> $ENV_FILE && \
    echo export 'PYTHONPATH=$PYTHONPATH:$TOSROOT/support/sdk/python' >> $ENV_FILE
RUN echo "source $ENV_FILE" >> ${HOME_DIR}/.bashrc

COPY ./src ${HOME_DIR}/src
WORKDIR ${HOME_DIR}/src

USER ${USER_NAME}
#CMD tail -f /dev/null
CMD /bin/bash server.sh