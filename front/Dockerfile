FROM node:22-alpine3.20
WORKDIR /front
# COPY ./front/ /front
 
COPY ./front/package.json ./package.json
RUN npm install
 
EXPOSE 3000
CMD ["npm", "start"]
# ENTRYPOINT ["tail", "-f", "/dev/null"]