FROM ubuntu:12.04

RUN echo "deb http://tinyprod.net/repos/debian squeeze main" >> /etc/apt/sources.list.d/tinyprod-debian.list && \
    echo "deb http://tinyprod.net/repos/debian msp430-46 main" >> /etc/apt/sources.list.d/tinyprod-debian.list
RUN apt-get update && \
    apt-get install --force-yes -y \
    nesc tinyos-tools msp430-46 avr-tinyos \
    wget make
RUN wget http://github.com/tinyos/tinyos-release/archive/tinyos-2_1_2.tar.gz -q -P /tmp

ARG USER_NAME=chung
ARG ENV_FILE=/home/${USER_NAME}/tinyos.env
RUN useradd -m -U ${USER_NAME} -p1 -s /bin/bash -G root,dialout

RUN mkdir -p /home/${USER_NAME} && \
    tar -xf /tmp/tinyos-2_1_2.tar.gz -C /home/${USER_NAME} && \
    mv /home/${USER_NAME}/tinyos-release-tinyos-2_1_2 /home/${USER_NAME}/tinyos && \
    rm -rf /var/lib/apt/lists/* /tmp/tinyos-2_1_2.tar.gz
RUN echo export TOSROOT="/home/${USER_NAME}/tinyos" >> $ENV_FILE && \
    echo export 'TOSDIR="$TOSROOT/tos"' >> $ENV_FILE && \
    echo export 'CLASSPATH=$CLASSPATH:$TOSROOT/support/sdk/java:$TOSROOT/support/sdk/java/tinyos.jar:.' >> $ENV_FILE && \
    echo export 'MAKERULES="$TOSROOT/support/make/Makerules"' >> $ENV_FILE && \
    echo export 'PYTHONPATH=$PYTHONPATH:$TOSROOT/support/sdk/python' >> $ENV_FILE
RUN echo "source $ENV_FILE" >> /home/${USER_NAME}/.bashrc
