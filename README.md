# WSRC Repository
Comprises of all the apps and serices relating to wsrc
## Development
Run from project directory (C:User/..../wsrc)

Ensure Docker Desktop is already running, then do
```bash
./run.bat
```
Once the server is running, open your browser and navigate to [wsrc](http://localhost:4200/)

*If encountering any issues try*
```bash
./safeRun.bat
```
## Production
[wsrc.live](http://wsrc.live/) is hosted on render using cloudflare dns

# WSRC Web App
*Port 4200*

Main site for users built on Angular 19
# WSRC API
*Port 3000*

Express REST api used to serve web app and interact with iracing api