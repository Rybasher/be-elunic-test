# Elunic app


## Env variables 

```
PORT=<app port>
FE_URL=<frontend base url> 
SECRET_KEY=<secret key for access token> 
SECRET_KEY_REFRESH=<secret key for refresh token> 
```

## Run project with docker

- Copy .env.sample .env and add values

    ```cp .env.sample .env```

- Run docker-compose

    ```docker-compose up --build```


## Run app without docker

- Copy .env.sample .env

    ```.env.sample .env```

- install dependencies

    ```npm install```
- run app

    ```npm run start```

