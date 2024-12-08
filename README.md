# WSRC Repository
Comprises of all the apps and serices relating to wsrc

# WSRC Web App
Main site for users built on Angular 19
## Development
```bash
docker system prune -f; docker-compose up --build
```
Once the server is running, open your browser and navigate to [wsrc](http://localhost:4200/)
# Production
[wsrc.live](http://wsrc.live/) is hosted on render using cloudflare dns

# Test API
Express REST api used to test api connection