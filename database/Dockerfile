FROM mongo:latest

COPY admins.json /admins.json
COPY users.json /users.json

CMD mongoimport --host mongo --db user-management --collection admins --drop --file /admins.json --type json
CMD mongoimport --host mongo --db user-management --collection users --drop --file /users.json --type json
