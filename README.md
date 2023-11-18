
# Demo - Frontend

## Overview
The repo contains the front-end for the platform demo. 

The frontend is built using [Next.JS](https://nextjs.org/), a React framework.

The backend for this platform can be found [HERE].(https://github.com/UNDP-Data/dsc-energy-ai-backend)

### Technology Pre-requisites
- Node: https://nodejs.org/en/download
- Npm: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm


### Running the app locally
First, cd into the project directory
``` bash
cd ai-moonshot-demo-frontend 
```

Install the dependencies
``` bash 
npm install 
```

Run the app in dev mode
```bash 
npm run dev
```



### Running the frontend app using Docker 
Make sure docker installed and running locally on your machine

First, cd into the project directory
``` bash
cd ai-moonshot-demo-frontend 
```

Build the docker image
``` bash
docker build docker build -t <name-of-image> .
```

Run the docker image
``` bash
docker run -p 3000:3000 <name-of-image>
```

The app will be running at [http://localhost:3000](http://localhost:3000) in your browser.


### Running the frontend and backend apps using Docker Compose

1. First build the docker image for the Flask Backend using [The backend repo](https://github.com/UNDP-Data/dsc-energy-ai-backend)

2. Update the ```image_name``` and ``OPENAI_API_KEY``` values in ```docker-compose.yml```

3. Run the docker-compose command:
```
docker-compose up -d  
```

4. Access the application:
- Frontend: http://localhost:80
- Backend: http://localhost:5000

## Demo Status:
Main Page: <img width="1398" alt="updated_ui_page_1" src="https://github.com/rashansmith/ai-moonshot-demo-frontend/assets/6632748/9a52d0c9-666e-43d8-ac49-2bbe4ed8ef40">

Chat Page: <img width="1382" alt="updated_ui_page_2" src="https://github.com/rashansmith/ai-moonshot-demo-frontend/assets/6632748/3379a53d-40c3-40aa-a245-2013e12c6cea">


